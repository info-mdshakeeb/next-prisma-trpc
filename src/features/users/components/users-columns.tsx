"use client";

import { LongText } from "@/components/long-text";
import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { ArrowUpDown, Text } from "lucide-react";
import { TUserItem } from "../user.type";
import { DataTableRowActions } from "./data-table-row-actions";

export const usersColumns: ColumnDef<TUserItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    id: "search",
    accessorFn: (row) => row.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36 ps-3">{row.original.name ?? "-"}</LongText>
    ),
    meta: {
      label: "search",
      placeholder: "Search users...",
      variant: "text",
      icon: Text,
    },
    enableColumnFilter: true,
    enableHiding: false,
    enableSorting: false,
  },
  {
    id: "fullName",
    accessorFn: (row) => row.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name = row.original.name;
      return <LongText className="max-w-36">{name ?? "-"}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-fit ps-2 text-nowrap">{row.original.email ?? "-"}</div>
    ),
    enableSorting: false,
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => <div>{row.original.phone ?? "-"}</div>,
    enableSorting: false,
  },
  {
    id: "role",
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const { role } = row.original;
      return (
        <div className="flex items-center gap-x-2">
          <span className="text-sm capitalize">{role ?? "user"}</span>
        </div>
      );
    },
    meta: {
      label: "Role",
      variant: "select",
      options: ["admin", "user"].map((role) => ({
        label: role.charAt(0).toUpperCase() + role.slice(1),
        value: role,
      })),
      icon: ArrowUpDown,
    },
    enableColumnFilter: true,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
];
