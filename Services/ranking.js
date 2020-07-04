import { herokuSocketRoute } from "../socketRoute";
import { getGoogleId, getToken } from "./Storage";

export async function updateRanking(method) {
  const googleId = await getGoogleId();
  const token = await getToken();
  fetch(`${herokuSocketRoute}api/users/${googleId}/update${method}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getRankOne() {
  const token = await getToken();
  const response = await fetch(`${herokuSocketRoute}api/ranking/getRankOne`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getRanking() {
  const token = await getToken();
  const response = await fetch(`${herokuSocketRoute}api/ranking`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
