import { useCallback, useState } from "react";

export const useError = () => {
  const [error, setError] = useState<string>();

  const clearError = useCallback(() => {
    setError("");
  }, []);

  return { error, setError, clearError };
};
