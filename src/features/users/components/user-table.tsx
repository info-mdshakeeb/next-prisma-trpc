"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/toolbar";

import { Spinner } from "@/components/ui/spinner";
import { useDataTable } from "@/hooks/use-data-table";
import { useTransition } from "react";
import { useSuspenseUsers } from "../hooks/use-users";
import { usersColumns } from "./users-columns";

export function UsersTable() {
  const [isPending, startTransition] = useTransition();
  const { data, isPending: isLoading, isFetching } = useSuspenseUsers();

  const { table } = useDataTable({
    data: data?.items || [],
    columns: usersColumns,
    pageCount: data?.totalPages ?? 0,
    clearOnDefault: true,
    shallow: false,
    startTransition,
  });

  return (
    <DataTable
      className={`relative transition-opacity duration-150 `}
      table={table}
    >
      <DataTableToolbar table={table}>
        {(isPending || isLoading || isFetching) && <Spinner />}
      </DataTableToolbar>
    </DataTable>
  );
}
