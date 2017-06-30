import React, { Component } from 'react';
import {Button, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { modificaEventoID, modificaEventoNome } from '../actions/LeituraActions';

export class ButtonEvento extends Component {

	clickBotao(){
		this.props.modificaEventoID(this.props.id);
		this.props.modificaEventoNome(this.props.nome);
		Actions.FormMenuDia();
	}
  
  render() {
    return (
      <Button style={{fontSize: 16}} title={this.props.nome} onPress={() => clickBotao()}/>
    );
  }  
}

const mapStateToProps = state =>(
  {
    evento_id: state.LeituraReducer.evento_id,
    evento_nome: state.LeituraReducer.evento_nome
  }
); 

export default connect(mapStateToProps, { modificaEventoID, modificaEventoNome})(ButtonEvento);
