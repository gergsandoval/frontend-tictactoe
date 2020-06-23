import React, { useCallback } from "react";
import { View, StyleSheet, BackHandler, ToastAndroid } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Board from "./Board";

const GameComponent = ({ route, navigation }) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        ToastAndroid.show("Espera a finalizar la partida!", ToastAndroid.SHORT);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Board
        playtoken={route.params.playToken}
        navigation={navigation}
        gameInfo={route.params.gameInfo}
      />
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
