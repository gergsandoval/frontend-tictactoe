import React, { useState } from "react";
import { TouchableHighlight, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import SocketContext from "../../socket-context";

const FindMatchButton = ({ navigation, gameInfo }) => {
  const [searching, setSearching] = useState(false);

  const socket = React.useContext(SocketContext);

  const findMatch = () => {
    if (searching) {
      setSearching(false);
      socket.emit("cancelSearch");
    } else {
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
        contentStyle={styles.button}
        labelStyle={styles.text}
      >
        {searching ? "Cancelar Busqueda" : "Buscar Partida"}
      </Button>
    </TouchableHighlight>
  );
};
export default FindMatchButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 18,
  },
});
