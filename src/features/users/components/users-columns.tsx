"use client";

import { LongText } from "@/components/long-text";
import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { ArrowUpDown, Text } from "lucide-react";
import { roles } from "../user.const";
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
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36 ps-3">{row.original.name}</LongText>
    ),
    meta: {
      label: "search",
      placeholder: "Search titles...",
      variant: "text",
      icon: Text,
    },
    enableColumnFilter: true,
    enableHiding: false,
    enableSorting: false,
  },
  {
    id: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const { name } = row.original;
      return <LongText className="max-w-36">{name}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-fit ps-2 text-nowrap">{row.getValue("email")}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => <div>{row.original.phone ?? "_"}</div>,
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
      const userType = roles.find(({ value }) => value === role);

      if (!userType) {
        return null;
      }

      return (
        <div className="flex items-center gap-x-2">
          {userType.icon && (
            <userType.icon size={16} className="text-muted-foreground" />
          )}
          <span className="text-sm capitalize">{row.getValue("role")}</span>
        </div>
      );
    },
    meta: {
      label: "Role",
      variant: "select",
      options: ["USER", "ADMIN", "SUPERADMIN"].map((role) => ({
        label: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase(),
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
