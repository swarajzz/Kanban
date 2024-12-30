"use client";
import Column from "./Column";
import { useEffect, useMemo, useState } from "react";
import {
  Active,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskItem from "../Task/TaskItem";
import { BoardProps, ColumnProps, TaskProps } from "@/_types/types";
import { useBoardStore } from "@/_store/store";
import { updateBoard } from "@/_lib/actions";

function ColumnList({
  columns,
  board,
  tasks,
  userId,
}: {
  columns: ColumnProps[];
  board: BoardProps;
  tasks: TaskProps[];
  userId: string;
}) {
  const [columnsState, setColumns] = useState<ColumnProps[]>(columns);
  const [tasksState, setTasks] = useState<TaskProps[]>(tasks);

  const columnsId = useMemo(
    () => columnsState.map((col) => col.id!),
    [columnsState],
  );

  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  const findColumn = (id: string): ColumnProps | undefined => {
    const column = columnsState.find((col) =>
      col.tasks?.find((task) => task.id === id),
    );
    if (!column) {
      return;
    }

    return column;
  };

  const findColumnIndex = (column: ColumnProps): number => {
    return columnsState.findIndex((col) => col.id === column?.id);
  };

  function findColumnName(id: string): string {
    const column = columnsState.find((col) => col.id === id);

    if (!column) throw new Error("Task Not found");

    return column.name;
  }

  function findColumnTasks(id: string): TaskProps[] {
    const column = columnsState.find((col) => col.id === id);

    if (!column) throw new Error("Task Not found");

    return column.tasks;
  }

  const findTaskTitle = (id: string) => {
    const task = tasksState.find((col) => col.id === id);
    if (!task) throw new Error("Task Not found");
    return task?.title;
  };

  const findTask = (id: string) => {
    const task = tasksState.find((col) => col.id === id);
    if (!task) throw new Error("Task not found");
    return task;
  };

  // useEffect(() => {
  //   useBoardStore.setState({ board });
  //   useBoardStore.setState({ columns: columnsState });
  // }, [board, columnsState]);

  // useEffect(() => {
  //   const updateBoardOnServer = async () => {
  //     // await updateBoard({
  //     //   data: { name: board.name, columns: columnsState },
  //     //   boardId: board.id,
  //     //   userId,
  //     // });

  //     const transformedData = {
  //       name: board.name,
  //       columns: columnsState,
  //     };

  //     await updateBoard({ data: transformedData, boardId: board.id, userId });
  //   };

  //   updateBoardOnServer();

  //   // useBoardStore.setState({ board, columns: columnsState });
  // }, [columnsState]);

  function onDragStart({ active }: { active: Active }): void {
    if (active.data.current?.type === "Column") {
      setActiveColumnId(active.id as string);
      return;
    }
    if (active.data.current?.type === "Task") {
      setActiveTaskId(active.id as string);
      return;
    }
  }

  async function onDragEnd(e: DragEndEvent) {
    setActiveColumnId(null);
    setActiveTaskId(null);

    const { active, over } = e;

    if (!over) return;

    if (
      active.data.current?.type === "Task" ||
      over.data.current?.type === "Task"
    )
      return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setColumns((columnsState) => {
      const activeColumnIndex = columnsState.findIndex(
        (col) => col.id === activeId,
      );

      const overColumnIndex = columnsState.findIndex(
        (col) => col.id === overId,
      );

      const updatedColumns = [...columnsState];

      if (overColumnIndex === 0) {
        updatedColumns[activeColumnIndex].order =
          updatedColumns[overColumnIndex].order - 1;
      } else if (overColumnIndex === updatedColumns.length - 1) {
        updatedColumns[activeColumnIndex].order =
          updatedColumns[overColumnIndex].order + 1;
      } else if (activeColumnIndex > overColumnIndex) {
        updatedColumns[activeColumnIndex].order =
          (updatedColumns[overColumnIndex - 1].order +
            updatedColumns[overColumnIndex].order) /
          2;
      } else {
        updatedColumns[activeColumnIndex].order =
          (updatedColumns[overColumnIndex + 1].order +
            updatedColumns[overColumnIndex].order) /
          2;
      }

      const newColumns = arrayMove(
        updatedColumns,
        activeColumnIndex,
        overColumnIndex,
      );

      return newColumns;
    });
  }

  function onDragOver(e: DragOverEvent): void {
    const { active, over } = e;
    if (!over) return;

    const isActiveColumn = active.data.current?.type === "Column";
    if (isActiveColumn) return;

    const activeId = active.id;
    const overId = over.id; // Can be task or column

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    // Dropping a Task over another Task
    // Drop a task on the same column
    // Drop a task on different column
    const activeColumn = findColumn(activeId as string);

    if (activeColumn === undefined) {
      return;
    }

    const activeColumnIndex = findColumnIndex(activeColumn);

    const activeIndex = activeColumn.tasks.findIndex(
      (task) => task.id === activeId,
    );

    const activeTask = activeColumn.tasks.find((task) => task.id === activeId)!;

    if (activeTask === undefined) {
      return;
    }

    if (isActiveTask && isOverTask) {
      const overColumn = findColumn(overId as string);

      if (!activeColumn || !overColumn) {
        return;
      }

      const overColumnIndex = findColumnIndex(overColumn);

      const overTask = overColumn.tasks.find((task) => task.id === overId)!;

      const overIndex = overColumn.tasks.findIndex(
        (task) => task.id === overId,
      );

      if (activeColumn.id === overColumn.id) {
        let newItems = [...columnsState];

        newItems[activeColumnIndex].tasks = arrayMove(
          newItems[activeColumnIndex].tasks,
          activeIndex,
          overIndex,
        );
        setColumns(newItems);
      } else {
        activeTask.columnId = overTask.columnId;
        let newItems = [...columnsState];
        const [removeditem] = newItems[activeColumnIndex].tasks.splice(
          activeIndex,
          1,
        );
        newItems[overColumnIndex].tasks.splice(overIndex, 0, removeditem);
        setColumns(newItems);
      }
    }

    // Dropping a Task over another column
    const isOverColumn = over.data.current?.type === "Column";

    if (isActiveTask && isOverColumn) {
      const overColumn = columnsState?.find((col) => col.id === overId);
      if (overColumn === undefined) {
        return;
      }

      if (activeColumn.id === overColumn.id) return;

      const overColumnIndex = columnsState.findIndex(
        (col) => col.id === overId,
      );

      let newItems = [...columnsState];
      const [removedItem] = newItems[activeColumnIndex].tasks.splice(
        activeIndex,
        1,
      );
      newItems[overColumnIndex].tasks.push(removedItem);
      setColumns(newItems);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      // onDragOver={onDragOver}
      id="unique-dnd-context-id"
    >
      <SortableContext items={columnsId}>
        <div className="flex size-full gap-10 overflow-auto bg-primary-600 px-4 py-4">
          {columnsState?.map((column) => (
            <Column id={column.id} key={column.id} name={column.name}>
              <SortableContext items={column.tasks.map((i) => i.id)}>
                <ul className="flex max-w-80 flex-col gap-5 pb-5">
                  {column.tasks.map((task) => (
                    <TaskItem
                      title={task.title}
                      id={task.id}
                      key={task.id}
                      task={task}
                    />
                  ))}
                </ul>
              </SortableContext>
            </Column>
          ))}
        </div>
      </SortableContext>
      {typeof window !== "undefined" &&
        createPortal(
          <DragOverlay>
            {activeColumnId && (
              <Column
                id={activeColumnId}
                name={findColumnName(activeColumnId) as string}
              >
                {findColumnTasks(activeColumnId).map((task) => (
                  <TaskItem
                    title={task.title}
                    id={task.id}
                    key={task.id}
                    task={task}
                  />
                ))}
              </Column>
            )}
            {activeTaskId && (
              <TaskItem
                title={findTaskTitle(activeTaskId)}
                id={activeTaskId}
                key={activeTaskId}
                task={findTask(activeTaskId)}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  );
}

export default ColumnList;
