import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginButton from "./LoginButton";
import ExitButton from "./ExitButton";
import { signInAsync, getCachedAuthAsync, getGoogleInfo } from "./AppAuth";
import Constants from "expo-constants";
import { herokuSocketRoute } from "../../socketRoute";
import SocketContext from "../../socket-context";
import HerokuDown from "./HerokuDown";
import Loading from "./Loading";

const LoginComponent = ({ navigation }) => {
  const socket = React.useContext(SocketContext);
  const [gettingInfo, setGettingInfo] = useState(false);
  const [herokuUp, setHerokuUp] = useState(true);

  useEffect(() => {
    googleCacheConnect();
  }, []);

  const googleCacheConnect = async () => {
    setGettingInfo(true);
    const statusHeroku = await isHerokuUp();
    setHerokuUp(statusHeroku);
    let cachedAuth = await getCachedAuthAsync();
    if (statusHeroku && cachedAuth) {
      await getInfoAndNavigateToLobby(cachedAuth);
    }
    setGettingInfo(false);
  };

  const isHerokuUp = () => {
    return fetch(herokuSocketRoute).then(response => response.status === 200);
  };

  const googleConnect = async () => {
    setGettingInfo(true);
    const statusHeroku = await isHerokuUp();
    setHerokuUp(statusHeroku);
    if (statusHeroku) {
      if (Constants.deviceName != "Chrome") {
        const authState = await signInAsync();
        await getInfoAndNavigateToLobby(authState);
      } else {
        navigateToLobby({
          googleId: "1234",
          name: "userWeb",
          createdDate: new Date(),
        });
      }
    }
    setGettingInfo(false);
  };

  const getInfoAndNavigateToLobby = async authState => {
    try {
      const googleInfo = await getGoogleInfo(authState);
      console.log("googleInfo: ", googleInfo);
      const gameInfo = await getGameInfo(googleInfo);
      console.log("gameInfo: ", gameInfo);
      const onlineInfo = await getOnlineInfo(gameInfo);
      console.log("onlineInfo: ", onlineInfo);
      socket.emit("newUserOnline");
      navigateToLobby(gameInfo);
    } catch (err) {
      console.log(err.message);
    }
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

  const renderModal = () => (
    <HerokuDown
      herokuUp={herokuUp}
      googleCacheConnect={() => googleCacheConnect()}
    />
  );

  const renderSpinner = () => <Loading gettingInfo={gettingInfo} />;

  return (
    <View style={styles.ButtonContainer}>
      <View style={styles.modal}>{renderModal()}</View>
      <View>{renderSpinner()}</View>
      <LoginButton
        disabled={gettingInfo || herokuUp === false}
        signIn={() => googleConnect()}
      />
      <ExitButton disabled={gettingInfo || herokuUp === false} />
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
  modal: {
    height: 1,
    width: 1,
  },
});
