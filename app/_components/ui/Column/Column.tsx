"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Cols from "./Cols";

function Column({
  id,
  name,
  children,
}: {
  id: string;
  name: string;
  children: React.ReactNode;
}) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "Column",
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
        className="mb-4 flex min-w-80 flex-col items-center gap-3 rounded-lg border-2 border-primary-200 opacity-60"
        style={style}
      ></section>
    );
  }

  return (
    <section
      className="mb-4 flex min-w-80 flex-col gap-3 rounded-lg"
      ref={setNodeRef}
      style={style}
    >
      <Cols
        dndAttributes={attributes}
        dndListeners={listeners}
        columnName={name}
      >
        {children}
      </Cols>
    </section>
  );
}

export default Column;
