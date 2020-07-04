import { getToken } from "./Storage";
import { herokuSocketRoute } from "../socketRoute";

export async function getQueueUsers() {
  const token = await getToken();
  const response = await fetch(`${herokuSocketRoute}api/queueUsers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
