"use client";
import { BoardProps, ColumnProps, TaskProps } from "@/app/_types/types";
import Column from "./Column";
import { useEffect, useMemo, useState } from "react";
import { useBoardStore } from "@/app/_store/store";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskItem from "../Task/TaskItem";

function ColumnList({
  columns,
  board,
  tasks,
}: {
  columns: ColumnProps[];
  board: BoardProps;
  tasks: TaskProps[];
}) {
  const [columnsState, setColumns] = useState<ColumnProps[]>(columns);
  const [tasksState, setTasks] = useState<TaskProps[]>(tasks);

  const columnsId = useMemo(
    () => columnsState.map((col) => col.id!),
    [columnsState],
  );

  const [activeColumn, setActiveColumn] = useState<ColumnProps | null>(null);
  const [activeTask, setActiveTask] = useState<TaskProps | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  useEffect(() => {
    useBoardStore.setState({ board });
    useBoardStore.setState({ columns: columnsState });
  }, [board, columnsState]);

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (event.active.data.current?.type === "Task") return;

    setColumns((columnsState) => {
      const activeColumnIndex = columnsState.findIndex(
        (col) => col.id === activeId,
      );

      const overColumnIndex = columnsState.findIndex(
        (col) => col.id === overId,
      );

      return arrayMove(columnsState, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    // Dropping a Task over another Task
    if (isActiveTask && isOverTask) {
      setTasks((tasksState) => {
        const activeIndex = tasksState.findIndex(
          (task) => task.id === activeId,
        );

        const overIndex = tasksState.findIndex((task) => task.id === overId);

        tasksState[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasksState, activeIndex, overIndex);
        // console.log(arrayMove(tasksState, activeIndex, overIndex));
      });
    }

    // Dropping a Task over another column
    const isOverColumn = over.data.current?.type === "Column";

    if (isActiveTask && isOverColumn) {
      setTasks((tasksState) => {
        const activeIndex = tasksState.findIndex(
          (task) => task.id === activeId,
        );

        tasksState[activeIndex].columnId = String(overId);

        return arrayMove(tasksState, activeIndex, activeIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      id="unique-dnd-context-id"
    >
      <div className="flex size-full gap-10 overflow-auto bg-primary-600 px-4 py-4">
        <SortableContext items={columnsId}>
          {columnsState.map((column) => (
            <Column
              key={column.id}
              tasks={tasksState?.filter((task) => task.columnId === column.id)}
              column={column}
            />
          ))}
        </SortableContext>
      </div>

      {typeof window !== "undefined" &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <Column
                column={activeColumn}
                tasks={tasksState?.filter(
                  (task) => task.columnId === activeColumn.id,
                )}
              />
            )}
            {activeTask && <TaskItem task={activeTask} />}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  );
}

export default ColumnList;
