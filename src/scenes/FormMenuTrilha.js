import React, { Component } from 'react';
import {View} from 'react-native';
import ButtonTrilha from '../components/ButtonTrilha';

export default class FormMenuTrilha extends Component {

  render() {
    return (
      <View>
        <ButtonTrilha nome='PALESTRA 01' />          
        <ButtonTrilha nome='MINI CURSO 01' />          
        <ButtonTrilha nome='MINI CURSO 02' />          
      </View>
    );
  }  
}
