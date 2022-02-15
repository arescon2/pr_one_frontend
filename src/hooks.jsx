import { useCallback, useState } from "react";

export const useLoading = (initialState) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const toggleLoading = useCallback((status) => setIsLoading(status));
  return [isLoading, toggleLoading];
};

export const usePayback = (initialState) => {
  const [isStatusPayback, setPayback] = useState(initialState);
  const setStatusPayback = useCallback((status) => setPayback(status));
  return [isStatusPayback, setStatusPayback];
}