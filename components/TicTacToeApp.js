import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginComponent from "./Login/LoginComponent";
import LobbyComponent from "./Lobby/LobbyComponent";
import GameComponent from "./Game/GameComponent";
import RankingComponent from "./Ranking/RankingComponent";
import Constants from "expo-constants";

const Stack = createStackNavigator();

const TicTacToeApp = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="LoginComponent">
      <Stack.Screen name="Login" component={LoginComponent}></Stack.Screen>
      <Stack.Screen
        name="Lobby"
        component={LobbyComponent}
        // options={{ headerLeft: null }}
      ></Stack.Screen>
      <Stack.Screen
        name="Game"
        component={GameComponent}
        //options={{ headerLeft: null }}
      ></Stack.Screen>
      <Stack.Screen name="Ranking" component={RankingComponent}></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);

export default TicTacToeApp;
