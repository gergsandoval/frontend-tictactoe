import { setGoogleId, setName, setToken, getGoogleId } from "./Storage";
import { herokuSocketRoute } from "../socketRoute";

export async function insertUser(googleId, name) {
  const response = await fetch(`${herokuSocketRoute}api/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      googleId: googleId,
      name: name,
      createdDate: new Date(),
    }),
  });
  const data = await response.json();
  setGoogleId(data.googleId);
  setName(data.name);
}

export async function refreshUserToken(token) {
  const googleId = await getGoogleId();
  const response = await fetch(
    `${herokuSocketRoute}api/users/${googleId}/refreshToken`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    }
  );
  const data = await response.json();
  setToken(data.token);
}
