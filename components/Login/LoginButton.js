import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const LoginButton = props => (
  <View>
    <Button
      icon="login"
      mode="contained"
      style={styles.button}
      onPress={props.signIn}
      disabled={props.disabled}
    >
      Conectar con Google
    </Button>
  </View>
);
export default LoginButton;

const styles = StyleSheet.create({
  button: {
    marginTop: "5%",
  },
});
