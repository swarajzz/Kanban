"use client";
import Column from "./Column";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { updateBoard, updateTask } from "@/_lib/actions";
import { reorderColumns, reorderTasks } from "@/_lib/utils/helpers";
import useDialogRef from "@/_hooks/useDialogRef";
import TaskDialog from "@/_components/dialog/TaskDialog";
import EditTask from "@/_components/dialog/EditTask";
import { useParams } from "next/navigation";
import { ClimbingBoxLoader } from "react-spinners";

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
  const [isLoading, setIsLoading] = useState(false);
  const [columnsState, setColumns] = useState<ColumnProps[]>(columns);
  const [tasksState, setTasks] = useState<TaskProps[]>(tasks);
  const [enableApiCall, setApiCall] = useState(false);
  const [apiCallFlag, setApiCallFlag] = useState(false);

  const columnsId = useMemo(
    () => columnsState?.map((col) => col.id!),
    [columnsState],
  );

  const [isShowDropdown, setShowDropdown] = useState(true);

  const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);

  const { dialogRef: viewDialogRef, toggleDialog: toggleViewDialog } =
    useDialogRef();
  const { dialogRef: editDialogRef, toggleDialog: toggleEditDialog } =
    useDialogRef();

  const handleTaskClick = useCallback(
    (task: TaskProps): void => {
      setSelectedTask(task);
      toggleViewDialog();
      setShowDropdown(false);
    },
    [toggleViewDialog],
  );

  const toggleShowDropdown = useCallback(() => {
    setShowDropdown((prev) => !prev);
  }, []);

  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  const { board: boardPath } = useParams<{ board: string }>();

  useEffect(() => {
    setColumns(columns);
  }, [columns]);

  useEffect(() => {
    useBoardStore.setState({ board });
    useBoardStore.setState({ columns: columnsState });
  }, [board, columnsState]);

  useEffect(() => {
    const data = {
      name: board.name,
      editColumns: columnsState,
    };

    const makeApiCall = async () => {
      if (enableApiCall) {
        try {
          setIsLoading(true);
          await updateBoard(data, board.id, userId, true, boardPath);
        } catch (error) {
          console.error("Error updating the board:", error);
        } finally {
          setApiCall(false);
          setApiCallFlag(false);
          setIsLoading(false);
        }
      }
    };

    makeApiCall();
  }, [enableApiCall]);

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

    if (!column?.tasks) throw new Error("Task Not found");

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
    setSelectedTask(null);

    const { active, over } = e;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (
      active.data.current?.type !== "Task" &&
      over.data.current?.type !== "Task"
    ) {
      if (activeId === overId) return;

      setColumns((columnsState) => {
        const activeColumnIndex = columnsState.findIndex(
          (col) => col.id === activeId,
        );
        const overColumnIndex = columnsState.findIndex(
          (col) => col.id === overId,
        );
        const updatedColumns = [...columnsState];
        reorderColumns(activeColumnIndex, overColumnIndex, updatedColumns);
        const newColumns = arrayMove(
          updatedColumns,
          activeColumnIndex,
          overColumnIndex,
        );
        return newColumns;
      });
      setApiCall(true);
    } else {
      apiCallFlag && setApiCall(true);
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

        reorderTasks(
          activeColumnIndex,
          overColumnIndex,
          activeTaskIndex,
          overTaskIndex,
          overTaskColumn,
          newItems,
        );

        newItems[activeColumnIndex].tasks = arrayMove(
          newItems[activeColumnIndex].tasks,
          activeTaskIndex,
          overTaskIndex,
        );
        setColumns(newItems);
        setApiCallFlag(true);
        // setColumns(false);
      } else {
        // Task over Different Column Task
        activeTask.columnId = overTask.columnId;
        let newItems = [...columnsState];

        reorderTasks(
          activeColumnIndex,
          overColumnIndex,
          activeTaskIndex,
          overTaskIndex,
          overTaskColumn,
          newItems,
          true,
        );

        const [removeditem] = newItems[activeColumnIndex].tasks.splice(
          activeTaskIndex,
          1,
        );
        newItems[overColumnIndex].tasks.splice(overTaskIndex, 0, removeditem);
        setColumns(newItems);
        setApiCallFlag(true);
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

      const overColumnIndex = columnsState.findIndex(
        (col) => col.id === overId,
      );

      let newItems = [...columnsState];

      activeTask.columnId = overColumn.id;

      activeTask.order =
        overColumn.tasks.length > 0
          ? overColumn.tasks[overColumn.tasks.length - 1].order + 1.0
          : 1.0;

      activeTask.status = overColumn.name;
      activeTask.columnId = overColumn.id;

      // setSelectedTask(activeTask);

      const [removedItem] = newItems[activeColumnIndex].tasks.splice(
        activeTaskIndex,
        1,
      );
      newItems[overColumnIndex].tasks.push(removedItem);
      setColumns(newItems);
      setApiCallFlag(true);
    }
  }

  return (
    <>
      <TaskDialog
        dialogRef={viewDialogRef}
        toggleDialog={toggleViewDialog}
        task={selectedTask}
        isShowDropdown={isShowDropdown}
        toggleShowDropdown={toggleShowDropdown}
        toggleEditDialog={toggleEditDialog}
      />

      {viewDialogRef.current && selectedTask ? (
        <EditTask
          dialogRef={editDialogRef}
          toggleDialog={toggleEditDialog}
          task={selectedTask}
        />
      ) : (
        ""
      )}

      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        id="unique-dnd-context-id"
      >
        <SortableContext items={columnsId}>
          <div className="flex size-full gap-10 overflow-auto bg-main_bkg px-4 py-4">
            {columnsState?.map((column) => (
              <Column id={column.id} key={column.id} name={column.name}>
                <SortableContext items={column?.tasks.map((i) => i.id)}>
                  <ul className="flex max-w-80 flex-col gap-5 pb-5">
                    {column?.tasks.map((task) => (
                      <TaskItem
                        id={task.id}
                        key={task.id}
                        task={task}
                        handleTaskClick={handleTaskClick}
                      />
                    ))}
                  </ul>
                </SortableContext>
              </Column>
            ))}
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                <p className="text-white">
                  <ClimbingBoxLoader color="#635FC7" />
                </p>
              </div>
            )}
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
                      id={task.id}
                      key={task.id}
                      task={task}
                      handleTaskClick={handleTaskClick}
                    />
                  ))}
                </Column>
              )}
              {activeTaskId && (
                <TaskItem
                  id={activeTaskId}
                  key={activeTaskId}
                  task={findTask(activeTaskId)}
                  handleTaskClick={handleTaskClick}
                />
              )}
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
    </>
  );
}

export default ColumnList;
