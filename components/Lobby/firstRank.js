import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { DataTable } from "react-native-paper";

const FirstRank = navigation => {
  const firstRankInfo = [
    {
      id: 1,
      name: "JYISYCWeUqe2nzBkO6KG",
      win: 9999,
      draw: 9999,
      loss: 9999,
    },
  ];
  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require("../../assets/goldCrown.bmp")}
      />
      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title style={styles.name}>Nombre</DataTable.Title>
          <DataTable.Title style={styles.number} numeric>
            G
          </DataTable.Title>
          <DataTable.Title style={styles.number} numeric>
            E
          </DataTable.Title>
          <DataTable.Title style={styles.number} numeric>
            P
          </DataTable.Title>
        </DataTable.Header>
        {firstRankInfo.map(info => (
          <DataTable.Row key={info.id}>
            <DataTable.Cell style={styles.name}>{info.name}</DataTable.Cell>
            <DataTable.Cell style={styles.number} numeric>
              {info.win}
            </DataTable.Cell>
            <DataTable.Cell style={styles.number} numeric>
              {info.draw}
            </DataTable.Cell>
            <DataTable.Cell style={styles.number} numeric>
              {info.loss}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};
export default FirstRank;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
  },
  table: {
    width: "90%",
  },
  name: {
    flex: 3,
  },
  number: {
    flex: 0.7,
  },
  icon: {
    width: "10%",
    alignSelf: "center",
    justifyContent: "center",
  },
});
