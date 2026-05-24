const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 📦 GET CLIENTS
export async function getClients() {

  const res = await fetch(
    `${API_URL}/clients`,
    {
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!res.ok) {

    throw new Error(
      data.message || "Error al obtener clientes"
    );

  }

  return data;
}

// 📦 GET CLIENT BY ID
export async function getClientById(
  id: number
) {

  const res = await fetch(
    `${API_URL}/clients/${id}`,
    {
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!res.ok) {

    throw new Error(
      data.message || "Error al obtener cliente"
    );

  }

  return data;
}

// 📦 GET CLIENT BY PROJECT
export async function getClientByProject(
  projectId: number
) {

  const res = await fetch(
    `${API_URL}/clients/project/${projectId}`,
    {
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!res.ok) {

    throw new Error(
      data.message ||
      "Error al obtener cliente del proyecto"
    );

  }

  return data;
}

// ➕ CREATE CLIENT
export async function createClient(
  clientData: {
    name: string;
    email: string;
    company: string;
    id_user: number;
  }
) {

  const res = await fetch(
    `${API_URL}/clients`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(clientData),
    }
  );

  const data = await res.json();

  if (!res.ok) {

    throw new Error(
      data.message || "Error al crear cliente"
    );

  }

  return data;
}

// ✏️ UPDATE CLIENT
export async function updateClient(
  id: number,
  clientData: {
    name: string;
    email: string;
    company: string;
  }
) {

  const res = await fetch(
    `${API_URL}/clients/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(clientData),
    }
  );

  const data = await res.json();

  if (!res.ok) {

    throw new Error(
      data.message || "Error al editar cliente"
    );

  }

  return data;
}

// 🗑️ DELETE CLIENT
export async function deleteClient(
  id: number
) {

  const res = await fetch(
    `${API_URL}/clients/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!res.ok) {

    throw new Error(
      data.message || "Error al borrar cliente"
    );

  }

  return data;
}