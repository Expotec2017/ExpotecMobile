import React, { Component } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { modificaTrilhaNome, modificaEventoNome, modificaQRCode, modificaData, modificaTipo } from '../actions/LeituraActions';

import ImagemOK from '../components/ImagemOK';

export class FormLeituraRegistrada extends Component {

  clickBotao(){
    this.props.modificaQRCode('');
    Actions.pop();
  }  

  render() {
    return (
      <View style={stylesRegistrado.container}>        

        <View style={stylesRegistrado.cabecalho}>
          <ImagemOK />
        </View>    

        <View style={stylesRegistrado.detalhes}>
          <Text style={stylesRegistrado.texto}>Nº da Inscrição.: {this.props.qrCode} </Text>
          <Text style={stylesRegistrado.texto}>Evento..............: {this.props.evento_nome}</Text>
          <Text style={stylesRegistrado.texto}>Data.................: {this.props.data}</Text>
          <Text style={stylesRegistrado.texto}>Trilha...............: {this.props.trilha_nome}</Text>
          <Text style={stylesRegistrado.texto}>Tipo.................: CHECK-{this.props.tipo}</Text>

          <View style={stylesRegistrado.item}>
            <Button title='OK' onPress={() => this.clickBotao()}/>    
          </View>          

        </View>
         
      </View>         
    );
  }  
}

stylesRegistrado = StyleSheet.create({

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
    padding: 4
  },

  texto:{
    fontSize: 18,
    fontWeight: 'bold',
    padding: 1
  }
});


const mapStateToProps = state =>(
  {
    evento_nome: state.LeituraReducer.evento_nome,
    trilha_nome: state.LeituraReducer.trilha_nome,        
    qrCode: state.LeituraReducer.qrCode,
    data: state.LeituraReducer.data,
    tipo: state.LeituraReducer.tipo
  }
); 

export default connect(mapStateToProps, { modificaTrilhaNome, modificaEventoNome, modificaQRCode, modificaData, modificaTipo})(FormLeituraRegistrada);
