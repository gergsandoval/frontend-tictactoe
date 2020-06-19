import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { List } from "react-native-paper";
import { herokuSocketRoute } from "../../socketRoute";
import SocketContext from "../../socket-context";

const Players = ({ navigation }) => {
  const socket = React.useContext(SocketContext);

  let [onlineUsers, setOnlineUsers] = useState([]);
  let [queueUsers, setQueueUsers] = useState([]);

  useEffect(() => {
    getOnlineUsers();
    getQueueUsers();

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

  const getOnlineUsers = () => {
    fetch(`${herokuSocketRoute}onlineUsers`)
      .then(response => response.json())
      .then(data => {
        setOnlineUsers(data);
      });
  };

  const getQueueUsers = () => {
    fetch(`${herokuSocketRoute}queueUsers`)
      .then(response => response.json())
      .then(data => {
        setQueueUsers(data);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.online}>
        <List.Section
          titleStyle={styles.title}
          title={`Conectados (${onlineUsers.length})`}
        ></List.Section>
        <FlatList
          data={onlineUsers}
          renderItem={({ item }) => <List.Item title={item.name} />}
          keyExtractor={item => item._id}
        />
      </View>
      <View style={styles.queue}>
        <List.Section
          titleStyle={styles.title}
          title={`En Cola (${queueUsers.length})`}
        ></List.Section>
        <FlatList
          data={queueUsers}
          renderItem={({ item }) => <List.Item title={item.name} />}
          keyExtractor={item => item._id}
        />
      </View>
    </View>
  );
};

export default Players;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
  },
  online: {
    width: "50%",
    height: "100%",
    borderRightWidth: 2,
  },
  queue: {
    width: "50%",
    height: "100%",
  },
  item: {
    padding: 10,
    fontSize: 15,
    height: 40,
  },
  title: {
    fontWeight: "700",
    color: "black",
  },
});
