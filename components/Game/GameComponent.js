import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Board from "./Board";



const GameComponent = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <Board playtoken={route.params.playToken} navigation={navigation}/>
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
