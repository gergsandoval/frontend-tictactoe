import * as React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import { herokuSocketRoute } from "../../socketRoute";

const RankingComponent = () => {
  let [rankingInfo, setRankingInfo] = React.useState([]);
  React.useEffect(() => getRanking(), []);

  const getRanking = () => {
    fetch(`${herokuSocketRoute}${"ranking"}`)
      .then(response => response.json())
      .then(data => {
        setRankingInfo(data);
      });
  };
  return (
    <ScrollView>
      <DataTable style={styles.tableContainer}>
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
        {rankingInfo.map(({ _id, name, wins, ties, losses }) => (
          <DataTable.Row key={_id}>
            <DataTable.Cell style={styles.name}>{name}</DataTable.Cell>
            <DataTable.Cell style={styles.number} numeric>
              {wins}
            </DataTable.Cell>
            <DataTable.Cell style={styles.number} numeric>
              {ties}
            </DataTable.Cell>
            <DataTable.Cell style={styles.lastNumber} numeric>
              {losses}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};
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
