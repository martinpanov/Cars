import { useApi } from "../hooks/useApi";
import { API_URL } from "./constants";
import { capitalize } from "./utils";

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

export type API = {
  method: HTTPMethod;
  endpoint: string;
  data?: string | FormData;
};

type EndpointDef = {
  method: HTTPMethod;
  endpoint: string | ((...args: any[]) => string);
};

type EndpointsMap = Record<string, EndpointDef>;

type HookName<
  K extends string,
  M extends HTTPMethod,
> = `use${Capitalize<K>}${M extends "GET" ? "Query" : "Mutation"}`;

type HookOptions = {
  queryString?: string;
  skip?: boolean;
  [key: string]: any;
};

// Hook return type with manual trigger function
type HookResult<T = any, Name extends string = string> = {
  isLoading: boolean;
  data?: T;
  error?: any;
} & {
  [K in Name]: (body?: any) => Promise<T>;
};

// Updated HookReturnType - parameters are optional for the hook, available for trigger
type HookReturnType<Name extends string = string> = (
  options?: HookOptions
) => HookResult<any, Name>;
// Generate hook types
type ApiHooks<T extends EndpointsMap> = {
  [K in keyof T as HookName<string & K, T[K]["method"]>]: HookReturnType<
    string & K
  >;
};

// Rate limit tracking
const rateLimitTracker: Record<string, number> = {}; // endpoint -> timestamp when rate limit expires

// Helper functions
function checkRateLimit(method: HTTPMethod, endpoint: string) {
  // Group auth endpoints together since they share rate limits
  const authEndpoints = ["/login", "/register", "/refresh"];
  const normalizedEndpoint = authEndpoints.includes(endpoint)
    ? "auth"
    : endpoint;

  const rateLimitKey = `${method}:${normalizedEndpoint}`;
  const rateLimitExpiry = rateLimitTracker[rateLimitKey];

  if (!rateLimitExpiry || Date.now() >= rateLimitExpiry) {
    return { rateLimitKey, isRateLimited: false };
  }

  const remainingTime = Math.ceil((rateLimitExpiry - Date.now()) / 1000);
  throw new Error(
    `Rate limited. Please wait ${remainingTime} seconds before trying again.`
  );
}

function buildRequestOptions(data?: string | FormData): RequestInit {
  const options: RequestInit = { method: "POST" };

  if (!data) {
    return options;
  }

  options.body = data;

  // Only set JSON headers if it's not FormData
  if (!(data instanceof FormData)) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(data);
  }

  return options;
}

function addAuthHeaders(options: RequestInit): RequestInit {
  const userData = sessionStorage.getItem("user");
  if (!userData) {
    return options;
  }

  const user = JSON.parse(userData);
  const token = user.tokens?.accessToken;

  if (!token) {
    return options;
  }

  return {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token,
    },
  };
}

function handleRateLimit(rateLimitKey: string, result: any) {
  if (!result.retryAfter) {
    return;
  }

  const retryAfterMs = result.retryAfter * 1000;
  const expiryTime = Date.now() + retryAfterMs;
  rateLimitTracker[rateLimitKey] = expiryTime;

  setTimeout(() => {
    delete rateLimitTracker[rateLimitKey];
  }, retryAfterMs);
}

async function handleTokenRefresh(
  endpoint: string,
  options: RequestInit,
  user: any
): Promise<any> {
  const refreshResponse = await fetch(`${API_URL}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: user.tokens.refreshToken }),
  });

  if (!refreshResponse.ok) {
    sessionStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("Session expired. Please log in again.");
  }

  const refreshResult = await refreshResponse.json();

  // Update stored user data - refreshResult IS the tokens object
  const updatedUser = { ...user, tokens: refreshResult };
  sessionStorage.setItem("user", JSON.stringify(updatedUser));

  // Retry original request with new token
  const retryOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: refreshResult.accessToken,
    },
  };

  const retryResponse = await fetch(`${API_URL}${endpoint}`, retryOptions);
  const retryResult = await retryResponse.json();

  if (!retryResponse.ok) {
    throw retryResult;
  }

  return retryResult;
}

export async function api({ method, endpoint, data }: API) {
  // Check rate limiting first
  const { rateLimitKey } = checkRateLimit(method, endpoint);

  // Add artificial delay for development
  if (process.env.NODE_ENV === "development") {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Build request options
  let options = buildRequestOptions(data);
  options.method = method;
  options = addAuthHeaders(options);

  // Make initial request
  const response = await fetch(`${API_URL}${endpoint}`, options);

  // Handle token refresh for 401 errors
  const userData = sessionStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  if (
    response.status === 401 &&
    user?.tokens?.refreshToken &&
    endpoint !== "/refresh" &&
    endpoint !== "/login"
  ) {
    try {
      return await handleTokenRefresh(endpoint, options, user);
    } catch {
      sessionStorage.removeItem("user");
      window.location.href = "/login";
      throw new Error("Session expired. Please log in again.");
    }
  }

  const result = await response.json();

  // Handle rate limiting
  if (response.status === 429) {
    handleRateLimit(rateLimitKey, result);
  }

  if (!response.ok) {
    throw result;
  }

  return result;
}

export function createCustomApi<T extends EndpointsMap>(params: {
  endpoints: T;
}): ApiHooks<T> {
  const apiHooks = {} as ApiHooks<T>;
  Object.entries(params.endpoints).forEach(([name, { method, endpoint }]) => {
    const isQuery = method === "GET";
    const hookName =
      `use${capitalize(name)}${isQuery ? "Query" : "Mutation"}` as keyof ApiHooks<T>;

    apiHooks[hookName] = ((options: any = {}) => {
      const resolvedEndpoint =
        typeof endpoint === "function" ? endpoint(options) : endpoint;

      return useApi({
        method,
        endpoint: resolvedEndpoint,
        name,
        skip: options?.skip ?? false,
      });
    }) as ApiHooks<T>[typeof hookName];
  });

  return apiHooks;
}
