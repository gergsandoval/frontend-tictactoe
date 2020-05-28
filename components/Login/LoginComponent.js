import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginButton from "./LoginButton";
import ExitButton from "./ExitButton";

const LoginComponent = () => (
  <View style={styles.ButtonContainer}>
    <LoginButton />
    <ExitButton />
  </View>
);
export default LoginComponent;

const styles = StyleSheet.create({
  ButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
