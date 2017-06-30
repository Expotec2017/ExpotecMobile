import React, { Component } from 'react';
import {Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { modificaTrilhaID, modificaTrilhaNome } from '../actions/LeituraActions';


export class ButtonTrilha extends Component {
	
	clickBotao(){
		this.props.modificaTrilhaID(this.props.id);
		this.props.modificaTrilhaNome(this.props.nome);
		Actions.FormMenuCheckIn();
	}

  render() {
    return (
      <Button title={this.props.nome} onPress={() => this.clickBotao()}/>
    );
  }  
}

const mapStateToProps = state =>(
  {
    trilha_id: state.LeituraReducer.trilha_id,
    trilha_nome: state.LeituraReducer.trilha_nome
  }
); 

export default connect(mapStateToProps, { modificaTrilhaID, modificaTrilhaNome})(ButtonTrilha);
