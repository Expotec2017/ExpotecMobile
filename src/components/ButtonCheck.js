import React, { Component } from 'react';
import {Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {connect} from 'react-redux';
import { modificaTipo } from '../actions/LeituraActions';

export class ButtonCheck extends Component {

  abrirCamera(tipo){
    this.props.modificaTipo(tipo);
    Actions.FormQRCodeReader(); 
    this.props.tipo = 'OUT'; 
  }
  
  render() {
    if(this.props.tipo == 'IN'){
      return (
        <Button title='CHECK-IN' color='green' onPress={() => this.abrirCamera('IN')}/>     
      );
    }

    return (
      <Button title='CHECK-OUT' color='red' onPress={() => this.abrirCamera('OUT')}/>     
    );
  }  
}

const mapStateToProps = state =>(
  {
    tipo  : state.LeituraReducer.tipo
  }
); 

export default connect(mapStateToProps, {modificaTipo})(ButtonCheck);
