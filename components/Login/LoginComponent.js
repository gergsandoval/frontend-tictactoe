import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginButton from "./LoginButton";
import ExitButton from "./ExitButton";
import { signInAsync, getCachedAuthAsync, getGoogleInfo } from "./AppAuth";
import Constants from "expo-constants";
import { herokuSocketRoute } from "../../socketRoute";
import SocketContext from "../../socket-context";

const LoginComponent = ({ navigation }) => {
  const socket = React.useContext(SocketContext);
  const [gettingInfo, setGettingInfo] = useState(false);

  useEffect(() => {
    const googleCacheConnect = async () => {
      setGettingInfo(true);
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth) {
        const googleInfo = await getGoogleInfo(cachedAuth);
        console.log("googleInfo: ", googleInfo);
        const gameInfo = await getGameInfo(googleInfo);
        console.log("gameInfo: ", gameInfo);
        const onlineInfo = await getOnlineInfo(gameInfo);
        console.log("onlineInfo: ", onlineInfo);
        navigateToLobby(gameInfo);
      }
      setGettingInfo(false);
    };
    googleCacheConnect();
  }, []);

  const googleConnect = async () => {
    setGettingInfo(true);
    if (Constants.deviceName != "Chrome") {
      const authState = await signInAsync();
      const googleInfo = await getGoogleInfo(authState);
      console.log("googleInfo: ", googleInfo);
      const gameInfo = await getGameInfo(googleInfo);
      console.log("gameInfo: ", gameInfo);
      const onlineInfo = await getOnlineInfo(gameInfo);
      console.log("onlineInfo: ", onlineInfo);
      navigateToLobby(gameInfo);
    } else {
      navigateToLobby({});
    }
    setGettingInfo(false);
  };

  const navigateToLobby = data => {
    navigation.navigate("Lobby", { gameInfo: data });
  };

  const getGameInfo = ({ id, name }) => {
    return fetch(`${herokuSocketRoute}users/`, {
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
      .then(data => data);
  };

  const getOnlineInfo = ({ googleId, name }) => {
    return fetch(`${herokuSocketRoute}onlineUsers/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        googleId: googleId,
        name: name,
        socketId: socket.id,
      }),
    })
      .then(response => response.json())
      .then(data => data);
  };

  return (
    <View style={styles.ButtonContainer}>
      <LoginButton disabled={gettingInfo} signIn={() => googleConnect()} />
      <ExitButton disabled={gettingInfo} />
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
