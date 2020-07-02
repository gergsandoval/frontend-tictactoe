import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Square from "./Square";
import GameOverPopUp from "./GameOverPopUp";
import SocketContext from "../../socket-context";
import { herokuSocketRoute } from "../../socketRoute";
import { getGoogleId, getToken } from "../Storage";

const Board = ({ token, navigation }) => {
  const socket = React.useContext(SocketContext);
  const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
  const [nextToMove, setNextToMove] = useState("X");
  const [moves, setMoves] = useState(0);
  const [winner, setWinner] = useState(null);
  const [playToken, setPlayToken] = useState(token);

  const boardUpdate = roomData => {
    setBoardSquares(roomData.boardState);
    setNextToMove(roomData.nextToMove);
    setMoves(roomData.moves);
  };

  const matchEnded = async winner => {
    setWinner(winner);
    const method = !winner ? "Ties" : winner === playToken ? "Wins" : "Losses";
    await updateRanking(method);
  };

  useEffect(() => {
    socket.on("boardUpdate", roomData => boardUpdate(roomData));
    socket.on("matchEnded", winner => matchEnded(winner));

    return () => {
      socket.off("boardUpdate");
      socket.off("matchEnded");
    };
  }, []);

  const updateRanking = async method => {
    const googleId = await getGoogleId();
    const token = await getToken();
    fetch(`${herokuSocketRoute}api/users/${googleId}/update${method}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => data);
  };

  const handleClick = index => {
    if (!boardSquares[index] && nextToMove === playToken && !winner) {
      setNextToMove(nextToMove === "X" ? "O" : "X");
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
        disabled={moves === 9 || winner != null}
        value={boardSquares[index]}
        onPress={() => handleClick(index)}
      />
    );
  };

  const navigateToLobby = () => {
    navigation.navigate("Lobby");
  };

  const renderModal = () => {
    return (
      <GameOverPopUp
        visible={moves === 9 || winner != null}
        navigateToLobby={() => navigateToLobby()}
      ></GameOverPopUp>
    );
  };

  const updateNextToMoveText = winner =>
    winner
      ? `Gano ${winner}`
      : moves === 9 && !winner
      ? "Empate"
      : `El proximo que mueve es ${nextToMove}`;

  const updateMatchState = winner =>
    moves === 9 || winner ? `Partida Finalizada` : `Partida en Curso`;

  return (
    <View style={styles.container}>
      <View style={styles.topBottomContainer}>
        <Text>Tu eres {playToken}</Text>
        <Text>{updateNextToMoveText(winner)}</Text>
        <Text>{updateMatchState(winner)}</Text>
      </View>
      <View style={styles.modal}>{renderModal()}</View>

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
  modal: {
    height: 1,
    width: 1,
  },
});
