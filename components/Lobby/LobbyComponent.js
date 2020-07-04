import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import FirstRank from "./firstRank";
import FindMatchButton from "./FindMatchButton";
import Players from "./Players";
import { useFocusEffect } from "@react-navigation/native";
import RankingButton from "./RankingButton";
import SocketContext from "../../socket-context";
import {
  insertOnlineUser,
  refreshSocketId,
  getOnlineUsers,
} from "../../Services/onlineUsers";
import { getQueueUsers } from "../../Services/queueUsers";

const LobbyComponent = ({ navigation }) => {
  const socket = React.useContext(SocketContext);

  let [onlineUsers, setOnlineUsers] = useState([]);
  let [queueUsers, setQueueUsers] = useState([]);
  let [searching, setSearching] = useState(false);
  let [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    socket.on("updateOnlineUsers", data => {
      setOnlineUsers(data);
    });
    socket.on("updateQueueUsers", data => {
      setQueueUsers(data);
    });
    socket.on("disconnect", () => {
      handleDisconnection();
    });
    socket.on("reconnect", async () => {
      await handleReconnection();
    });

    return () => {
      socket.off("updateOnlineUsers");
      socket.off("updateQueueUsers");
      socket.off("disconnect");
      socket.off("reconnect");
    };
  }, []);

  const handleDisconnection = () => {
    setSearching(false);
    setReconnecting(true);
  };

  const handleReconnection = async () => {
    socket.off("reconnect");
    await insertOnlineUser();
    await refreshSocketId(socket.id);
    socket.emit("newOnlineUser");
    setQueueUsers(await getQueueUsers());
    setReconnecting(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setOnlineUsers(await getOnlineUsers());
      setQueueUsers(await getQueueUsers());
    });
    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const findMatch = () => {
    if (searching) {
      setSearching(false);
      socket.emit("cancelSearch");
    } else {
      setSearching(true);
      socket.emit("findMatch");
      socket.emit("newQueueUser");
      socket.on("matchFound", playToken => {
        setSearching(false);
        navigation.navigate("Game", {
          playToken: playToken,
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <FirstRank navigation={navigation} />
      </View>
      <View style={styles.button}>
        <RankingButton navigation={navigation} reconnecting={reconnecting} />
      </View>
      <View style={styles.players}>
        <Players
          navigation={navigation}
          onlineUsers={onlineUsers}
          queueUsers={queueUsers}
        />
      </View>
      <View style={styles.button}>
        <FindMatchButton
          findMatch={() => findMatch()}
          searching={searching}
          reconnecting={reconnecting}
        />
      </View>
    </View>
  );
};

export default LobbyComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  table: {
    flex: 0.15,
  },
  button: {
    flex: 0.1,
  },
  players: {
    flex: 0.65,
  },
});
