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