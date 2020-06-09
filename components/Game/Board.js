import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Square from "./Square";
import SocketContext from '../../socket-context';
const Board = ({playtoken}) => {
  const socket = React.useContext(SocketContext);
  const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
  const [nextToMove, setNextToMove] = useState("X");
  const [ playToken, setPlayToken ] = useState(playtoken);

  useEffect(() => {
    
    socket.on("boardUpdate", roomData => {
      
      const squares = [...boardSquares];
      
      for (let index = 0; index < roomData.boardState.length; index++) {
        squares[index] = roomData.boardState[index];
      }

      setBoardSquares(squares);
      
      setNextToMove(roomData.nextToMove);
    });

    socket.on("matchEnded",(winner)=>{
      console.log("finish");
    });
  });

  const handleClick = index => {
    if(nextToMove === playToken){
      let moveData = {
        socketId: socket.id,
        square: index
      }
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
