import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Square from "./Square";
import GameOverPopUp from "./GameOverPopUp";
import SocketContext from "../../socket-context";
const Board = ({ playtoken, navigation }) => {
  const socket = React.useContext(SocketContext);
  const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
  const [nextToMove, setNextToMove] = useState("X");
  const [playToken, setPlayToken] = useState(playtoken);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    socket.on("boardUpdate", roomData => {
      console.log("se actualizo el tablero");
      setBoardSquares(roomData.boardState);
      setNextToMove(roomData.nextToMove);
    });

    socket.on("matchEnded", winner => {
      console.log("finish");
      setEnd(true);
    });
  }, []);

  const handleClick = index => {
    const squares = [...boardSquares];
    if (squares[index]) return;
    if (nextToMove === playToken && !end) {
      let moveData = {
        socketId: socket.id,
        square: index,
      };
      socket.emit("move", moveData);
    }
  };

  const renderSquare = index => {
    return (
      <Square value={boardSquares[index]} onPress={() => handleClick(index)} />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBottomContainer}>
        <Text>Tu eres {playToken}</Text>
        <Text>{`El proximo que mueve es ${nextToMove}`}</Text>
        <Text>{end ? "partida finalizada" : "partida en curso"}</Text>
      </View>
      <GameOverPopUp navigation={navigation} visible={!end} data={"La partida a terminado"}></GameOverPopUp>
      <View style={styles.rowContainer}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </View>
      <View style={styles.rowContainer}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </View>
      <View style={styles.rowContainer}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </View>
      <View style={styles.topBottomContainer}></View>
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  rowContainer: {
    flexDirection: "row",
    flex: 0.5,
    borderRadius: 1,
  },
  topBottomContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
});
