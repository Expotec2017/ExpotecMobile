import React, { Component } from 'react';
import {Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class ButtonEvento extends Component {

  render() {
    return (
      <Button title={this.props.nome} onPress={() => Actions.FormMenuDia()}/>
    );
  }  
}
