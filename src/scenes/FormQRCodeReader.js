import React, { Component } from 'react';
import { View, Button } from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { modificaQRCode } from '../actions/LeituraActions';
let SQLite = require('react-native-sqlite-storage');

export class FormQRCodeReader extends Component {

  constructor(props) {
    super(props);
    this.state = {torchMode: 'off', cameraType: 'back'};    
  }

  inserirBD(qrcode){
    //Abre conexão com banco de dados
    let db = SQLite.openDatabase({name: 'expotec.db', location: 'Library'}, this.openCB, this.errorCB);
    
    //Insere leituras pendentes para sincronização  
    db.transaction((tx) => {
      let vSQL = 'INSERT INTO readers(QrCode, DateTime, Type, Event_ID, Event_Day, Trilha_ID, Reader_State) VALUES(?, CURRENT_TIMESTAMP, ?, ?, ?, ?, ?)'; 
      tx.executeSql(vSQL, [qrcode, 'IN', 1, 9, 1, 'P'], (tx, results) => {
          console.log("Inserção realizada.");
        });
    });        
  }

  barcodeReceived(e) {
    this.props.modificaQRCode(e.data);
    inserirBD(e.data);
    Actions.FormLeituraRegistrada();
  }

  errorCB(err) {
    console.log("SQL Error: " + err);
  }

  openCB() {
    console.log("Database OPENED");
  }

  render() {
    return (
      <BarcodeScanner onBarCodeRead={this.barcodeReceived} 
                        style={{ flex: 1 }} 
                        torchMode={this.state.torchMode} 
                        cameraType={this.state.cameraType}/>               
      
    );
  }  
}

const mapStateToProps = state =>(
  {
    qrCode: state.LeituraReducer.qrCode
  }
); 

export default connect(mapStateToProps, { modificaQRCode})(FormQRCodeReader);
