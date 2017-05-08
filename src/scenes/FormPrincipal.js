import React, { Component } from 'react';
import {View, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class FormPrincipal extends Component {
  render() {
    return (
      <View>
          <Button title='Ler QRCode' onPress={() => Actions.FormQRCodeReader()}/>
          <Button title='Sair' onPress={() => Actions.pop()}/>
      </View>
    );
  }
}
