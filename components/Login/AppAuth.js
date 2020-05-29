import { AsyncStorage } from "react-native";
import * as AppAuth from "expo-app-auth";

const config = {
  issuer: "https://accounts.google.com",
  scopes: ["openid", "profile"],
  clientId:
    "725377835616-jpcm8ei8a2q936jqk3980qk01el82gcu.apps.googleusercontent.com",
};

const GoogleToken = "GoogleToken";

export async function signInAsync(navigation, setAuthState) {
  const authState = await AppAuth.authAsync(config);
  await cacheAuthAsync(authState);
  const userInfo = await getUserInfo(authState);
  setAuthState(authState);
  navigation.navigate("Lobby", { title: `Bienvenido ${userInfo.name}`, userInfo: userInfo,});
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
  let authState = await AppAuth.refreshAsync(config, refreshToken);
  await cacheAuthAsync(authState);
  return authState;
};

// prettier-ignore
export async function getUserInfo({accessToken}) {
  const userInfo = await fetch('https://www.googleapis.com/userinfo/v2/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then((response) => response.json())
    .then((data) => data);
    return userInfo;
}
