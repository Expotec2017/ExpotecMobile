import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ButtonDia from '../components/ButtonDia';

export default class FormMenuDia extends Component {

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.cabecalho}>
        </View>
        
        <View style={styles.detalhes}>
          <Text style={styles.item}>Escolha a data:</Text>
          <View style={styles.item}>
            <ButtonDia dia='DIA 09/08' />  
          </View>
          <View style={styles.item}>
            <ButtonDia dia='DIA 10/08' />  
          </View>      
          <View style={styles.item}>
            <ButtonDia dia='DIA 11/08' />  
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
