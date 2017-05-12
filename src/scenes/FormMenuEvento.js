import React, { Component } from 'react';
import {View} from 'react-native';
import ButtonEvento from '../components/ButtonEvento';

export default class FormMenuEvento extends Component {

  render() {
    return (
      <View>
        <ButtonEvento nome='TADS TECH'/>  
        <ButtonEvento nome='EXPOTEC'/> 
      </View>
    );
  }  
}
