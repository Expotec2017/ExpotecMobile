import React, { Component } from 'react';
import { View, Button } from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';
let SQLite = require('react-native-sqlite-storage');

export default class FormQRCodeReader extends Component {

  constructor(props) {
    super(props);
    this.state = {torchMode: 'off', cameraType: 'back'};    
  }

  inserirBD(qrcode){
    let db = SQLite.openDatabase({name: 'expotec.db', location: 'Library'}, this.openCB, this.errorCB);
    db.transaction((tx) => {
      var vSQL = 'INSERT INTO readers(QrCode, DateTime, Type, Event_ID, Event_Day, Trilha_ID, Reader_State) VALUES(?, CURRENT_TIMESTAMP, ?, ?, ?, ?, ?)'; 
      tx.executeSql(vSQL, [qrcode, 'IN', 1, 9, 1, 'P'], (tx, results) => {
          console.log("Inserção realizada");
        });
    });        
  }

  selectBD(){
    let db = SQLite.openDatabase({name: 'expotec.db', location: 'Library'}, this.openCB, this.errorCB);

    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS readers (QrCode, DateTime, Type, Event_ID, Event_Day, Trilha_ID, Reader_State)');
      tx.executeSql('SELECT * FROM readers', [], (tx, results) => {
          console.log("Query completed. Resultados: " + results.rows.length);

          //var len = results.rows.length;
          //for (let i = 0; i < len; i++) {
          //}
        });
    });    

  }

  barcodeReceived(e) {
    alert('Barcode: ' + e.data);
    inserirBD(e.data);
    //selectBD();
  }

  errorCB(err) {
    console.log("SQL Error: " + err);
  }

  successCB() {
    console.log("SQL executed fine");
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
