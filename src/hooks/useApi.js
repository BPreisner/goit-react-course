import { useState, useRef, useCallback } from 'react';

export const useApi = (requestMethod) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const request = useRef(requestMethod);

  const fetch = useCallback((params) => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await request.current(params);

        setData(result);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (request.current) {
      fetchData();
    }
  }, []);

  return [{ data, isLoading, isError }, fetch];
};
