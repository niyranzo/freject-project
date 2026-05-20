const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 📦 GET PROJECTS
export async function getProjects() {

  const res = await fetch(
    `${API_URL}/projects`,
    {
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!res.ok) {

    throw new Error(
      data.message || "Error al obtener proyectos"
    );

  }

  return data;
}

// 📦 GET PROJECTS BY ID
export async function getProjectById(id: number) {

  const res = await fetch(
    `${API_URL}/projects/${id}`,
    {
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!res.ok) {

    throw new Error(
      data.message || "Error al obtener proyectos"
    );

  }

  return data;
}

// ➕ CREATE PROJECT
export async function createProject(
  projectData: {
    name: string;
    price: number;
    id_client: number;
  }
) {

  const res = await fetch(
    `${API_URL}/projects`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(projectData),
    }
  );

  const data = await res.json();

  if (!res.ok) {

    throw new Error(
      data.message || "Error al crear proyecto"
    );

  }

  return data;
}