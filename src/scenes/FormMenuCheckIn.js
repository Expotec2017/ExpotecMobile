import React, { Component } from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {connect} from 'react-redux';
import { modificaTipo } from '../actions/LeituraActions';

import ImagemLogo from '../components/ImagemLogo';
import ButtonSincronizar from '../components/ButtonSincronizar';

export class FormMenuCheckIn extends Component {

  abrirCamera(tipo){
    this.props.modificaTipo(tipo);
    Actions.FormQRCodeReader(); 
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.cabecalho}>
          <ImagemLogo />
        </View>    
        
        <View style={styles.detalhes}>
          <Text style={styles.item}>Escolha o tipo de leitura:</Text>
          <View style={styles.item}>
            <Button title='CHECK-IN' color='green' onPress={() => this.abrirCamera('IN')}/>               
          </View>
          <View style={styles.item}>
            <Button title='CHECK-OUT' color='red' onPress={() => this.abrirCamera('OUT')}/>     
          </View> 
          <View style={styles.item}>
            <Button title='LEITURA MANUAL' onPress={() => Actions.FormLeituraManual()}/>    
          </View> 
          <View style={styles.item}>
            <ButtonSincronizar />    
          </View>         
        </View>

      </View>         
    );
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

    detalhes:{    
      flex: 5
    },

    item:{
      padding: 5
    },
  });

}

const mapStateToProps = state =>(
  {
    tipo  : state.LeituraReducer.tipo
  }
); 

export default connect(mapStateToProps, {modificaTipo})(FormMenuCheckIn);
