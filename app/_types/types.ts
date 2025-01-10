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
    name?: string;
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
  order: number;
  createdAt: Date;
  updatedAt: Date;
  columnId: string;
  subTasks: SubTaskProps[];
};

export type ColumnProps = {
  id: string;
  name: string;
  order?: number;
  boardId?: string;
  placeholder: string;
  tasks?: TaskProps[];
};

export type NewEditColumnProps = {
  id: string;
  name: string;
  order?: number;
  boardId?: string;
  placeholder?: string;
  tasks?: TaskProps[];
};

export type NewFormFields = {
  name: string;
  columns: NewEditColumnProps[];
};

export type EditFormFields = {
  name: string;
  editColumns: NewEditColumnProps[];
};
