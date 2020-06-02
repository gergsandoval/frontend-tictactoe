import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const Square = ({ value, onPress }) => {
  return (
    <Button
      mode="outlined"
      contentStyle={styles.buttonSize}
      labelStyle={styles.buttonText}
      style={styles.button}
      color="black"
      onPress={onPress}
    >
      {value}
    </Button>
  );
};

export default Square;

const styles = StyleSheet.create({
  buttonSize: { height: 85, width: 85 },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
  },
  button: {
    borderColor: "black",
    backgroundColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
  },
});
