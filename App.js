import React from "react";
import SocketContext from "./socket-context";
import TicTacToeApp from "./components/TicTacToeApp";
import io from "socket.io-client";
import { herokuSocketRoute } from "./socketRoute";

const socket = io(herokuSocketRoute);

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
