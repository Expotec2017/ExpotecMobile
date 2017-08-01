import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class FormLogin extends Component {

	constructor(props) {
		super(props);
	}

  render(){
      return(
          <View style={styles.viewprincipal}>

              <View style={styles.viewTitulo}>
                  <Text style={styles.textoTitulo}>Expotec Mobile</Text>
              </View>

              <View style={styles.viewLogin}>
                  <TextInput style={styles.inputLogin} placeholder='E-mail' placeholderTextColor='#ff6699' />
                  <TextInput secureTextEntry style={styles.inputLogin} placeholder='Senha' placeholderTextColor='#ff6699'/>
              </View>

              <View style={styles.viewBotao}>
                  <Button title="Acessar" color='#ff6699' onPress={() => Actions.FormMenuEvento()} />
              </View>
          </View>
      );
  }
}

const styles = StyleSheet.create({

  viewprincipal: {
    flex : 1,
  },

  viewTitulo: {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  viewLogin: {
    flex :2    
  },

  viewBotao: {
    flex : 2
  },

  textoTitulo: {
    fontSize: 25
    fontWeight: 'bold'
  },

  inputLogin: {
      fontSize: 20,
      height: 45
  }
});
