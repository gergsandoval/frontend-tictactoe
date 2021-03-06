import * as AppAuth from "expo-app-auth";
import AsyncStorage from "@react-native-community/async-storage";

const config = {
  issuer: "https://accounts.google.com",
  scopes: ["openid", "profile"],
  clientId:
    "725377835616-jpcm8ei8a2q936jqk3980qk01el82gcu.apps.googleusercontent.com",
};

const GoogleToken = "GoogleToken";

export async function signInAsync() {
  let authState = null;
  try {
    authState = await AppAuth.authAsync(config);
    await cacheAuthAsync(authState);
  } catch (err) {
    console.log(err.message);
  }
  return authState;
}

export async function getCachedAuthAsync() {
  let value = await AsyncStorage.getItem(GoogleToken);
  let authState = JSON.parse(value);
  if (authState) {
    if (checkIfTokenExpired(authState)) {
      return refreshAuthAsync(authState);
    } else {
      return authState;
    }
  }
  return null;
}

const cacheAuthAsync = async authState =>
  await AsyncStorage.setItem(GoogleToken, JSON.stringify(authState));

const checkIfTokenExpired = ({ accessTokenExpirationDate }) =>
  new Date(accessTokenExpirationDate) < new Date();

const refreshAuthAsync = async ({ refreshToken }) => {
  const authState = await AppAuth.refreshAsync(config, refreshToken);
  if (authState.refreshToken === null) {
    authState.refreshToken = refreshToken;
  }
  await cacheAuthAsync(authState);
  return authState;
};

export async function getGoogleInfo(accessToken) {
  const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  return data;
}

export async function signOutAsync() {
  const { accessToken } = await AsyncStorage.getItem(GoogleToken);
  try {
    await AppAuth.revokeAsync(config, {
      token: accessToken,
      isClientIdProvided: true,
    });
    await AsyncStorage.removeItem(GoogleToken);
    return null;
  } catch (e) {
    alert(`Failed to revoke token: ${e.message}`);
  }
}
