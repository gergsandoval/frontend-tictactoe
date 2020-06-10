import React, { useRef, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { List } from 'react-native-paper';

const connected =
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
const queue =
    [
        { key: 'Jillian' },
        { key: 'Jimmy' },
        { key: 'Julie' },
        { key: 'Jordan' },
        { key: 'Chrissy' },
        { key: 'Devin' },
        { key: 'Dan' },
        { key: 'Dominic' },
        { key: 'Toretto' },
        { key: 'Kyle' },
        { key: 'Will' },
    ]

const Players = ({ navigation }) => {
    const onlineRef = useRef();
    const queueRef = useRef();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            onlineRef.current?.scrollTo({ y: 0, animated: true });
            queueRef.current?.scrollTo({ y: 0, animated: true });
        });
        return unsubscribe;
    }, [navigation]);



    return (
        <View style={styles.container}>
            <View style={styles.online}>
                <ScrollView ref={onlineRef} style={styles.separator}>
                    <List.Section titleStyle={styles.title} title={`Conectados (${connected.length})`}>
                        {connected.map(name => <List.Item key={name.key} title={name.key} />)}
                    </List.Section>
                </ScrollView>
            </View>
            <View style={styles.online}>
                <ScrollView ref={queueRef} >
                    <List.Section titleStyle={styles.title} title={`En Cola (${queue.length})`}>
                        {queue.map(name => <List.Item key={name.key} title={name.key} />)}
                    </List.Section>
                </ScrollView>
            </View>
        </View>
    )


}

export default Players;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        flexWrap: "wrap",
    },
    online: {
        width: "50%",
    },
    item: {
        padding: 10,
        fontSize: 15,
        height: 40,
    },
    separator: {
        borderRightWidth: 2,
    },
    title: {
        fontWeight: "700",
        color: "black",
    }
})
