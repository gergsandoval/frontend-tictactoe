import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SocketContext from "./socket-context";
import TicTacToeApp from "./components/TicTacToeApp";
import io from "socket.io-client";
import { herokuSocketRoute } from "./socketRoute";


const socketRoute = herokuSocketRoute;

const socket = io(socketRoute);

export default class App extends React.Component {
  constructor() {
    super();
  }

  render = () => {
    return (
      <SocketContext.Provider value={socket}>
        <TicTacToeApp />
      </SocketContext.Provider>
    );
  };
}
