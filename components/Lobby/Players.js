import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { List } from 'react-native-paper';

const data =
    [
        { key: 'Chrissy' },
        { key: 'Devin' },
        { key: 'Dan' },
        { key: 'Dominic' },
        { key: 'Jackson' },
        { key: 'James' },
        { key: 'Joel' },
        { key: 'John' },
        { key: 'Jillian' },
        { key: 'Jimmy' },
        { key: 'Julie' },
        { key: 'Jordan' },
    ]

const Players = () => {
    return <ScrollView>
        {data.map(name => <List.Item key={name.key} title={name.key} />)}
    </ScrollView>
}

export default Players;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    online: {
        width: "50%",
    },
    queue: {
        width: "50%",
    },
    item: {
        padding: 10,
        fontSize: 15,
        height: 40,
    },
})
