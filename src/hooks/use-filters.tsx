"use client";

import { PAGINATION } from "@/config/constants";
import React from "react";

interface ISearchProps<
  T extends {
    search: string;
    page: number;
  }
> {
  params: T;
  setParams: (params: T) => void;
  debounceMs?: number;
}

export function useSearch<
  T extends {
    search: string;
    page: number;
  }
>({ params, setParams, debounceMs = 500 }: ISearchProps<T>) {
  const [localSearch, setLocalSearch] = React.useState(params.search);

  React.useEffect(() => {
    if (localSearch == "" && params.search != "") {
      setParams({ ...params, search: "", page: PAGINATION.DEFAULT_PAGE });
      return;
    }

    const handler = setTimeout(() => {
      if (localSearch !== params.search) {
        setParams({
          ...params,
          search: localSearch,
          page: PAGINATION.DEFAULT_PAGE,
        });
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [localSearch, params, setParams, debounceMs]);

  React.useEffect(() => {
    setLocalSearch(params.search);
  }, [params.search]);

  return {
    searchValue: localSearch,
    setSearchValue: setLocalSearch,
  };
}
