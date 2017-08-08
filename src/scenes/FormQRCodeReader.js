import React, { Component } from 'react';
import { View } from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {modificaQRCode} from '../actions/LeituraActions';
let SQLite = require('react-native-sqlite-storage');

export class FormQRCodeReader extends Component {

  errorCB(err) {
    console.log("SQL Error: " + err);
  }

  openCB() {
    console.log("Database OPENED");
  }

  inserirBD(){
    //Abre conexão com banco de dados
    let db = SQLite.openDatabase({name: 'expotec.db', location: 'Library'}, this.openCB, this.errorCB);
    
    //Insere leituras pendentes para sincronização  
    db.transaction((tx) => {
      let vSQL = 'CREATE TABLE IF NOT EXISTS readers(QrCode VARCHAR(10), DateTime TIMESTAMP, Type INTEGER, Event_ID INTEGER, Trilha_ID INTEGER, Reader_State CHAR(1), PRIMARY KEY(QrCode, Type, Event_ID, Trilha_ID))'; 
      tx.executeSql(vSQL, [], (tx, results) => {
          console.log("Criado tabela");
        });

      vSQL = 'INSERT INTO readers(QrCode, DateTime, Type, Event_ID, Trilha_ID, Reader_State) VALUES(?, CURRENT_TIMESTAMP, ?, ?, ?, ?)'; 
      tx.executeSql(vSQL, [this.props.qrCode, this.props.tipo == 'IN' ? 1 : 2, this.props.evento_id, this.props.trilha_id, 'P'], (tx, results) => {
          console.log("Inserção realizada.");
        });     
    });        
    
  }

  barcodeReceived(e) {
    let inscricao = e.data;

    if(e.data != ''){
      this.props.modificaQRCode(inscricao);
      this.inserirBD();
      Actions.FormLeituraRegistrada();
    }
  }

  render() {
    return (
      <BarcodeScanner onBarCodeRead={this.barcodeReceived.bind(this)} style={{ flex: 1 }} torchMode='off' cameraType='back'/>               
    );
  }  
}

const mapStateToProps = state =>(
  {
    qrCode: state.LeituraReducer.qrCode,
    tipo  : state.LeituraReducer.tipo,
    evento_id : state.LeituraReducer.evento_id,
    trilha_id : state.LeituraReducer.trilha_id
  }
); 

export default connect(mapStateToProps, {modificaQRCode})(FormQRCodeReader);
