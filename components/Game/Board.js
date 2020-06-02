import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Square from "./Square";

const Board = () => {
  const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const handleClick = index => {
    const squares = [...boardSquares];
    if (squares[index]) return;

    squares[index] = xIsNext ? "X" : "O";
    setBoardSquares(squares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = index => {
    return (
      <Square value={boardSquares[index]} onPress={() => handleClick(index)} />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBottomContainer}>
        <Text>{`El proximo que mueve es ${xIsNext ? "X" : "O"}`}</Text>
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
