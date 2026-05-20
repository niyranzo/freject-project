const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export async function createTask(taskData: any) {

  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify(taskData),
  });

  return res.json();
}

export async function updateTask(id: number,taskData: any) {

  const res = await fetch(
    `${API_URL}/tasks/${id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(taskData),
    }
  );

  return res.json();
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