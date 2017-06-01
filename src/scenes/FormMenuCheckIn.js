import React, { Component } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ImagemLogo from '../components/ImagemLogo';

export default class FormMenuCheckIn extends Component {

  render() {
    return (
      <View style={styles1.container}>

        <View style={styles.cabecalho}>
          <ImagemLogo />
        </View>    
        
        <View style={styles1.detalhes}>
          <Text style={styles1.item}>Escolha o tipo de leitura:</Text>
          <View style={styles1.item}>
            <Button title='CHECK-IN' onPress={() => Actions.FormQRCodeReader()}/>  
          </View>
          <View style={styles1.item}>
            <Button title='CHECK-OUT' onPress={() => Actions.FormQRCodeReader()}/>    
          </View>
        </View>

      </View>         
    );
  }  
}

styles1 = StyleSheet.create({

  container:{
    flex: 10
  },

  cabecalho:{
    flex: 5, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'
  },  

  detalhes:{    
    flex: 5
  },

  item:{
    padding: 10
  },
});
