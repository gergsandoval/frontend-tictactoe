import { getGoogleId, getToken, getName } from "./Storage";
import { herokuSocketRoute } from "../socketRoute";

export async function insertOnlineUser() {
  const googleId = await getGoogleId();
  const name = await getName();
  const token = await getToken();
  await fetch(`${herokuSocketRoute}api/onlineUsers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      googleId: googleId,
      name: name,
    }),
  });
}

export async function refreshSocketId(socketId) {
  const googleId = await getGoogleId();
  const token = await getToken();
  await fetch(
    `${herokuSocketRoute}api/onlineUsers/${googleId}/refreshSocketId`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        socketId: socketId,
      }),
    }
  );
}

export async function getOnlineUsers() {
  const token = await getToken();
  const response = await fetch(`${herokuSocketRoute}api/onlineUsers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
