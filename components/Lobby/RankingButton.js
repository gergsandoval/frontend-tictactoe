import React from "react";
import { TouchableHighlight, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const RankingButton = ({ navigation, reconnecting }) => (
  <TouchableHighlight onPress={() => navigation.navigate("Ranking")}>
    <Button
      icon="trophy"
      mode="contained"
      style={{ alignItems: "center" }}
      onPress={() => navigation.navigate("Ranking")}
      contentStyle={styles.button}
      labelStyle={styles.text}
      disabled={reconnecting}
      loading={reconnecting}
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
