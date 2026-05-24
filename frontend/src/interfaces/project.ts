import { Client } from "./client";

export type ProjectStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Project {

  id: number;

  id_user: number;
  id_client: number;

  name: string;
  price: number;

  status: ProjectStatus;

  create_date: string;

  Client?: Client;

}