import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SocketContext from './socket-context';
import TicTacToeApp from "./components/TicTacToeApp";
import io from "socket.io-client";

//const socketRoute = "https://stormy-mesa-81778.herokuapp.com/";
const socketRoute = "http://localhost:3000/";
const socket = io(socketRoute);

export default class App extends React.Component {
  constructor() {
    super();
  }

  render = () => {
    return(
      <SocketContext.Provider value={socket}>
        <TicTacToeApp />
      </SocketContext.Provider>
      )
  };
}
