import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const Square = ({ value, onPress, disabled }) => {
  return (
    <Button
      mode="outlined"
      contentStyle={styles.buttonSize}
      labelStyle={styles.buttonText}
      style={
        disabled
          ? [styles.button, styles.buttonDisabled]
          : [styles.button, styles.buttonEnabled]
      }
      color="black"
      onPress={onPress}
      disabled={disabled}
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
    fontWeight: "900",
  },
  button: {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
  },
  buttonDisabled: {
    backgroundColor: "#DCDCDC",
  },
  buttonEnabled: {
    backgroundColor: "white",
  },
});
