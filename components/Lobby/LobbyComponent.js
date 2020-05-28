import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LobbyComponent = (props) => (
  <View style={styles.container}>
    <Text>LobbyComponent</Text>
  </View>
);
export default LobbyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
