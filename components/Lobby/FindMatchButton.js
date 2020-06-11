import React, { useState } from "react";
import { Button } from "react-native-paper";
import SocketContext from "../../socket-context";
import { herokuSocketRoute } from "../../socketRoute";

const FindMatchButton = ({ navigation, gameInfo }) => {
  const [searching, setSearching] = useState(false);

  const socket = React.useContext(SocketContext);

  const findMatch = () => {
    socket.emit("findMatch");
    socket.on("matchFound", playToken => {
      navigation.navigate("Game", {
        playToken: playToken,
      });
    });
  };

  const insertQueueUser = (gameInfo, socket) => {
    fetch(`${herokuSocketRoute}queueUsers/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        googleId: gameInfo.googleId,
        name: gameInfo.name,
        socket: socket.id,
      }),
    });
  };

  const isUserInQueue = (gameInfo, socket) => {
    fetch(`${herokuSocketRoute}queueUsers/${gameInfo.googleId}`)
      .then(response => response.json())
      .then(data => {
        if (data.message === "cannot find queue user") {
          insertQueueUser(gameInfo, socket);
        }
      });
  };

  const deleteQueueUser = ({ googleId }) => {
    fetch(`${herokuSocketRoute}queueUsers/${googleId}`, { method: "DELETE" });
    // .then(response => response.json())
    // .then(data => data);
  };

  return (
    <Button
      icon="gamepad-variant"
      mode="contained"
      onPress={() => findMatch()}
      // onPress={
      //   searching
      //     ? () => {
      //         deleteQueueUser(gameInfo);
      //         setSearching(!searching);
      //         cancelMatch();
      //       }
      //     : () => {
      //         isUserInQueue(gameInfo, socket);
      //         setSearching(!searching);
      //         findMatch();
      //       }
      // }
    >
      {searching ? "Cancelar Busqueda" : "Buscar Partida"}
    </Button>
  );
};
export default FindMatchButton;
