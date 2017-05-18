import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ButtonTrilha from '../components/ButtonTrilha';

export default class FormMenuTrilha extends Component {

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.cabecalho}>
        </View>
        
        <View style={styles.detalhes}>
          <Text style={styles.item}>Escolha um curso/palestra da trilha:</Text>
          <View style={styles.item}>
            <ButtonTrilha nome='PALESTRA 01' />  
          </View>
          <View style={styles.item}>
            <ButtonTrilha nome='MINI CURSO 01' />  
          </View>      
          <View style={styles.item}>
            <ButtonTrilha nome='MINI CURSO 02' />  
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
		padding: 5
  },

  cabecalho:{    
    flex: 5
  },

  detalhes:{    
    flex: 5
  }  

});
