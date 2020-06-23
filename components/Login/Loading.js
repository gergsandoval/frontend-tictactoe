import React from "react";
import { ActivityIndicator, View } from "react-native";

const Loading = ({ gettingInfo }) => {
  return (
    <View>
      <ActivityIndicator animating={gettingInfo} size="large" color="blue" />
    </View>
  );
};

export default Loading;
