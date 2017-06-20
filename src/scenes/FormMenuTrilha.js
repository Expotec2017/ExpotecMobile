import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';


import ButtonTrilha from '../components/ButtonTrilha';
import ImagemLogo from '../components/ImagemLogo';

export default class FormMenuTrilha extends Component {

  constructor(props) {
    super(props);    
    this.state = {listaTrilha : []};
  }

  componentWillMount() {
    //requisição HTTP
    axios.get('http://www.zandonainfo.com.br/trilhas.html')
        .then((response) => {this.setState({ listaTrilha : response.data})})
        .catch(() => {console.log('Erro ao recuperar os dados da trilha.'); });    
  }


  render() {
    return (
      <View style={styles.container}>

        <View style={styles.cabecalho}>
          <ImagemLogo />
        </View>   
        
        <View style={styles.detalhes}>
          <Text style={styles.item}>Escolha um curso/palestra da trilha:</Text>


          { 
            this.state.listaTrilha.map( function(item) {
              return(
                <View style={styles.item}>
                  <ButtonTrilha nome={item.nome} />  
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
		padding: 5
  },

  detalhes:{    
    flex: 5
  }  

});
