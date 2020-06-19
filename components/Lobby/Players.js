import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { List } from "react-native-paper";
import { herokuSocketRoute } from "../../socketRoute";
import SocketContext from "../../socket-context";

const Players = ({ navigation }) => {
  const socket = React.useContext(SocketContext);

  let [onlineUsers, setOnlineUsers] = useState([]);
  let [queueUsers, setQueueUsers] = useState([]);

  useEffect(() => {
    socket.on("updateOnlineUsers", () => {
      getOnlineUsers();
    });

    socket.on("updateQueueUsers", () => {
      getQueueUsers();
    });

    return () => {
      socket.off("updateOnlineUsers");
      socket.off("updateQueueUsers");
    };
  }, []);

  const getOnlineUsers = () => {
    fetch(`${herokuSocketRoute}${"onlineUsers"}`)
      .then(response => response.json())
      .then(data => {
        setOnlineUsers(data);
      });
  };

  const getQueueUsers = () => {
    fetch(`${herokuSocketRoute}${"queueUsers"}`)
      .then(response => response.json())
      .then(data => {
        setQueueUsers(data);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.online}>
        <ScrollView style={styles.separator}>
          <List.Section
            titleStyle={styles.title}
            title={`Conectados (${onlineUsers.length})`}
          >
            {onlineUsers.map(({ _id, name }) => (
              <List.Item key={_id} title={name} />
            ))}
          </List.Section>
        </ScrollView>
      </View>
      <View style={styles.queue}>
        <ScrollView style={styles.separator}>
          <List.Section
            titleStyle={styles.title}
            title={`En Cola (${queueUsers.length})`}
          >
            {queueUsers.map(({ _id, name }) => (
              <List.Item key={_id} title={name} />
            ))}
          </List.Section>
        </ScrollView>
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
  separator: {
    borderRightWidth: 2,
  },
  title: {
    fontWeight: "700",
    color: "black",
  },
});
