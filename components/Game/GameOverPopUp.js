import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import useInterval from "@use-it/interval";

const GameOverPopUp = ({ visible, navigateToLobby }) => {
  const [seconds, setSeconds] = useState(5);

  useInterval(
    () => {
      setSeconds(seconds - 1);
    },
    visible && seconds >= 0 ? 1000 : null
  );

  useEffect(() => {
    if (seconds === 0) {
      navigateToLobby();
    }
  }, [seconds]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => null}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {`La partida ha finalizado. \n Volveras automaticamente al Lobby en ${seconds}`}
            </Text>
            <Button
              icon="home"
              mode="contained"
              onPress={() => navigateToLobby()}
              labelStyle={styles.text}
            >
              Volver al Lobby
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GameOverPopUp;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textAlign: {
    fontSize: 12,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
