import * as React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

export default class GameOverPopUp extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        visible: props.visible,
    };
  }

    _showModal = () => this.setState({ visible: true });
    _hideModal = () => {
      this.setState({ visible: false })
      this.props.navigation.navigate("Lobby", { gameInfo: this.props.gameInfo});
    };

  render() {
    const { visible } = this.state;
    return (
      <Provider>
         <Portal>
           <Modal visible={visible} onDismiss={this._hideModal}>
             <Text>{this.props.data}</Text>
           </Modal>
        </Portal>
      </Provider>
    );
  }
}