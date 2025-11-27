"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { TUserItem } from "../user.type";
import { usersColumns } from "./users-columns";

type DataTableProps = {
  res: {
    data: TUserItem[];
    total: number;
    perPage: number;
  };
};

export function UsersTable({ res }: DataTableProps) {
  const { table, shallow, debounceMs, throttleMs } = useDataTable({
    data: res.data,
    columns: usersColumns,
    pageCount: Math.ceil(res.total / res.perPage),
    initialState: {
      columnPinning: { right: ["actions"] },
    },
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      <DataTable
        table={table}
        // actionBar={<TasksTableActionBar table={table} />}
      >
        <DataTableToolbar table={table}></DataTableToolbar>
      </DataTable>
    </>
  );
}
