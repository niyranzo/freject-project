const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function getRequests() {

  const res = await fetch(`${API_URL}/requests`, {
    credentials: "include",
  });

  return res.json();
}

export async function getRequestsByProject(projectId: number) {

  const res = await fetch(`${API_URL}/requests/project/${projectId}`, {
    credentials: "include",
  });

  return res.json();
}

export async function getRequestById(
  id: number
) {

  const res = await fetch(
    `${API_URL}/requests/${id}`,
    {
      credentials: "include",
    }
  );

  return res.json();
}

export async function createRequest(
  requestData: any
) {

  const res = await fetch(`${API_URL}/requests`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify(
      requestData
    ),
  });

  return res.json();
}

export async function updateRequest(
  id: number,
  requestData: any
) {

  const res = await fetch(
    `${API_URL}/requests/${id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(
        requestData
      ),
    }
  );

  return res.json();
}

export async function deleteRequest(
  id: number
) {

  const res = await fetch(
    `${API_URL}/requests/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  return res.json();
}