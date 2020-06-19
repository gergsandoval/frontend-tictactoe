import * as React from "react";
import { StyleSheet, FlatList } from "react-native";
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
      <FlatList
        data={rankingInfo}
        renderItem={({ item }) => (
          <DataTable.Row>
            <DataTable.Cell style={styles.name}>{item.name}</DataTable.Cell>
            <DataTable.Cell style={styles.number} numeric>
              {item.wins}
            </DataTable.Cell>
            <DataTable.Cell style={styles.number} numeric>
              {item.ties}
            </DataTable.Cell>
            <DataTable.Cell style={styles.number} numeric>
              {item.losses}
            </DataTable.Cell>
          </DataTable.Row>
        )}
        keyExtractor={item => item._id}
      />
    </DataTable>
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
});

export default RankingComponent;
