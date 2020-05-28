import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RankingComponent = (props) => (
  <View style={styles.container}>
    <Text>RankingComponent</Text>
  </View>
);
export default RankingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
