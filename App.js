import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TicTacToeApp from "./components/TicTacToeApp";

export default class App extends React.Component {
  constructor() {
    super();
  }

  render = () => <TicTacToeApp />;
}
