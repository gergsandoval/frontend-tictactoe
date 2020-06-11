import React, { useState } from "react";
import { Button } from "react-native-paper";
import SocketContext from "../../socket-context";
import herokuSocketRoute from "../../socketRoute";

const FindMatchButton = ({ navigation, gameInfo }) => {
  const [searching, setSearching] = useState(false);

  const socket = React.useContext(SocketContext);

  const buscarPartida = () => {
    socket.emit("findMatch");
    socket.on("matchFound", playToken => {
      navigation.navigate("Game", {
        playToken: playToken,
      });
    });
  };

  const insertQueueUser = (gameInfo, socket) => {
    fetch(`${herokuSocketRoute}users/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        googleId: gameInfo.googleId,
        name: gameInfo.name,
        socket: socket,
      }),
    });
  };

  const isUserInQueue = (gameInfo, socket) => {
    fetch(`${herokuSocketRoute}queueUsers/${gameInfo.googleId}`)
      .then(response => response.json())
      .then(data => {
        if (data.message === "cannot find queue user") {
          insertQueueUser();
        }
      })
      .then(() => {
        buscarPartida(gameInfo, socket);
      });
  };

  return (
    <Button
      icon="gamepad-variant"
      mode="contained"
      onPress={() => {
        setSearching(!searching);
        isUserInQueue(gameInfo, socket);
      }}
    >
      {searching ? "Cancelar Busqueda" : "Buscar Partida"}
    </Button>
  );
};
export default FindMatchButton;
