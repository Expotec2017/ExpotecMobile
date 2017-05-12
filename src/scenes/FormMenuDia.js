import React, { Component } from 'react';
import {View} from 'react-native';
import ButtonDia from '../components/ButtonDia';

export default class FormMenuDia extends Component {

  render() {
    return (
      <View>
        <ButtonDia dia='DIA 09/08'/>
        <ButtonDia dia='DIA 10/08'/>
        <ButtonDia dia='DIA 11/08'/>          
      </View>
    );
  }  
}
