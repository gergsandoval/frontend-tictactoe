import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Square from "./Square";
import SocketContext from "../../socket-context";
import { herokuSocketRoute } from "../../socketRoute";

const Board = ({ playtoken, navigation, gameInfo }) => {
  const socket = React.useContext(SocketContext);
  const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
  const [nextToMove, setNextToMove] = useState("X");
  const [playToken, setPlayToken] = useState(playtoken);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socket.on("boardUpdate", roomData => {
      console.log("se actualizo el tablero");
      setBoardSquares(roomData.boardState);
      setNextToMove(roomData.nextToMove);
    });

    socket.on("matchEnded", async winner => {
      console.log(`gano ${winner}`);
      setWinner(winner);
      const method = !winner
        ? "Ties"
        : winner === playToken
        ? "Wins"
        : "Losses";
      const updateInfo = await updateRanking(gameInfo, method);
      console.log("updateInfo: ", updateInfo);
    });
  }, []);

  const updateRanking = (gameInfo, method) => {
    return fetch(
      `${herokuSocketRoute}users/update${method}/${gameInfo.googleId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameInfo),
      }
    )
      .then(response => response.json())
      .then(data => data);
  };

  const handleClick = index => {
    const squares = [...boardSquares];
    if (squares[index]) return;
    if (nextToMove === playToken && !winner) {
      let moveData = {
        socketId: socket.id,
        square: index,
      };
      socket.emit("move", moveData);
    }
  };

  const renderSquare = index => {
    return (
      <Square
        disabled={winner != null}
        value={boardSquares[index]}
        onPress={() => handleClick(index)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBottomContainer}>
        <Text>Tu eres {playToken}</Text>
        <Text>
          {winner ? `Gano ${winner}` : `El proximo que mueve es ${nextToMove}`}
        </Text>
        <Text>{winner ? "Partida finalizada" : "Partida en curso"}</Text>
      </View>
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
