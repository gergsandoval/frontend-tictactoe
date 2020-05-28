import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LoginComponent = () => (
  <View style={styles.container}>
    <Text>LoginComponent</Text>
  </View>
);
export default LoginComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
