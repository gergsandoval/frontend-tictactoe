import * as React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
const GameOverPopUp = ({visible, navigation, gameInfo, data}) => {

  const _showModal = () => visible = true;
  const _hideModal = () => {
    visible = false
    navigation.navigate("Lobby", { gameInfo: gameInfo});
  };

  
    return (
      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={_hideModal}>
            <Text>{data}</Text>
          </Modal>
        </Portal>
      </Provider>
    );
}
export default GameOverPopUp;