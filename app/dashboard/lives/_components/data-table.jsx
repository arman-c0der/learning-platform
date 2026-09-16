"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter lives..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-purple-900/50 bg-[#0a0512] text-purple-100 placeholder:text-purple-100/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
        />
        <Link href="/dashboard/lives/add">
          <Button className="bg-purple-600 text-purple-100 hover:bg-purple-500">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Live
          </Button>
        </Link>
      </div>
      <div className="overflow-hidden rounded-xl border border-purple-900/40">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-purple-900/40 bg-purple-950/20 hover:bg-purple-950/20"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-purple-100">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-purple-900/40 hover:bg-purple-950/30 data-[state=selected]:bg-purple-950/40"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-purple-100">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="border-purple-900/40 hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-purple-100/60"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="border-purple-800 bg-transparent text-purple-100 hover:bg-purple-950 hover:text-purple-100"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="border-purple-800 bg-transparent text-purple-100 hover:bg-purple-950 hover:text-purple-100"
        >
          Next
        </Button>
      </div>
    </div>
  );
}