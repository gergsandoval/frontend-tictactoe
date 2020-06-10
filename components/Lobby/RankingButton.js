import React from "react";
import { Button } from "react-native-paper"

const RankingButton = ({ navigation }) => (
    <Button
        icon="trophy"
        mode="contained"
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("Ranking")}
    >Ranking
    </Button>
)
export default RankingButton;

