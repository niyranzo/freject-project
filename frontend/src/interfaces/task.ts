export type TaskStatus =
  | "to_do"
  | "progress"
  | "completed";

export interface Task {
  id: number;

  id_project: number;

  title: string;

  status: TaskStatus;
}