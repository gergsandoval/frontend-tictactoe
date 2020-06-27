import React from "react";
import { Modal, StyleSheet, Text, View, BackHandler } from "react-native";
import { Button } from "react-native-paper";

const HerokuDown = ({ herokuUp, googleCacheConnect, gettingInfo }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={!herokuUp}
        onRequestClose={() => BackHandler.exitApp()}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {`El mejor juego anticuarentena no esta disponible.\n Regresa mas tarde`}
            </Text>
            <Button
              icon={gettingInfo ? "refresh" : null}
              mode="contained"
              disabled={gettingInfo}
              onPress={() => googleCacheConnect()}
              labelStyle={styles.text}
            >
              {gettingInfo
                ? "Conectando con el servidor"
                : "Volver a conectar con el servidor"}
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HerokuDown;

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
  text: {
    fontSize: 12,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
