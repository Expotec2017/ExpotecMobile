import React, { Component } from 'react';
import {ActivityIndicator, ListView, View, Text, StyleSheet} from 'react-native';
import ButtonEvento from '../components/ButtonEvento';
import ButtonSincronizar from '../components/ButtonSincronizar';
import ImagemLogo from '../components/ImagemLogo';
import {connect} from 'react-redux';

import { modificaCPF, modificaToken } from '../actions/AutenticacaoActions';

export class FormMenuEvento extends Component {

  constructor(props) {
    super(props);
    this.state = {isLoading: true}
  }

  componentDidMount() {
    //conectar na api    
    return fetch('http://187.19.101.152:8080/api/mobile/events', 
                  {method: 'POST',
                  headers: {'Accept': 'application/json','Content-Type': 'application/json'},
                  body: JSON.stringify({document: this.props.cpf, token: this.props.token})})
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({isLoading: false, dataSource: ds.cloneWithRows(responseJson.events)}, function() {});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (      
      <View style={styles.container}> 

        <View style={styles.cabecalho}>
          <ImagemLogo />
        </View>    

        <View style={styles.detalhes}>
          <View style={styles.item}>
            <ButtonSincronizar/>    
          </View>        
          <Text style={styles.item}>Escolha um evento:</Text>          
          <ListView dataSource={this.state.dataSource} renderRow={(rowData) => <View style={styles.item}><ButtonEvento listaAtividades={rowData.activities} key={rowData.id} id={rowData.id} nome={rowData.name} /></View>} />    
        </View>    
      </View>          
    ); 
  }   
}

const mapStateToProps = state => (
  {
    cpf: state.AutenticacaoReducer.cpf,
    token: state.AutenticacaoReducer.token    
  }
);

export default connect(mapStateToProps, {modificaCPF, modificaToken})(FormMenuEvento);

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
