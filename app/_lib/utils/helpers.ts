import { ColumnProps, SubTaskProps } from "@/app/_types/types";
import { columnPlaceholders, placeholders } from "./constants";

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
