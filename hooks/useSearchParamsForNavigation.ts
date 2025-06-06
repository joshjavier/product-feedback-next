import { useCallback } from 'react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

export const useSearchParamsForNavigation = (): [
  ReadonlyURLSearchParams,
  (name: string, value: string | undefined) => string,
] => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  return [searchParams, createQueryString];
};
