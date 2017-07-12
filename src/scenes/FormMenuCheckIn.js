import React, { Component } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
let SQLite = require('react-native-sqlite-storage');

import ImagemLogo from '../components/ImagemLogo';

export default class FormMenuCheckIn extends Component {

  constructor(props) {
    super(props);
    this.state = {status: ''};    
  }

  sincronizarDados(){

    //Abre conexão com banco de dados
    let db = SQLite.openDatabase({name: 'expotec.db', location: 'Library'}, this.openCB, this.errorCB);

    //Seleciona os registros de leituras pendentes para sincronização  
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM readers WHERE Reader_State = ?', ['P'], (tx, results) => {
      
          this.setState({status: 'Resultados pendentes: ' + results.rows.length});    
          alert("Query completed. Resultados: " + results.rows.length);

          //passa por todos os registros  
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);            
            this.setState({status: 'Resultado atual: ' + (i + 1) + ' de ' + len});    

            //Envia os registros para o servidor via API
            axios.post('http://www.zandonainfo.com.br/receive.php', {qrCode: row.QrCode, dateTime: row.DateTime, type: row.Type, event_id: row.Event_ID, event_day: row.Event_Day, trilha_id: row.Trilha_ID})
              .then(function (response) {

                //se conseguiu inserir o post, atualiza para enviado
                db.transaction((tx) => {
                  let vSQL = 'UPDATE readers SET Reader_State = ? WHERE QrCode = ? AND Event_ID = ? AND Trilha_ID = ? '; 
                  tx.executeSql(vSQL, ['E', row.QrCode, row.Event_ID, row.Trilha_ID], (tx, results) => {
                      console.log("Atualização realizada.");
                    });
                });  

              })
              .catch(function (error) {
                alert('erro');
                console.log(error);
              });                    
          }

        });
    });  

  }

  errorCB(err) {
    console.log("SQL Error: " + err);
  }

  openCB() {
    console.log("Database OPENED");
  }  

  render() {
    return (
      <View style={styles1.container}>

        <View style={styles.cabecalho}>
          <ImagemLogo />
        </View>    
        
        <View style={styles1.detalhes}>
          <Text style={styles1.item}>Escolha o tipo de leitura:</Text>
          <View style={styles1.item}>
            <Button title='CHECK-IN' color='green' onPress={() => Actions.FormQRCodeReader()}/>  
          </View>
          <View style={styles1.item}>
            <Button title='CHECK-OUT' color='red' onPress={() => Actions.FormQRCodeReader()}/>    
          </View>
          <View style={styles1.item}>
            <Button title='SINCRONIZAR DADOS' onPress={() => this.sincronizarDados()}/>    
          </View>          
          <Text>Status: {this.state.status}</Text>
        </View>

      </View>         
    );
  }  
}

styles1 = StyleSheet.create({

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
