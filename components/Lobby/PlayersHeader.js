import * as React from 'react';
import { Title } from 'react-native-paper';

const PlayersHeader = ({ name, quantity }) => (
    <Title>{`${name} (${quantity})`}</Title>
);

export default PlayersHeader;