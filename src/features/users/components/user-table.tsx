"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/toolbar";

import { DataTableSkeleton } from "@/components/loader/data-table-skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useDataTable } from "@/hooks/use-data-table";
import { useTransition } from "react";
import { useUsers } from "../hooks/use-users";
import { TUserItem } from "../user.type";
import { usersColumns } from "./users-columns";

export function UsersTable() {
  const [isPending, startTransition] = useTransition();
  const { data, isLoading, isFetching, error } = useUsers();

  const { table } = useDataTable<TUserItem>({
    data: data?.items || [],
    columns: usersColumns,
    pageCount: data?.totalPages ?? 0,
    clearOnDefault: true,
    shallow: false,
    startTransition,
  });

  if (isLoading) {
    return (
      <DataTableSkeleton
        columnCount={usersColumns.length}
        rowCount={10}
        filterCount={2}
      />
    );
  }
  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  return (
    <DataTable
      className={`relative transition-opacity duration-150 `}
      table={table}
    >
      <DataTableToolbar table={table}>
        {(isPending || isFetching) && <Spinner />}
      </DataTableToolbar>
    </DataTable>
  );
}
