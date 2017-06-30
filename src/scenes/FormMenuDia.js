import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

import ButtonDia from '../components/ButtonDia';
import ImagemLogo from '../components/ImagemLogo';

export default class FormMenuDia extends Component {

  constructor(props) {
    super(props);    
    this.state = {listaDias : []};
  }

  componentWillMount() {
    //requisição HTTP
    axios.get('http://www.zandonainfo.com.br/dias.json')
        .then((response) => {this.setState({ listaDias : response.data})})
        .catch(() => {console.log('Erro ao recuperar os dados dos dias.'); });    
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.cabecalho}>
          <ImagemLogo />
        </View>    
        
        <View style={styles.detalhes}>
          <Text style={styles.item}>Escolha a data:</Text>

          { 
            this.state.listaDias.map( function(item) {
              return(
                <View style={styles.item}>
                  <ButtonDia key={item.data} dia={item.data} />  
                </View>
              ) 
            })
          }               
        </View>

      </View>         
    );
  }  
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

  item:{
		padding: 25
  },

  detalhes:{    
    flex: 5
  }

});
