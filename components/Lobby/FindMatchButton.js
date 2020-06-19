import React, { useState } from "react";
import { TouchableHighlight } from "react-native";
import { Button } from "react-native-paper";
import SocketContext from "../../socket-context";
import { herokuSocketRoute } from "../../socketRoute";

const FindMatchButton = ({ navigation, gameInfo }) => {
  const [searching, setSearching] = useState(false);

  const socket = React.useContext(SocketContext);

  const findMatch = () => {
    if(searching){
      setSearching(false);
      socket.emit("newQueueUser");
    }else{
      setSearching(true);
      socket.emit("findMatch", {
        googleId: gameInfo.googleId,
        name: gameInfo.name,
      });
      socket.emit("newQueueUser");
      socket.on("matchFound", playToken => {
        setSearching(false);
        navigation.navigate("Game", {
          playToken: playToken,
          gameInfo: gameInfo,
        });
      });
    }
  };

  return (
    <TouchableHighlight onPress={() => findMatch()}>
      <Button
        icon="gamepad-variant"
        mode="contained"
        onPress={() => findMatch()}
      >
        {searching ? "Cancelar Busqueda" : "Buscar Partida"}
      </Button>
    </TouchableHighlight>
  );
};
export default FindMatchButton;
