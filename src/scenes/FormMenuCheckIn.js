import React, { Component } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {connect} from 'react-redux';


import { modificaTipo } from '../actions/LeituraActions';
let SQLite = require('react-native-sqlite-storage');

import ImagemLogo from '../components/ImagemLogo';

export class FormMenuCheckIn extends Component {

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

          //passa por todos os registros  
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);            
            this.setState({status: 'Resultado atual: ' + (i + 1) + ' de ' + len});    

            //Envia os registros para o servidor via API
            axios.defaults.headers.post['Content-Type'] = 'application/json';
            axios.post('http://187.19.101.152:8080/api/mobile/check/new/list', JSON.stringify({checks: [{Activity_id: row.Trilha_ID, Subscription_id: row.QrCode, type: row.Type, checked_at: row.DateTime}]}))
              .then(function (response) {
                console.log(response);  

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

  abrirCamera(tipo){
    this.props.modificaTipo(tipo);
    Actions.FormQRCodeReader();  
  }

  errorCB(err) {
    console.log("SQL Error: " + err);
  }

  openCB() {
    console.log("Database OPENED");
  }  

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.cabecalho}>
          <ImagemLogo />
        </View>    
        
        <View style={styles.detalhes}>
          <Text style={styles.item}>Escolha o tipo de leitura:</Text>
          <View style={styles.item}>
            <Button title='CHECK-IN' color='green' onPress={() => this.abrirCamera('IN')}/>  
          </View>
          <View style={styles.item}>
            <Button title='CHECK-OUT' color='red' onPress={() => this.abrirCamera('OUT')}/>    
          </View> 
          <View style={styles.item}>
            <Button title='LEITURA MANUAL' color='#800080' onPress={() => Actions.FormLeituraManual()}/>    
          </View> 
          <View style={styles.item}>
            <Button title='SINCRONIZAR DADOS' onPress={() => this.sincronizarDados()}/>    
          </View>         
          <Text>Status: {this.state.status}</Text>
        </View>

      </View>         
    );
  }  

  styles = StyleSheet.create({

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

}

const mapStateToProps = state =>(
  {
    tipo  : state.LeituraReducer.tipo
  }
); 

export default connect(mapStateToProps, {modificaTipo})(FormMenuCheckIn);
