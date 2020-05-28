import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GameComponent = (props) => (
  <View style={styles.container}>
    <Text>GameComponent</Text>
  </View>
);
export default GameComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
