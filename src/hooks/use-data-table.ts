"use client";

import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  SingleParser,
  useQueryState,
  useQueryStates,
  type UseQueryStateOptions
} from "nuqs";
import * as React from "react";

import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type PaginationState,
  type RowSelectionState,
  type TableOptions,
  type Updater,
  type VisibilityState
} from "@tanstack/react-table";
import { useDebouncedCallback } from "./use-debounced-callback";

export type IQueryKeys = {
  page: string;
  perPage: string;
  sort: string;
  filters: string;
};

const PAGE_KEY = "page";
const PER_PAGE_KEY = "perPage";
const FILTERS_KEY = "filters";
const DEBOUNCE_MS = 300;
const THROTTLE_MS = 300;
const ARRAY_SEPARATOR = ",";

interface UseDataTableProps<TData>
  extends Omit<
    TableOptions<TData>,
    | "state"
    | "pageCount"
    | "getCoreRowModel"
    | "manualFiltering"
    | "manualPagination"
    | "manualSorting"
  >,
  Required<Pick<TableOptions<TData>, "pageCount">> {
  queryKeys?: Partial<IQueryKeys>;
  history?: "push" | "replace";
  debounceMs?: number;
  throttleMs?: number;
  clearOnDefault?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  startTransition?: React.TransitionStartFunction;
}

export function useDataTable<TData>(props: UseDataTableProps<TData>) {
  const {
    columns,
    pageCount = -1,
    initialState,
    queryKeys,
    history = "replace",
    debounceMs = DEBOUNCE_MS,
    throttleMs = THROTTLE_MS,
    clearOnDefault = false,
    scroll = false,
    shallow = true,
    startTransition,
    ...tableProps
  } = props;
  const pageKey = queryKeys?.page ?? PAGE_KEY;
  const perPageKey = queryKeys?.perPage ?? PER_PAGE_KEY;
  const filtersKey = queryKeys?.filters ?? FILTERS_KEY;

  const queryStateOptions = React.useMemo<
    Omit<UseQueryStateOptions<string>, "parse">
  >(
    () => ({
      history,
      scroll,
      shallow,
      throttleMs,
      debounceMs,
      clearOnDefault,
      startTransition,
    }),
    [
      history,
      scroll,
      shallow,
      throttleMs,
      debounceMs,
      clearOnDefault,
      startTransition,
    ],
  );

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    initialState?.rowSelection ?? {},
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(initialState?.columnVisibility ?? {});

  const [page, setPage] = useQueryState(
    pageKey,
    parseAsInteger.withOptions(queryStateOptions).withDefault(1),
  );
  const [perPage, setPerPage] = useQueryState(
    perPageKey,
    parseAsInteger
      .withOptions(queryStateOptions)
      .withDefault(initialState?.pagination?.pageSize ?? 10),
  );

  const pagination: PaginationState = React.useMemo(() => {
    return {
      pageIndex: page - 1,
      pageSize: perPage,
    };
  }, [page, perPage]);

  const onPaginationChange = React.useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      if (typeof updaterOrValue === "function") {
        const newPagination = updaterOrValue(pagination);
        void setPage(newPagination.pageIndex + 1);
        void setPerPage(newPagination.pageSize);
      } else {
        void setPage(updaterOrValue.pageIndex + 1);
        void setPerPage(updaterOrValue.pageSize);
      }
    },
    [pagination, setPage, setPerPage],
  );


  // Filters
  const filterableColumns = React.useMemo(() => {
    return columns.filter((column) => column.enableColumnFilter);
  }, [columns]);

  const filterParsers = React.useMemo(() => {
    return filterableColumns.reduce<
      Record<string, SingleParser<string> | SingleParser<string[]>>
    >((acc, column) => {
      if (column.meta?.options) {
        acc[column.id ?? ""] = parseAsArrayOf(
          parseAsString,
          ARRAY_SEPARATOR,
        ).withOptions(queryStateOptions);
      } else {
        acc[column.id ?? ""] = parseAsString.withOptions(queryStateOptions);
      }
      return acc;
    }, {});
  }, [filterableColumns, queryStateOptions]);

  const [filterValues, setFilterValues] = useQueryStates(filterParsers);

  const debouncedSetFilterValues = useDebouncedCallback(
    (values: typeof filterValues) => {
      void setPage(1);
      void setFilterValues(values);
    },
    debounceMs,
  );

  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    return Object.entries(filterValues).reduce<ColumnFiltersState>(
      (filters, [key, value]) => {
        if (value !== null) {
          const processedValue = Array.isArray(value)
            ? value
            : typeof value === "string" && /[^a-zA-Z0-9]/.test(value)
              ? value.split(/[^a-zA-Z0-9]+/).filter(Boolean)
              : [value];

          filters.push({
            id: key,
            value: processedValue,
          });
        }
        return filters;
      },
      [],
    );
  }, [filterValues]);

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters);

  const onColumnFiltersChange = React.useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      setColumnFilters((prev) => {
        const next =
          typeof updaterOrValue === "function"
            ? updaterOrValue(prev)
            : updaterOrValue;

        const filterUpdates = next.reduce<
          Record<string, string | string[] | null>
        >((acc, filter) => {
          if (filterableColumns.find((column) => column.id === filter.id)) {
            acc[filter.id] = filter.value as string | string[];
          }
          return acc;
        }, {});

        for (const prevFilter of prev) {
          if (!next.some((filter) => filter.id === prevFilter.id)) {
            filterUpdates[prevFilter.id] = null;
          }
        }

        debouncedSetFilterValues(filterUpdates);
        return next;
      });
    },
    [debouncedSetFilterValues, filterableColumns],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    ...tableProps,
    columns,
    initialState,
    pageCount,
    state: {
      pagination,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    defaultColumn: {
      ...tableProps.defaultColumn,
      enableColumnFilter: false,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange,
    onColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    meta: {
      ...tableProps.meta,
      queryKeys: {
        page: pageKey,
        perPage: perPageKey,
        filters: filtersKey,
      },
    },
  });

  return { table, shallow, debounceMs, throttleMs };
}
