import React from "react";
import { Button } from "react-native-paper"

const FindMatchButton = ({ buscarPartida }) => (
    <Button
        icon="gamepad-variant"
        mode="contained"
        onPress={() => buscarPartida()}
    >
        buscar partida
    </Button>
)
export default FindMatchButton;
