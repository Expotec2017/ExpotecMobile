import React, { Component } from 'react';
import {ActivityIndicator, ListView, View, Text, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';

import ButtonTrilha from '../components/ButtonTrilha';
import ImagemLogo from '../components/ImagemLogo';
import { modificaData, modificaEventoID } from '../actions/LeituraActions';

export class FormMenuTrilha extends Component {

  constructor(props) {
    super(props);
    this.state = {isLoading: true}
  }

  formatarData(date){
    return date.substring(8,10) + '/' + date.substring(5,7) + '/' + date.substring(0,4);
  }  

  componentWillMount() {
    return fetch('http://187.19.101.152:8080/api/mobile/events')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: this.props.evento_id == 1 ? ds.cloneWithRows(responseJson.events.Expotec.activities) : ds.cloneWithRows(responseJson.events.CITIC.activities),
        }, function() {
          // do something with new state
        });
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
          <Text style={styles.item}>Escolha uma atividade da trilha:</Text>          
          <ScrollView>
          <ListView dataSource={this.state.dataSource} renderRow={(rowData) => <View>{this.formatarData(rowData.startDate) == this.props.data ? <View style={styles.item}><ButtonTrilha id={rowData.id} key={rowData.id} nome={rowData.name} /></View> : null}</View>} />
          </ScrollView>
        </View>    
      </View>          
    ); 
  }   
}

const mapStateToProps = state =>(
  {
    data : state.LeituraReducer.data,
    evento_id : state.LeituraReducer.evento_id
  }
); 

export default connect(mapStateToProps, { modificaData, modificaEventoID })(FormMenuTrilha);

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
