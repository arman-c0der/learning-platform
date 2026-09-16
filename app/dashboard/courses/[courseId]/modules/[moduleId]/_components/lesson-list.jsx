"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CirclePlay } from "lucide-react";

export const LessonList = ({ items, onReorder, onEdit }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [modules, setModules] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setModules(items);
  }, [items]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(modules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedModules = items.slice(startIndex, endIndex + 1);

    setModules(items);

    const bulkUpdateData = updatedModules.map((module) => ({
      id: module.id,
      position: items.findIndex((item) => item.id === module.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="modules">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {modules.map((module, index) => (
              <Draggable key={module.id} draggableId={module.id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "mb-4 flex items-center gap-x-2 rounded-lg border border-purple-900/40 bg-[#0a0512] text-sm text-purple-200",
                      module.active &&
                        "border-purple-700/50 bg-purple-950/30 text-purple-100"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "rounded-l-lg border-r border-r-purple-900/40 px-2 py-3 text-purple-400 transition hover:bg-purple-950/40",
                        module.active &&
                          "border-r-purple-700/50 hover:bg-purple-900/40"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <CirclePlay size={18} className="text-purple-400" />
                      {module.title}
                    </div>
                    <div className="ml-auto flex items-center gap-x-2 pr-2">
                      <Badge
                        className={cn(
                          "border border-purple-900/40 bg-purple-950/50 text-purple-100 hover:bg-purple-950/50",
                          module.active &&
                            "border-emerald-800/40 bg-emerald-950/40 text-purple-100 hover:bg-emerald-950/40"
                        )}
                      >
                        {module.active ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(module.id)}
                        className="h-4 w-4 cursor-pointer text-purple-300 transition hover:text-purple-100"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};