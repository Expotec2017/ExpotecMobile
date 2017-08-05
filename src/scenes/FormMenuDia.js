import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ButtonDia from '../components/ButtonDia';
import ImagemLogo from '../components/ImagemLogo';

export default class FormMenuDia extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (      
      <View style={styles.container}> 

        <View style={styles.cabecalho}>
          <ImagemLogo />
        </View>    

        <View style={styles.detalhes}>
          <Text style={styles.item}>Escolha a data:</Text>    
          <View style={styles.item}>
            <ButtonDia key={1} dia={'09/08/2017'} />
          </View>          
          <View style={styles.item}>
            <ButtonDia key={2} dia={'10/08/2017'} />
          </View>          
          <View style={styles.item}>
            <ButtonDia key={3} dia={'11/08/2017'} />
          </View>          
          <View style={styles.item}>
            <ButtonDia key={4} dia={'12/08/2017'} />
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
