import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

import ButtonEvento from '../components/ButtonEvento';
import ImagemLogo from '../components/ImagemLogo';

export default class FormMenuEvento extends Component {

  constructor(props) {
    super(props);    
    this.state = {listaEventos : []};
  }

  componentWillMount() {

    //requisição HTTP
    axios.get('http://www.zandonainfo.com.br/eventos.html')
        .then((response) => {this.setState({ listaEventos : response.data})})
        .catch(function (error) {console.log(error.message); });    
  }


  render() {

    return (

      <View style={styles.container}> 

        <View style={styles.cabecalho}>
          <ImagemLogo />
        </View>    

        <View style={styles.detalhes}>
          <Text style={styles.item}>Escolha um evento:</Text>
          { this.state.listaEventos.map( function(item) {
              return(
                      <View style={styles.item}>
                        <ButtonEvento nome={item.nome} />  
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
  container: {
    flex:10
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
