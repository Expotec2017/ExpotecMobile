import React, { Component } from 'react';
import {Image} from 'react-native';

export default class ImagemLogo extends Component {

  render() {
    return (
      <Image source={require('../imgs/logo_univel.png')} />
    );
  }  
}
