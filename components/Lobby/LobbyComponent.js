import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import FirstRank from "./firstRank";
import FindMatchButton from "./FindMatchButton";
import Players from "./Players";

const LobbyComponent = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <FirstRank navigation={navigation} />
      </View>
      <View style={styles.players}>
        <Players navigation={navigation} />
      </View>
      <View style={styles.button}>
        <FindMatchButton
          gameInfo={route.params.gameInfo}
          navigation={navigation}
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
    flex: 0.25,
  },
  button: {
    flex: 0.1,
  },
  players: {
    flex: 0.7,
  },
});
