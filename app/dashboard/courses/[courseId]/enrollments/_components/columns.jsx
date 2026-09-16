"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { formatMyDate } from "@/lib/date";

export const columns = [
  {
    id: "name",
    accessorKey: "studentName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-purple-100 hover:bg-purple-950/40 hover:text-purple-100"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Student Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-purple-100">{row.getValue("name")}</div>
    ),
  },

  {
    accessorKey: "studentEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-purple-100 hover:bg-purple-950/40 hover:text-purple-100"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Student Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-purple-100">{row.getValue("studentEmail")}</div>
    ),
  },

  {
    accessorKey: "quizMark",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-purple-100 hover:bg-purple-950/40 hover:text-purple-100"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Quiz Mark
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-purple-100">{row.getValue("quizMark")}</div>
    ),
  },

  {
    accessorKey: "progress",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-purple-100 hover:bg-purple-950/40 hover:text-purple-100"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Progress
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-purple-100">{row.getValue("progress")}</div>
    ),
  },

  {
    accessorKey: "enrollment_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-purple-100 hover:bg-purple-950/40 hover:text-purple-100"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Enroll Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const enrollmentDate = row.getValue("enrollment_date");

      return (
        <div className="text-purple-100">{formatMyDate(enrollmentDate)}</div>
      );
    },
  },
];