import { useState, useCallback } from 'react';

export const useApi = (requestMethod) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetch = useCallback(
    (params) => {
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);

        try {
          const result = await requestMethod(params);

          setData(result);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };

      if (requestMethod) {
        fetchData();
      }
    },
    [requestMethod],
  );

  return [{ data, isLoading, isError }, fetch];
};
