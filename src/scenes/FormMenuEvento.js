import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ButtonEvento from '../components/ButtonEvento';

export default class FormMenuEvento extends Component {

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.cabecalho}>
        </View>
        
        <View style={styles.detalhes}>
          <Text style={styles.item}>Escolha um evento:</Text>
          <View style={styles.item}>
            <ButtonEvento nome='TADS TECH'/>  
          </View>
          <View style={styles.item}>
            <ButtonEvento nome='EXPOTEC'/> 
          </View>          
        </View>

      </View>
    );
  }  
}

styles = StyleSheet.create({

  container:{
		flex: 10
  },

  item:{
		padding: 10
  },

  cabecalho:{    
    flex: 5
  },

  detalhes:{    
    flex: 5
  }  

});
