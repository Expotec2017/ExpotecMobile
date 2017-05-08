import React from 'react';
import {Router, Scene} from 'react-native-router-flux';

import FormPrincipal from './scenes/FormPrincipal';
import FormQRCodeReader from './scenes/FormQRCodeReader';
import {Actions} from 'react-native-router-flux';

const Rotas  = () => (
  <Router sceneStyle={{ paddingTop: 50}}>
    <Scene key='FormPrincipal' component={FormPrincipal} initil title='QR-Code Expotec'/>
    <Scene key='FormQRCodeReader' component={FormQRCodeReader} title='Aproxime o QR-Code' />
  </Router>
);

export default Rotas;
