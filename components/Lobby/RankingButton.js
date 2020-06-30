import React from "react";
import { TouchableHighlight, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const RankingButton = ({ navigation, gameInfo }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate("Ranking", { gameInfo: gameInfo })}
  >
    <Button
      icon="trophy"
      mode="contained"
      style={{ alignItems: "center" }}
      onPress={() => navigation.navigate("Ranking", { gameInfo: gameInfo })}
      contentStyle={styles.button}
      labelStyle={styles.text}
    >
      Ranking
    </Button>
  </TouchableHighlight>
);
export default RankingButton;

const styles = StyleSheet.create({
  button: {
    height: "100%",
  },
  text: {
    fontSize: 18,
  },
});
