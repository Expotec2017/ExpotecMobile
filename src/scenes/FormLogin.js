import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ImagemLogo from '../components/ImagemLogo';
import { connect } from 'react-redux';

import { modificaCPF, modificaSenha, modificaToken } from '../actions/AutenticacaoActions';

export class FormLogin extends Component {

  realizarLogin(){

    //conectar na api    
    fetch('http://187.19.101.152:8080/api/mobile/login', 
            {method: 'POST',
            headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify({document: this.props.cpf, password: this.props.senha})})
    .then((response) => response.json())
    .then((responseJson) => {

      //conseguiu se conectar na API
      if(responseJson.ok == 1){
        this.props.modificaToken(responseJson.token);
        Actions.FormMenuEvento();
      }else{
        alert(responseJson.message);
      }
    })
    .catch((error) => {
      alert('Falha na comunicação com o servidor.');
      console.error(error);
    });

  }

  render(){
      return(
          <View style={styles.viewprincipal}>
              <View style={styles.viewTitulo}>
                <ImagemLogo />
              </View>

              <View style={styles.viewLogin}>
                <TextInput value={this.props.cpf} style={styles.inputLogin} placeholder='CPF' keyboardType='numeric' onChangeText={texto => this.props.modificaCPF(texto)}/>
                <TextInput value={this.props.senha} secureTextEntry style={styles.inputLogin} placeholder='Senha' onChangeText={texto => this.props.modificaSenha(texto)}/>
              </View>

              <View style={styles.viewBotao}>
                <Button title="Acessar" onPress={() => this.realizarLogin()} />
              </View>
          </View>
      );
  }
}

const mapStateToProps = state => (
  {
    cpf: state.AutenticacaoReducer.cpf,
    senha: state.AutenticacaoReducer.senha,
    token: state.AutenticacaoReducer.token    
  }

);

export default connect(mapStateToProps, {modificaCPF, modificaSenha, modificaToken})(FormLogin);

const styles = StyleSheet.create({

  viewprincipal: {
    flex : 1,
  },

  viewTitulo: {
    flex : 3, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'
  },

  viewLogin: {
    flex :1,
    padding: 25   
  },

  viewBotao: {
    flex : 1,
    padding: 25
  },

  inputLogin: {
      fontSize: 20,
      height: 45
  }
});
