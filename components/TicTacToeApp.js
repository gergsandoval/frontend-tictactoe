import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from "expo-constants";

const Stack = createStackNavigator();

const TicTacToeApp = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="Lobby" component={Lobby}></Stack.Screen>
      <Stack.Screen name="Game" component={Game}></Stack.Screen>
      <Stack.Screen name="Ranking" component={Ranking}></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);

export default TicTacToeApp;
