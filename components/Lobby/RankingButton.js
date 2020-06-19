import React from "react";
import { TouchableHighlight } from "react-native";
import { Button } from "react-native-paper";

const RankingButton = ({ navigation }) => (
  <TouchableHighlight onPress={() => navigation.navigate("Ranking")}>
    <Button
      icon="trophy"
      mode="contained"
      style={{ alignItems: "center" }}
      onPress={() => navigation.navigate("Ranking")}
    >
      Ranking
    </Button>
  </TouchableHighlight>
);
export default RankingButton;
