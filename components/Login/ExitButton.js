import React from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import { Button } from "react-native-paper";

const ExitButton = () => (
  <View>
    <Button
      icon="exit-run"
      mode="contained"
      style={styles.button}
      onPress={() => BackHandler.exitApp()}
    >
      Salir
    </Button>
  </View>
);
export default ExitButton;

const styles = StyleSheet.create({
  button: {
    marginTop: "5%",
    marginBottom: "5%",
  },
});
