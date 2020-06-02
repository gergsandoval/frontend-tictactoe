import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginButton from "./LoginButton";
import ExitButton from "./ExitButton";
import GameComponent from "../Game/GameComponent";
import { signInAsync, getCachedAuthAsync, getUserInfo } from "./AppAuth";

const LoginComponent = ({ navigation }) => {
  let [authState, setAuthState] = useState(null);

  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        const userInfo = await getUserInfo(cachedAuth);
        navigation.navigate("Lobby", {
          title: `Bienvenido ${userInfo.name}`,
          userInfo: userInfo,
        });
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  googleConnect = async () => {
    const authState = await signInAsync();
    const userInfo = await getUserInfo(authState);
    setAuthState(authState);
    navigation.navigate("Lobby", {
      title: `Bienvenido ${userInfo.name}`,
      userInfo: userInfo,
    });
  };

  return (
    <View style={styles.ButtonContainer}>
      <GameComponent />
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
