import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginButton from "./LoginButton";
import ExitButton from "./ExitButton";
import { signInAsync, getCachedAuthAsync, getGoogleInfo } from "./AppAuth";
import { setGoogleId, setToken } from "../Storage";
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
    isHerokuUp();
    let cachedAuth = await getCachedAuthAsync();
    if (herokuUp && cachedAuth) {
      await getInfoAndNavigateToLobby(cachedAuth);
    }
    setGettingInfo(false);
  };

  const isHerokuUp = async () => {
    const response = await fetch(herokuSocketRoute);
    setHerokuUp(response.status === 200);
  };

  const googleConnect = async () => {
    setGettingInfo(true);
    isHerokuUp();
    if (herokuUp) {
      const authState = await signInAsync();
      await getInfoAndNavigateToLobby(authState);
    }
    setGettingInfo(false);
  };

  const getInfoAndNavigateToLobby = async authState => {
    try {
      const { accessToken } = authState;
      const { id, name, picture } = await getGoogleInfo(accessToken);
      await getGameInfo(id, name);
      await refreshToken(id, accessToken);
      await getOnlineInfo(id, name, accessToken);
      await refreshSocketId(id, accessToken);
      socket.emit("newUserOnline");
      navigateToLobby();
    } catch (err) {
      console.log(err.message);
    }
  };

  async function refreshSocketId(googleId, accessToken) {
    await fetch(
      `${herokuSocketRoute}api/onlineUsers/${googleId}/refreshSocketId`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          socketId: socket.id,
        }),
      }
    );
  }

  async function refreshToken(googleId, accessToken) {
    const response = await fetch(
      `${herokuSocketRoute}api/users/${googleId}/refreshToken`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: accessToken,
        }),
      }
    );
    const data = await response.json();
    setGoogleId(data.googleId);
    setToken(data.token);
  }

  const navigateToLobby = () => {
    navigation.navigate("Lobby");
  };

  const getGameInfo = async (googleId, name) => {
    await fetch(`${herokuSocketRoute}api/users`, {
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
  };

  const getOnlineInfo = async (googleId, name, token) => {
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
        socketId: socket.id,
      }),
    });
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
