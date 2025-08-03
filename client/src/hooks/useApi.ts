import { useCallback, useEffect, useState } from 'react';
import { api, type HTTPMethod } from '../utils/api';
import toast from 'react-hot-toast';

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

  const trigger = useCallback(async (body?: any) => {
    setIsLoading(true);
    try {
      const result = await api({ method, endpoint, data: body });
      setData(result);
      return result;
    } catch (err) {
      setError(true);
      err.message.forEach(err => toast.error(err));
    } finally {
      setIsLoading(false);
    }
  }, [method, endpoint]);

  useEffect(() => {
    if (method === "GET" && !skip) {
      trigger();
    }
  }, [method, trigger, skip]);

  return { data, isLoading, error, [name]: trigger };
};
