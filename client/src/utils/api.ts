import { API_URL } from "./constants";
import { capitalize } from "./utils";
import { useApi } from "../hooks/useApi";

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

type HookName<K extends string, M extends HTTPMethod> = `use${Capitalize<K>}${M extends "GET" ? "Query" : "Mutation"}`;

type HookOptions = {
  queryString?: string;
  skip?: boolean;
  [key: string]: any;
};

// Hook return type with manual trigger function
type HookResult<
  T = any,
  Name extends string = string
> = {
  isLoading: boolean;
  data?: T;
  error?: any;
} & {
    [K in Name]: (body?: any) => Promise<T>;
  };

// Updated HookReturnType - parameters are optional for the hook, available for trigger
type HookReturnType<Name extends string = string> = (options?: HookOptions) => HookResult<any, Name>;
;

// Generate hook types
type ApiHooks<T extends EndpointsMap> = {
  [K in keyof T as HookName<string & K, T[K]["method"]>]: HookReturnType<string & K>
};

export async function api({ method, endpoint, data }: API) {
  const options: {
    body?: string | FormData;
    headers?: Record<string, string>;
    method: HTTPMethod;
  } = { method: method };
  if (data) {
    if (options?.body) {
      options.body = data;
      return;
    }

    options.headers = {
      "Content-Type": "application/json"
    };

    options.body = JSON.stringify(data);
  }

  const userData = sessionStorage.getItem("user");

  const user = userData && JSON.parse(userData);

  if (user) {
    const token = user.accessToken;
    options.headers = {
      ...options.headers,
      "X-Authorization": token
    };
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);
  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
}


export function createCustomApi<T extends EndpointsMap>(params: { endpoints: T; }): ApiHooks<T> {
  const apiHooks = {} as ApiHooks<T>;
  Object.entries(params.endpoints).forEach(([name, { method, endpoint }]) => {
    const isQuery = method === "GET";
    const hookName = `use${capitalize(name)}${isQuery ? "Query" : "Mutation"}` as keyof ApiHooks<T>;

    apiHooks[hookName] = ((options: any = {}) => {
      const resolvedEndpoint = typeof endpoint === "function" ? endpoint(options) : endpoint;

      return useApi({ method, endpoint: resolvedEndpoint, name, skip: options?.skip ?? false });
    }) as ApiHooks<T>[typeof hookName];
  });

  return apiHooks;
}

