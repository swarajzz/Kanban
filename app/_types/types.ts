export type BoardProps = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type SubTaskProps = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  placeholder?: string;
};

export type TaskProps = {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  columnId: string;
  subTasks: SubTaskProps[];
};

export type ColumnProps = {
  id: string;
  name: string;
  boardId: string;
};

export type NewboardFormFields = {
  boardName: string;
  columns: { name: string; placeholder: string }[];
};
