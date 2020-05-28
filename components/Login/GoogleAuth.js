import { AsyncStorage } from "react-native";
import * as AppAuth from "expo-app-auth";

const config = {
  issuer: "https://accounts.google.com",
  scopes: ["openid", "profile"],
  clientId:
    "725377835616-jpcm8ei8a2q936jqk3980qk01el82gcu.apps.googleusercontent.com",
};

const StorageKey = "@MyApp:CustomGoogleOAuthKey";

export async function signInAsync(navigation) {
  let authState = await AppAuth.authAsync(config);
  await cacheAuthAsync(authState);
  console.log("signInAsync", authState);
  navigation.navigate("Lobby");
  return authState;
}

export async function getCachedAuthAsync() {
  let value = await AsyncStorage.getItem(StorageKey);
  let authState = JSON.parse(value);
  console.log("getCachedAuthAsync", authState);
  if (authState) {
    if (checkIfTokenExpired(authState)) {
      return refreshAuthAsync(authState);
    } else {
      return authState;
    }
  }
  return null;
}

export default { signInAsync, getCachedAuthAsync };

const cacheAuthAsync = async (authState) =>
  await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));

const checkIfTokenExpired = ({ accessTokenExpirationDate }) =>
  new Date(accessTokenExpirationDate) < new Date();

const refreshAuthAsync = async ({ refreshToken }) => {
  let authState = await AppAuth.refreshAsync(config, refreshToken);
  console.log("refreshAuth", authState);
  await cacheAuthAsync(authState);
  return authState;
};

// export async function signOutAsync({ accessToken }) {
//   try {
//     await AppAuth.revokeAsync(config, {
//       token: accessToken,
//       isClientIdProvided: true,
//     });
//     await AsyncStorage.removeItem(StorageKey);
//     return null;
//   } catch (e) {
//     alert(`Failed to revoke token: ${e.message}`);
//   }
// }
