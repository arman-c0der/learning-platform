"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";

export const columns = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-purple-100 hover:bg-purple-950/40 hover:text-purple-100"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-purple-100">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "totalQuiz",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-purple-100 hover:bg-purple-950/40 hover:text-purple-100"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Quiz <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-purple-100">{row.getValue("totalQuiz")}</div>
    ),
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-purple-100 hover:bg-purple-950/40 hover:text-purple-100"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;

      return (
        <Badge
          className={cn(
            "border border-purple-900/40 bg-purple-950/50 text-purple-100 hover:bg-purple-950/50",
            isPublished &&
              "border-emerald-800/40 bg-emerald-950/40 text-purple-100 hover:bg-emerald-950/40"
          )}
        >
          {isPublished ? "Published" : "Unpublished"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-purple-100 hover:bg-purple-950/40 hover:text-purple-100"
            >
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-[#0f0720] border border-purple-950 text-purple-100"
          >
            <Link href={`/dashboard/quiz-sets/${id}`}>
              <DropdownMenuItem className="cursor-pointer hover:bg-purple-950 focus:bg-purple-950">
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];