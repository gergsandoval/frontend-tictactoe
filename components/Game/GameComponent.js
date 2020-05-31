import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import io from "socket.io-client";
const socketRoute = "https://stormy-mesa-81778.herokuapp.com/";
const socket = io(socketRoute);



const GameComponent = () => {
  let [play, setPlay] = useState("");

  useEffect(() => {
    console.log("entro");
    
    socket.on('played', function(msg){
      console.log()
      setPlay(msg)
    });
  });
  
  const jugar = (movePlayed) => {
    console.log(socket);
    socket.emit("play", movePlayed);
  }

  return(

  <View style={styles.container}>
    <Text>GameComponent</Text>
    <Text>jugada: {play}</Text>
    <Button
      title = "jugada 1"
      onPress={() => jugar("1")}
    />
    <Button
      title = "jugada 2"
      onPress={() => jugar("2")}
    />
  </View>
  )
};



const emitMessage = () => {

};

export default GameComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
