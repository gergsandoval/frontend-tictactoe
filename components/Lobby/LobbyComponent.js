import React, { useCallback } from "react";
import { View, StyleSheet, Text, BackHandler } from "react-native";
import FirstRank from "./firstRank";
import FindMatchButton from "./FindMatchButton";
import Players from "./Players";
import { useFocusEffect } from "@react-navigation/native";
import RankingButton from "./RankingButton";

const LobbyComponent = ({ navigation, route }) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <FirstRank navigation={navigation} gameInfo={route.params.gameInfo} />
      </View>
      <View style={styles.button}>
        <RankingButton
          navigation={navigation}
          gameInfo={route.params.gameInfo}
        />
      </View>
      <View style={styles.players}>
        <Players navigation={navigation} gameInfo={route.params.gameInfo} />
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
    flex: 0.15,
  },
  button: {
    flex: 0.1,
  },
  players: {
    flex: 0.65,
  },
});
