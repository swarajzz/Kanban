import { columnPlaceholders, placeholders } from "./constants";
import { ColumnProps, SubTaskProps } from "@/_types/types";

export function getRandomPlaceholder() {
  const randomIndex = Math.floor(Math.random() * placeholders.length);
  return placeholders[randomIndex];
}

export function getRandomPlaceholderColumn() {
  const randomIndex = Math.floor(Math.random() * columnPlaceholders.length);
  return columnPlaceholders[randomIndex];
}

export function getCompletedSubtasksLength(subTasks: SubTaskProps[]) {
  return subTasks.filter((item) => item.isCompleted).length;
}

export function getColumnId(columns: ColumnProps[], taskStatus: string) {
  return columns.find((column) => column.name === taskStatus)?.id;
}

export function slugToName(slug) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function reorderTasks(
  activeColumnIndex: number,
  overColumnIndex: number,
  activeTaskIndex: number,
  overTaskIndex: number,
  overTaskColumn: ColumnProps,
  newItems: ColumnProps[],
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

  activeTasks[activeTaskIndex].status = overTaskColumn.name;
}

export function reorderColumns(
  activeColumnIndex: number,
  overColumnIndex: number,
  updatedColumns: ColumnProps[],
) {
  const activeColumn = updatedColumns[activeColumnIndex];
  const overColumn = updatedColumns[overColumnIndex];

  if (overColumnIndex === 0) {
    activeColumn.order = overColumn.order - 1;
  } else if (overColumnIndex === updatedColumns.length - 1) {
    activeColumn.order = overColumn.order + 1;
  } else if (activeColumnIndex > overColumnIndex) {
    activeColumn.order =
      (updatedColumns[overColumnIndex - 1].order + overColumn.order) / 2;
  } else {
    activeColumn.order =
      (updatedColumns[overColumnIndex + 1].order + overColumn.order) / 2;
  }
}
