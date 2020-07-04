import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginButton from "./LoginButton";
import ExitButton from "./ExitButton";
import {
  signInAsync,
  getCachedAuthAsync,
  getGoogleInfo,
} from "../../Services/AppAuth";
import { insertOnlineUser, refreshSocketId } from "../../Services/onlineUsers";
import { insertUser, refreshUserToken } from "../../Services/users";
import { getHerokuStatus } from "../../Services/herokuStatus";
import SocketContext from "../../socket-context";
import HerokuDown from "./HerokuDown";
import Loading from "./Loading";
import Logo from "./Logo";

const LoginComponent = ({ navigation }) => {
  const socket = React.useContext(SocketContext);
  const [gettingInfo, setGettingInfo] = useState(false);
  const [herokuStatus, setHerokuStatus] = useState(true);

  useEffect(() => {
    googleCacheConnect();
  }, []);

  const googleCacheConnect = async () => {
    setGettingInfo(true);
    const status = await getHerokuStatus();
    setHerokuStatus(status);
    let cachedAuth = await getCachedAuthAsync();
    if (status && cachedAuth) {
      await getInfoAndNavigateToLobby(cachedAuth);
    }
    setGettingInfo(false);
  };

  const googleConnect = async () => {
    setGettingInfo(true);
    const status = await getHerokuStatus();
    setHerokuStatus(status);
    if (status) {
      const authState = await signInAsync();
      await getInfoAndNavigateToLobby(authState);
    }
    setGettingInfo(false);
  };

  const getInfoAndNavigateToLobby = async authState => {
    try {
      const { accessToken } = authState;
      const { id, name, picture } = await getGoogleInfo(accessToken);
      await insertUser(id, name);
      await refreshUserToken(accessToken);
      await insertOnlineUser();
      await refreshSocketId(socket.id);
      socket.emit("newOnlineUser");
      navigateToLobby();
    } catch (err) {
      console.log(err.message);
    }
  };

  const navigateToLobby = () => {
    navigation.navigate("Lobby");
  };

  const renderModal = () => (
    <HerokuDown
      herokuStatus={herokuStatus}
      gettingInfo={gettingInfo}
      googleCacheConnect={() => googleCacheConnect()}
    />
  );

  const renderSpinner = () => <Loading gettingInfo={gettingInfo} />;

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo herokuStatus={herokuStatus} />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.modal}>{renderModal()}</View>
        <View>{renderSpinner()}</View>
        <LoginButton
          disabled={gettingInfo || herokuStatus === false}
          signIn={() => googleConnect()}
        />
        <ExitButton disabled={gettingInfo || herokuStatus === false} />
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
