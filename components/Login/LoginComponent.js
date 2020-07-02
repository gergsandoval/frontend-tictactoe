import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginButton from "./LoginButton";
import ExitButton from "./ExitButton";
import { signInAsync, getCachedAuthAsync, getGoogleInfo } from "./AppAuth";
import { setGoogleId, setToken } from "../Storage";
import Constants from "expo-constants";
import { herokuSocketRoute } from "../../socketRoute";
import SocketContext from "../../socket-context";
import HerokuDown from "./HerokuDown";
import Loading from "./Loading";
import Logo from "./Logo";

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
      let gameInfo = await getGameInfo(googleInfo);
      gameInfo = await registerToken(authState, gameInfo);
      const onlineInfo = await getOnlineInfo(gameInfo);
      socket.emit("newUserOnline");
      navigateToLobby();
    } catch (err) {
      console.log(err.message);
    }
  };

  async function registerToken({ accessToken }, { googleId }) {
    return fetch(`${herokuSocketRoute}api/users/${googleId}/refreshToken`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: accessToken,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setGoogleId(data.googleId);
        setToken(data.token);
        return data;
      });
  }

  const navigateToLobby = data => {
    navigation.navigate("Lobby");
  };

  const getGameInfo = ({ id, name }) => {
    return fetch(`${herokuSocketRoute}api/users`, {
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

  const getOnlineInfo = ({ googleId, name, token }) => {
    return fetch(`${herokuSocketRoute}api/onlineUsers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      gettingInfo={gettingInfo}
      googleCacheConnect={() => googleCacheConnect()}
    />
  );

  const renderSpinner = () => <Loading gettingInfo={gettingInfo} />;

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo herokuUp={herokuUp} />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.modal}>{renderModal()}</View>
        <View>{renderSpinner()}</View>
        <LoginButton
          disabled={gettingInfo || herokuUp === false}
          signIn={() => googleConnect()}
        />
        <ExitButton disabled={gettingInfo || herokuUp === false} />
      </View>
    </View>
  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  buttonContainer: {
    flex: 0.25,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logoContainer: {
    flex: 0.75,
  },
  modal: {
    height: 1,
    width: 1,
  },
});
