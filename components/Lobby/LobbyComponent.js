import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import FirstRank from "./firstRank";

const LobbyComponent = ({ navigation }) => {
  return (
    <View>
      <FirstRank navigation={navigation} />
      <Button
        style={{ marginTop: "3%" }}
        mode="contained"
        onPress={() => navigation.navigate("Game")}
      >
        Tablero
      </Button>
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
