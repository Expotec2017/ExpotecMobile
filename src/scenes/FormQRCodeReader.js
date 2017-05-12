import React, { Component } from 'react';
import BarcodeScanner from 'react-native-barcodescanner';

export default class FormQRCodeReader extends Component {

  constructor(props) {
    super(props);
    this.state = {torchMode: 'off', cameraType: 'back'};
  }

  barcodeReceived(e) {
    alert('Barcode: ' + e.data);
  }

  render() {
    return (
      <BarcodeScanner onBarCodeRead={this.barcodeReceived} 
                      style={{ flex: 1 }} 
                      torchMode={this.state.torchMode} 
                      cameraType={this.state.cameraType}/>
    );
  }  
}
