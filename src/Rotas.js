import React from 'react';
import {Router, Scene} from 'react-native-router-flux';

import FormQRCodeReader from './scenes/FormQRCodeReader';
import FormMenuEvento from './scenes/FormMenuEvento';
import FormMenuDia from './scenes/FormMenuDia';
import FormMenuTrilha from './scenes/FormMenuTrilha';
import FormMenuCheckIn from './scenes/FormMenuCheckIn';

const Rotas  = () => (
  <Router sceneStyle={{ paddingTop: 50}}>
    <Scene key='FormMenuEvento' component={FormMenuEvento} initil title='Tipo de Evento' />
    <Scene key='FormMenuDia' component={FormMenuDia} title='Dia do Evento' />
    <Scene key='FormMenuTrilha' component={FormMenuTrilha} title='Eventos da Trilha' />
    <Scene key='FormQRCodeReader' component={FormQRCodeReader} title='Aproxime o QR-Code' />
    <Scene key='FormMenuCheckIn' component={FormMenuCheckIn} title='Tipo de Leitura' />
  </Router>
);

export default Rotas;
