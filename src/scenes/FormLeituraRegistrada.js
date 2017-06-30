import React, { Component } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { modificaTrilhaNome, modificaEventoNome, modificaQRCode, modificaData } from '../actions/LeituraActions';

export class FormLeituraRegistrada extends Component {

  clickBotao(){
    this.props.modificaQRCode('');
    Actions.pop();
  }  

  render() {
    return (
      <View>        
        <Text>Leitura Registrada: {this.props.qrCode} </Text>
        <Text>Evento: {this.props.evento_nome}</Text>
        <Text>Data: {this.props.data}</Text>
        <Text>Trilha: {this.props.trilha_nome}</Text>

        <View>
          <Button title='OK' onPress={() => Actions.clickBotao()}/>    
        </View>          
      </View>         
    );
  }  
}

const mapStateToProps = state =>(
  {
    evento_nome: state.LeituraReducer.evento_nome,
    trilha_nome: state.LeituraReducer.trilha_nome,        
    qrCode: state.LeituraReducer.qrCode,
    data: state.LeituraReducer.data
  }
); 

export default connect(mapStateToProps, { modificaTrilhaNome, modificaEventoNome, modificaQRCode, modificaData})(FormLeituraRegistrada);
