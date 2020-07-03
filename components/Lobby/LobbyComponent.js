import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import FirstRank from "./firstRank";
import FindMatchButton from "./FindMatchButton";
import Players from "./Players";
import { useFocusEffect } from "@react-navigation/native";
import RankingButton from "./RankingButton";
import SocketContext from "../../socket-context";
import { getGoogleId, getToken, getName } from "../Storage";
import { herokuSocketRoute } from "../../socketRoute";

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

    return () => {
      socket.off("updateOnlineUsers");
      socket.off("updateQueueUsers");
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getOnlineUsers();
      getQueueUsers();
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

  useEffect(() => {
    socket.on("disconnect", reason => {
      setSearching(false);
      setReconnecting(true);
      socket.on("reconnect", async attemptNumber => {
        //Aca hay que desactivar el modal
        const googleId = await getGoogleId();
        const name = await getName();
        const token = await getToken();
        await getOnlineInfo(googleId, name, token);
        await refreshSocketId(googleId, socket.id, token);
        getOnlineUsers();
        getQueueUsers();
        setReconnecting(false);
      });
    });

    return () => {
      socket.off("disconnect");
      socket.off("reconnect");
    };
  }, []);

  const getOnlineUsers = async () => {
    const token = await getToken();
    const response = await fetch(`${herokuSocketRoute}api/onlineUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setOnlineUsers(data);
  };

  const getQueueUsers = async () => {
    const token = await getToken();
    const response = await fetch(`${herokuSocketRoute}api/queueUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setQueueUsers(data);
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
      }),
    });
  };

  async function refreshSocketId(googleId, socketId, token) {
    await fetch(
      `${herokuSocketRoute}api/onlineUsers/${googleId}/refreshSocketId`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          socketId: socketId,
        }),
      }
    );
  }

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
