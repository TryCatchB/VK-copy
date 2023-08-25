import { useState } from "react";

export const useQuery = (callback: () => Promise<any>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchData, isLoading, error];
};
