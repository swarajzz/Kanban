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
  const [isApiCall, setApicall] = useState(false);

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

  useEffect(() => {
    useBoardStore.setState({ board });
    useBoardStore.setState({ columns: columnsState });
  }, [board, columnsState]);

  useEffect(() => {
    const transformedData = {
      name: board.name,
      columns: columnsState,
    };

    const makeApiCall = async () => {
      if (isApiCall) {
        try {
          await updateBoard({
            data: transformedData,
            boardId: board.id,
            userId,
          });
        } catch (error) {
          console.error("Error updating the board:", error);
        } finally {
          setApicall(false); // Reset the state after the API call
        }
      }
    };

    makeApiCall();
  }, [isApiCall]);

  console.log(columnsState);

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
  // }, [isApiCall]);

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


    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (
      active.data.current?.type !== "Task" &&
      over.data.current?.type !== "Task"
    ) {
      setColumns((columnsState) => {
        const activeColumnIndex = columnsState.findIndex(
          (col) => col.id === activeId,
        );

        const overColumnIndex = columnsState.findIndex(
          (col) => col.id === overId,
        );

        const updatedColumns = [...columnsState];

        console.log(overColumnIndex, activeColumnIndex);

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

    setApicall(true);
  }

  function reorderItems(
    activeColumnIndex: number,
    overColumnIndex: number,
    activeTaskIndex: number,
    overTaskIndex: number,
    newItems,
    over: boolean = false,
  ) {
    const activeTasks = newItems[activeColumnIndex].tasks;
    const overTasks = newItems[overColumnIndex].tasks;

    if (overTaskIndex === 0) {
      activeTasks[activeTaskIndex].order = overTasks[overTaskIndex].order - 1;
    } else if (
      overTaskIndex === Number(over)
        ? overTasks.length - 1
        : activeTasks.length - 1
    ) {
      activeTasks[activeTaskIndex].order = overTasks[overTaskIndex].order + 1.0;
    } else if (activeTaskIndex > overTaskIndex) {
      activeTasks[activeTaskIndex].order =
        (activeTasks[overTaskIndex - 1].order +
          activeTasks[overTaskIndex].order) /
        2;
    } else {
      activeTasks[activeTaskIndex].order =
        (activeTasks[overTaskIndex + 1].order +
          activeTasks[overTaskIndex].order) /
        2;
    }
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
    const activeTaskColumn = findColumn(activeId as string);

    if (activeTaskColumn === undefined) {
      return;
    }

    const activeColumnIndex = findColumnIndex(activeTaskColumn);

    const activeTaskIndex = activeTaskColumn.tasks.findIndex(
      (task) => task.id === activeId,
    );

    const activeTask = activeTaskColumn.tasks.find(
      (task) => task.id === activeId,
    );

    if (activeTask === undefined) {
      return;
    }

    // Task over Task
    if (isActiveTask && isOverTask) {
      const overTaskColumn = findColumn(overId as string);

      if (!activeTaskColumn || !overTaskColumn) {
        return;
      }

      const overColumnIndex = findColumnIndex(overTaskColumn);

      const overTask = overTaskColumn.tasks.find((task) => task.id === overId)!;

      const overTaskIndex = overTaskColumn.tasks.findIndex(
        (task) => task.id === overId,
      );

      // Task over Same Column Task
      if (activeTaskColumn.id === overTaskColumn.id) {
        let newItems = [...columnsState];

        reorderItems(
          activeColumnIndex,
          overColumnIndex,
          activeTaskIndex,
          overTaskIndex,
          newItems,
        );

        newItems[activeColumnIndex].tasks = arrayMove(
          newItems[activeColumnIndex].tasks,
          activeTaskIndex,
          overTaskIndex,
        );
        setColumns(newItems);
      } else {
        // Task over Different Column Task
        activeTask.columnId = overTask.columnId;
        let newItems = [...columnsState];

        reorderItems(
          activeColumnIndex,
          overColumnIndex,
          activeTaskIndex,
          overTaskIndex,
          newItems,
          true,
        );

        const [removeditem] = newItems[activeColumnIndex].tasks.splice(
          activeTaskIndex,
          1,
        );
        newItems[overColumnIndex].tasks.splice(overTaskIndex, 0, removeditem);
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

      if (activeTaskColumn.id === overColumn.id) return;
      console.log("Over column");

      const overColumnIndex = columnsState.findIndex(
        (col) => col.id === overId,
      );

      let newItems = [...columnsState];

      activeTask.columnId = overColumn.id;

      activeTask.order =
        overColumn.tasks.length > 0
          ? overColumn.tasks[overColumn.tasks.length - 1].order + 1.0
          : 1.0;

      console.log(newItems);

      const [removedItem] = newItems[activeColumnIndex].tasks.splice(
        activeTaskIndex,
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
      onDragOver={onDragOver}
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
