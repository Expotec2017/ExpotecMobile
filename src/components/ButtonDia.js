import React, { Component } from 'react';
import {Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class ButtonDia extends Component {

  render() {
    return (
      <Button title={this.props.dia} onPress={() => Actions.FormMenuTrilha()}/>
    );
  }  
}
