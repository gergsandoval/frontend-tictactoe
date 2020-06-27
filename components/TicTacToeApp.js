import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginComponent from "./Login/LoginComponent";
import LobbyComponent from "./Lobby/LobbyComponent";
import GameComponent from "./Game/GameComponent";
import RankingComponent from "./Ranking/RankingComponent";

const Stack = createStackNavigator();

const TicTacToeApp = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginComponent}></Stack.Screen>
      <Stack.Screen
        name="Lobby"
        component={LobbyComponent}
        options={{ headerLeft: null }}
      ></Stack.Screen>
      <Stack.Screen
        name="Game"
        component={GameComponent}
        options={{ headerLeft: null }}
      ></Stack.Screen>
      <Stack.Screen name="Ranking" component={RankingComponent}></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);

export default TicTacToeApp;
