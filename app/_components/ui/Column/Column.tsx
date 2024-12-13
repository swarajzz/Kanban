"use client";
import { ColumnProps, TaskProps } from "@/app/_types/types";
import React from "react";
import Tasks from "../Task/Tasks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Column({
  column,
  tasks,
}: {
  column: ColumnProps;
  tasks: TaskProps[];
}) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id!,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  if (isDragging) {
    return (
      <section
        ref={setNodeRef}
        className="mb-4 flex min-w-80 flex-col items-center gap-3 border-2 border-rose-500"
        style={style}
      ></section>
    );
  }

  return (
    <section
      className="mb-4 flex min-w-80 flex-col gap-3"
      ref={setNodeRef}
      style={style}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex items-center gap-5 self-start"
      >
        <div className="border-radius h-3 w-3 rounded-full bg-accent-500"></div>
        <h3 className="text-sm font-bold uppercase">{column.name}</h3>
      </div>
      <Tasks tasks={tasks} />
    </section>
  );
}

export default Column;
