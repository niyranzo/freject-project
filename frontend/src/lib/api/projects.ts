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

export async function updateProject(
  id: number,
  projectData: {
    name?: string;
    price?: number;
    status?: string;
  }
) {

  const res = await fetch(
    `${API_URL}/projects/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      credentials:
        "include",
      body: JSON.stringify(
        projectData
      ),
    }
  );

  // 👇 ESTO ES LA CLAVE

  const text =
    await res.text();

  console.log(text);

  // 👇 evita petar si viene HTML

  let data;

  try {

    data =
      JSON.parse(text);

  } catch {

    throw new Error(
      "La API no devolvió JSON"
    );
  }

  if (!res.ok) {

    throw new Error(
      data.message ||
      "Error al actualizar proyecto"
    );

  }

  return data;
} 
// 🗑 DELETE PROJECT

export async function deleteProject(
  id: number
) {

  const res = await fetch(
    `${API_URL}/projects/${id}`,
    {
      method: "DELETE",
      credentials:
        "include",
    }
  );

  if (!res.ok) {

    const data =
      await res.json();

    throw new Error(
      data.message ||
      "Error al borrar proyecto"
    );

  }

  return true;
}