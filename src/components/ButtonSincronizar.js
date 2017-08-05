import React, { Component } from 'react';
import {Button} from 'react-native';
import {connect} from 'react-redux';

import { modificaCPF, modificaToken } from '../actions/AutenticacaoActions';
let SQLite = require('react-native-sqlite-storage');

export class ButtonSincronizar extends Component {

  errorCB(err) {
    console.log("SQL Error: " + err);
  }

  openCB() {
    console.log("Database OPENED");
  }    

  sincronizarDados(){

    //Abre conexão com banco de dados
    let db = SQLite.openDatabase({name: 'expotec.db', location: 'Library'}, this.openCB, this.errorCB);

    //Seleciona os registros de leituras pendentes para sincronização  
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM readers WHERE Reader_State = ?', ['P'], (tx, results) => {
      
          //passa por todos os registros  
          let len = results.rows.length;
          let ok = 0;
          let erros = 0;

          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);            
            this.setState({status: 'Resultado atual: ' + (i + 1) + ' de ' + len});    


            console.log(JSON.stringify({checks: [{Activity_id: row.Trilha_ID, Subscription_id: row.QrCode, type: row.Type, checked_at: row.DateTime}], 
                                        document: this.props.cpf, token: this.props.token}));

            //Envia os registros para o servidor via API
            fetch('http://187.19.101.152:8080/api/mobile/check/new/list', 
                    {method: 'POST',
                    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
                    body: JSON.stringify({checks: [{Activity_id: row.Trilha_ID, Subscription_id: row.QrCode, type: row.Type, checked_at: row.DateTime}], document: this.props.cpf, token: this.props.token})})
            .then((response) => response.json())
            .then((responseJson) => {

              console.log(responseJson);  

              //se conseguiu inserir o post, atualiza para enviado
              if(responseJson.errors.length > 0){
                  erros = erros + 1;
                  if(responseJson.errors[0].message != ''){
                    alert(responseJson.errors[0].message  + '\nInscrição:' + row.Trilha_ID + '\nAtividade:' + row.QrCode);
                  }
              }else{
                if(responseJson.count.ok == 1){
                  
                  db.transaction((tx) => {
                    let vSQL = 'UPDATE readers SET Reader_State = ? WHERE QrCode = ? AND Event_ID = ? AND Trilha_ID = ? '; 
                    tx.executeSql(vSQL, ['E', row.QrCode, row.Event_ID, row.Trilha_ID], (tx, results) => {
                        console.log("Atualização realizada.");
                        ok = ok + 1;
                      });
                  });  

                }else{
                  erros = erros + 1;
                  if(responseJson.message != ''){
                    alert(responseJson.message + '\nInscrição:' + row.Trilha_ID + '\nAtividade:' + row.QrCode);
                  }
                }
              }

            })
            .catch((error) => {
              alert('Falha na comunicação com o servidor.');
              console.error(error);
            });
                 
          }

          alert('Sincronização Finalizada!');

        });
    });  

  }

  
  render() {
    return (
      <Button title='SINCRONIZAR DADOS' color='#800080' onPress={() => this.sincronizarDados()}/>
    );
  }  
}

const mapStateToProps = state =>(
  {
    cpf   : state.AutenticacaoReducer.cpf,
    token : state.AutenticacaoReducer.token  
  }
); 

export default connect(mapStateToProps, { modificaCPF, modificaToken})(ButtonSincronizar);
