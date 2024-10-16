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
};

export type TaskProps = {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  columnId: string;
  userId: string;
  subTasks: SubTaskProps[];
};

export type ColumnProps = {
  id: string;
  name: string;
  boardId: string;
  tasks: TaskProps[];
};
