import React, { Component } from 'react';
import {Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { modificaData } from '../actions/LeituraActions';

export class ButtonDia extends Component {

	clickBotao(){
		this.props.modificaData(this.props.dia);
		Actions.FormMenuTrilha();
	}

  render() {
    return (
      <Button title={this.props.dia} onPress={() => this.clickBotao()}/>
    );
  }  
}

const mapStateToProps = state =>(
  {
    data : state.LeituraReducer.data
  }
); 

export default connect(mapStateToProps, { modificaData })(ButtonDia);

