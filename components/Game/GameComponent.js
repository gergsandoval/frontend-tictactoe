import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Board from "./Board";


const GameComponent = (socket) => {
  return (
    <View style={styles.container}>
      <Board />
    </View>
  );
};

export default GameComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
