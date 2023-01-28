import { useEffect, useState } from "react";

export const useDebounce = (value: number, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<number>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value]);

  return debouncedValue;
};
