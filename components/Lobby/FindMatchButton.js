import React from "react";
import { TouchableHighlight, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const FindMatchButton = ({ findMatch, searching, reconnecting }) => {
  return (
    <TouchableHighlight onPress={() => findMatch()}>
      <Button
        icon="gamepad-variant"
        mode="contained"
        onPress={() => findMatch()}
        contentStyle={styles.button}
        labelStyle={styles.text}
        disabled={reconnecting}
        loading={reconnecting}
      >
        {searching ? "Cancelar Busqueda" : "Buscar Partida"}
      </Button>
    </TouchableHighlight>
  );
};
export default FindMatchButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 18,
  },
});
