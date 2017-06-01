import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ButtonEvento from '../components/ButtonEvento';
import ImagemLogo from '../components/ImagemLogo';

export default class FormMenuEvento extends Component {

  render() {
    return (

      <View style={styles.container}> 

        <View style={styles.cabecalho}>
          <ImagemLogo />
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
  container: {
    flex:10
  },

  cabecalho:{
    flex: 5, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'
  },

  item:{
		padding: 25
  },

  detalhes:{    
    flex: 5
  }  

});
