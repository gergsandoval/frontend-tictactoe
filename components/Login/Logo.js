import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Logo = ({ herokuStatus }) => {
  if (herokuStatus) {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("../../assets/icon.png")} />
      </View>
    );
  }
  return null;
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    paddingTop: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "center",
  },
});
