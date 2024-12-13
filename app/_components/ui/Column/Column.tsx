"use client";
import { BoardProps, ColumnProps, TaskProps } from "@/app/_types/types";
import React, { useState } from "react";
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
  console.log(column);
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
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <li
        ref={setNodeRef}
        className="mb-4 flex min-w-72 max-w-80 flex-col items-center gap-3 border-2 border-rose-500 opacity-60"
        style={style}
      ></li>
    );
  }

  return (
    <li
      ref={setNodeRef}
      className="mb-4 flex min-w-72 max-w-80 flex-col items-center gap-3"
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
    </li>
  );
}

export default Column;
