import React from "react";
import { View, StyleSheet } from "react-native";
import FirstRank from "./firstRank";

const LobbyComponent = ({ navigation }) => {
  return (
    <View>
      <FirstRank navigation={navigation} />
    </View>
  );
};

export default LobbyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
