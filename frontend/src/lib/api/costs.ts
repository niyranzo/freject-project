const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function getCosts() {

  const res = await fetch(`${API_URL}/costs`, {
    credentials: "include",
  });

  return res.json();
}

export async function getCostsByProject(projectId: number) {
  
  const res = await fetch(`${API_URL}/costs/project/${projectId}`, {
    credentials: "include",
  });

  return res.json();
}

export async function getCostById(
  id: number
) {

  const res = await fetch(
    `${API_URL}/${id}`,
    {
      credentials: "include",
    }
  );

  return res.json();
}

export async function createCost(
  costData: any
) {

  const res = await fetch(`${API_URL}/costs`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify(costData),
  });

  return res.json();
}

export async function updateCost(
  id: number,
  costData: any
) {

  const res = await fetch(
    `${API_URL}/costs/${id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(costData),
    }
  );

  return res.json();
}

export async function deleteCost(
  id: number
) {

  const res = await fetch(
    `${API_URL}/costs/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  return res.json();
}