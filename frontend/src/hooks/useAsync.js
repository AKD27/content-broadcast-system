"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";


export function useAsync(asyncFn, deps = []) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message ?? "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  
  }, deps);

  useEffect(() => {
    execute();
  
  }, []);

  return { data, loading, error, refetch: execute };
}


export function useMutation(asyncFn, { onSuccess, onError } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const mutate = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn(...args);
      onSuccess?.(result);
      return result;
    } catch (err) {
      const msg = err.message ?? "Something went wrong";
      setError(msg);
      onError?.(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [asyncFn, onSuccess, onError]);

  return { mutate, loading, error };
}
