import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ButtonDia from '../components/ButtonDia';
import ImagemLogo from '../components/ImagemLogo';

export default class FormMenuDia extends Component {

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.cabecalho}>
          <ImagemLogo />
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
