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

export type UpdateSubtaskProps = {
  id: string;
  title: string;
  isCompleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  placeholder?: string;
};

export type DataProps = {
  title: string;
  description: string;
  status: string;
  subTasks: UpdateSubtaskProps[];
};

export type UpdateTaskProps = {
  data: DataProps;
  taskId?: string;
  columnId?: string;
};

export type UpdateBoardProps = {
  data: {
    name: string;
    columns: ColumnProps[];
  };
  boardId?: string;
  userId: string;
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
  id?: string;
  name: string;
  boardId?: string;
  placeholder?: string;
  tasks?: TaskProps[];
};

export type NewboardFormFields = {
  boardName: string;
  columns: { id?: string; name: string; placeholder?: string }[];
};
