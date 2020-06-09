import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import FirstRank from "./firstRank";
import SocketContext from "../../socket-context";
import FindMatchButton from "./findMatchButton"
import Players from "./Players"

const LobbyComponent = ({ navigation, route }) => {
  console.log("gameInfo llego al Lobby?", route.params.gameInfo);
  const socket = React.useContext(SocketContext);
  const buscarPartida = () => {
    console.log("busca partida");
    socket.emit("findMatch");
    socket.on("matchFound", () => {
      console.log("encontro partida");
      navigation.navigate("Game");
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <FirstRank navigation={navigation} />
      </View>
      <View style={styles.players}>
        <Players />
      </View>
      <View style={styles.button}>
        <FindMatchButton buscarPartida={buscarPartida} />
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
    flex: 0.25,
  },
  button: {
    flex: 0.1,
  },
  players: {
    flex: 0.7,
  }

});
