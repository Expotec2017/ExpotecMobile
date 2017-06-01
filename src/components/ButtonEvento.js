import React, { Component } from 'react';
import {Button, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class ButtonEvento extends Component {

  render() {
    return (
      <Button style={{fontSize: 16}} title={this.props.nome} onPress={() => Actions.FormMenuDia()}/>
    );
  }  
}
