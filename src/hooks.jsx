import { useCallback, useState } from "react";

const useLoading = (initialState) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const toggleLoading = useCallback((status) => setIsLoading(status));
  return [isLoading, toggleLoading];
};

export default useLoading;