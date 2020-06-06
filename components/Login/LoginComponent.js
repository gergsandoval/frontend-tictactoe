import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginButton from "./LoginButton";
import ExitButton from "./ExitButton";
import { signInAsync, getCachedAuthAsync, getUserInfo } from "./AppAuth";
import Constants from "expo-constants";
import { herokuSocketRoute } from "../../socketRoute";

const LoginComponent = ({ navigation }) => {
  let [authState, setAuthState] = useState(null);
  let [gameInfo, setGameInfo] = useState(null);

  useEffect(() => {
    googleCacheConnect();
  }, []);

  const googleCacheConnect = async () => {
    let cachedAuth = await getCachedAuthAsync();
    if (cachedAuth && !authState) {
      setAuthState(cachedAuth);
      userExistsInTicTacToeApp(cachedAuth);
      navigateToLobby();
    }
  };

  const googleConnect = async () => {
    if (Constants.deviceName != "Chrome") {
      const authState = await signInAsync();
      setAuthState(authState);
      userExistsInTicTacToeApp(authState);
    }
    navigateToLobby();
  };

  const navigateToLobby = () => {
    navigation.navigate("Lobby", gameInfo);
  };

  const userExistsInTicTacToeApp = async authState => {
    const userInfo = await getUserInfo(authState);
    console.log("userExistsInTicTacToeApp", userInfo);
    getGameInfo(userInfo);
  };

  const getGameInfo = userInfo => {
    fetch(`${herokuSocketRoute}users/${userInfo.id}`)
      .then(response => response.json())
      .then(data => {
        if (data === "El usuario no existe") {
          console.log("no existe? ", data);
          createUserInTicTacToeApp(userInfo);
        } else {
          setGameInfo(data);
        }
      })
      .catch(error => console.error(error));
  };

  const createUserInTicTacToeApp = ({ id, name }) => {
    fetch(`${herokuSocketRoute}users/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        googleId: id,
        name: name,
        createdDate: new Date(),
      }),
    })
      .then(response => response.json())
      .then(data => {
        setGameInfo(data);
      });
  };

  return (
    <View style={styles.ButtonContainer}>
      <LoginButton signIn={() => googleConnect()} />
      <ExitButton />
    </View>
  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  ButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
