import { herokuSocketRoute } from "../socketRoute";
//will return true if the backend is on.
export async function getHerokuStatus() {
  const response = await fetch(herokuSocketRoute);
  return response.status === 200;
}
