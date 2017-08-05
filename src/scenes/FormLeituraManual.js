import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { modificaQRCode, modificaTipo } from '../actions/LeituraActions';
let SQLite = require('react-native-sqlite-storage');

export class FormLeituraManual extends Component {

  errorCB(err) {
    console.log("SQL Error: " + err);
  }

  openCB() {
    console.log("Database OPENED");
  }

  inserirBD(){
    //Abre conexão com banco de dados
    let db = SQLite.openDatabase({name: 'expotec.db', location: 'Library'}, this.openCB, this.errorCB);
    
    //Cria tabela  
    db.transaction((tx) => {
      let vSQL = 'CREATE TABLE IF NOT EXISTS readers(QrCode, DateTime, Type, Event_ID, Trilha_ID, Reader_State)'; 
      tx.executeSql(vSQL, [], (tx, results) => {
          console.log("Criado tabela");
        });
    });       
    
    
    //Insere leituras pendentes para sincronização  
    db.transaction((tx) => {
      let vSQL = 'INSERT INTO readers(QrCode, DateTime, Type, Event_ID, Trilha_ID, Reader_State) VALUES(?, CURRENT_TIMESTAMP, ?, ?, ?, ?)'; 
      tx.executeSql(vSQL, [this.props.qrCode, this.props.tipo == 'IN' ? 1 : 2, this.props.evento_id, this.props.trilha_id, 'P'], (tx, results) => {
          console.log("Inserção realizada.");
        });
    });        
  }

  clickBotao(tipo) {
  	if(this.props.qrCode != ''){
  		this.props.modificaTipo(tipo);
	    this.inserirBD();
	    Actions.FormLeituraRegistrada();
  	}else{
  		alert('Informe o nº da Inscrição.');
  	}
  }

  render() {
		return (
		  <View style={stylesManual.container}>
			  <View style={stylesManual.cabecalho}>
	        <TextInput style={stylesManual.inputLogin} keyboardType='numeric' returnKeyType='next' placeholder='Nº da Inscrição' value={this.props.qrCode} onChangeText={texto => this.props.modificaQRCode(texto)}/>
			  </View>		  	        
			  <View style={stylesManual.item}>
					<Button title='CHECK-IN' color='green' onPress={() => this.clickBotao('IN')}/>  
			  </View>
			  <View style={stylesManual.item}>
					<Button title='CHECK-OUT' color='red' onPress={() => this.clickBotao('OUT')}/>    
			  </View> 
		  </View>         
		);
  }  

}

stylesManual = StyleSheet.create({

  container:{
    flex: 1
  },

  item:{
    padding: 10
  },

  cabecalho:{
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 40
  },  

	inputLogin:{
    fontSize: 20,
    height: 45
	}    
});


const mapStateToProps = state =>(
  {
    qrCode: state.LeituraReducer.qrCode,
    tipo	: state.LeituraReducer.tipo,
    evento_id : state.LeituraReducer.evento_id,
    trilha_id : state.LeituraReducer.trilha_id
  }
); 

export default connect(mapStateToProps, { modificaQRCode, modificaTipo})(FormLeituraManual);
