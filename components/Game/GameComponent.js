import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import io from "socket.io-client";
import Board from "./Board";
const socketRoute = "https://stormy-mesa-81778.herokuapp.com/";
const socket = io(socketRoute);

const GameComponent = () => {
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
