import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import Ranking from "../../ranking";
import { DataTable } from "react-native-paper";

const RankingComponent = () => (
  <ScrollView>
    <DataTable style={styles.tableContainer}>
      <DataTable.Header>
        <DataTable.Title style={styles.number} numeric>
          Nº
        </DataTable.Title>
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
      {Ranking.map(({ ranking, name, win, draw, lose }) => (
        <DataTable.Row
          key={ranking}
          style={
            ranking === 1
              ? styles.gold
              : ranking === 2
              ? styles.silver
              : ranking === 3
              ? styles.bronze
              : null
          }
        >
          <DataTable.Cell style={styles.number} numeric>
            {ranking}
          </DataTable.Cell>
          <DataTable.Cell style={styles.name}>{name}</DataTable.Cell>
          <DataTable.Cell style={styles.number} numeric>
            {win}
          </DataTable.Cell>
          <DataTable.Cell style={styles.number} numeric>
            {draw}
          </DataTable.Cell>
          <DataTable.Cell style={styles.lastNumber} numeric>
            {lose}
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  </ScrollView>
);

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  name: {
    flex: 3,
  },
  number: {
    flex: 0.4,
    paddingRight: "3%",
  },
  lastNumber: {
    flex: 0.4,
  },
  gold: {
    backgroundColor: "gold",
  },
  silver: {
    backgroundColor: "lightgray",
  },
  bronze: {
    backgroundColor: "#CD7F32",
  },
});

export default RankingComponent;
