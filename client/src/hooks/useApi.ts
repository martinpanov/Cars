import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { api, type HTTPMethod } from "../utils/api";

type Params = {
  method: HTTPMethod;
  endpoint: string;
  name: string;
  skip?: boolean;
};

export const useApi = ({ method, endpoint, name, skip }: Params) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(method === "GET" && !skip);
  const [error, setError] = useState(false);

  const trigger = useCallback(
    async (body?: any) => {
      setIsLoading(true);
      try {
        const result = await api({ method, endpoint, data: body });
        setData(result);
        return result;
      } catch (err) {
        setError(err);

        // Handle validation errors - don't show toast, let form handle them
        if (err.errors && typeof err.errors === 'object') {
          console.log('Validation errors:', err.errors);
          return;
        }

        // Handle single error message
        if (err.error || err.message) {
          toast.error(err.error || err.message);
          return;
        }

        // Handle array of error messages
        if (Array.isArray(err.errors)) {
          err.errors.forEach(msg => toast.error(msg));
          return;
        }

        // Fallback for unknown error format
        toast.error('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    },
    [method, endpoint]
  );

  useEffect(() => {
    if (method === "GET" && !skip) {
      trigger();
    }
  }, [method, trigger, skip]);

  return { data, isLoading, error, [name]: trigger };
};
