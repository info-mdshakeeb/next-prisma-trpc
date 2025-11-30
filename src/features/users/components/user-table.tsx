"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/toolbar";

import { useDataTable } from "@/hooks/use-data-table";
import { useSuspenseUsers } from "../hooks/use-users";
import { usersColumns } from "./users-columns";

export function UsersTable() {
  const { data } = useSuspenseUsers();
  const { table } = useDataTable({
    data: data?.items || [],
    columns: usersColumns,
    pageCount: data.totalPages,
    clearOnDefault: true,
    shallow: false,
  });

  return (
    <DataTable
      className="relative "
      table={table}
      // actionBar={<TasksTableActionBar table={table} />}
    >
      <DataTableToolbar table={table}></DataTableToolbar>
    </DataTable>
  );
}
