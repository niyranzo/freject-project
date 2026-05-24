const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { Task } from "@/interfaces/task";

export async function getTasks() {

  const res = await fetch(`${API_URL}/tasks`, {
    credentials: "include",
  });

  return res.json();
}

export async function getTaskById(
  id: number
) {

  const res = await fetch(
    `${API_URL}/tasks/${id}`,
    {
      credentials: "include",
    }
  );

  return res.json();
}

export async function getTasksByProject(projectId: number) {
    const res = await fetch(`${API_URL}/tasks/project/${projectId}`, {
        credentials: "include",
    });
    return res.json();
}

export async function createTask(
  taskData: {
    title: string;
    id_project: number;
    status?: string;
  }
) {

  const res = await fetch(
    `${API_URL}/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      credentials: "include",
      body: JSON.stringify(taskData),
    }
  );

  const data = await res.json();

  if (!res.ok) {

    throw new Error(
      data.message ||
      "Error al crear tarea"
    );

  }

  return data;
}

export async function updateTask(
  id: number,
  taskData: {
    title?: string;
    status?: string;
  }
) {

  const res = await fetch(
    `${API_URL}/tasks/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      credentials: "include",
      body: JSON.stringify(taskData),
    }
  );

  const data = await res.json();

  if (!res.ok) {

    throw new Error(
      data.message ||
      "Error al actualizar tarea"
    );

  }

  return data;
}

export async function deleteTask(
  id: number
) {

  const res = await fetch(
    `${API_URL}/tasks/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  return res.json();
}