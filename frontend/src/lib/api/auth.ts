const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 🔐 LOGIN
export async function loginUser(
  email: string,
  password: string
) {

  const res = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {

    throw new Error(
      data.message || "Error al iniciar sesión"
    );

  }

  return data;
}

// 📝 REGISTER
export async function registerUser(
  name: string,
  email: string,
  password: string
) {

  const res = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {

    throw new Error(
      data.message || "Error al registrarse"
    );

  }

  return data;
}

// 👤 GET CURRENT USER
export async function getMe() {

  const res = await fetch(
    `${API_URL}/auth/me`,
    {
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!res.ok) {

    throw new Error(
      data.message || "Error al obtener usuario"
    );

  }

  return data;
}

// 🚪 LOGOUT
export async function logoutUser() {

  const res = await fetch(
    `${API_URL}/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!res.ok) {

    throw new Error(
      data.message || "Error al cerrar sesión"
    );

  }

  return data;
}