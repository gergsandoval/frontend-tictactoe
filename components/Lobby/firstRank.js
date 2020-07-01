import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { DataTable, Button } from "react-native-paper";
import { herokuSocketRoute } from "../../socketRoute";
import { getToken } from "../Storage";

const FirstRank = ({ navigation }) => {
  let [firstRankInfo, setFirstRankInfo] = React.useState([]);

  useEffect(() => {
    const token = getToken();
    const unsubscribe = navigation.addListener("focus", () => {
      getRankOne(token);
    });
    return unsubscribe;
  }, [navigation]);

  const getRankOne = token => {
    fetch(`${herokuSocketRoute}api/ranking/getRankOne`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setFirstRankInfo(data);
      });
  };

  return (
    <>
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
          {firstRankInfo.map(({ _id, name, wins, ties, losses }) => (
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
      </View>
    </>
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
    flex: 0.4,
  },
  lastNumber: {
    flex: 0.4,
  },
  icon: {
    width: "10%",
    alignSelf: "center",
    justifyContent: "center",
  },
});
