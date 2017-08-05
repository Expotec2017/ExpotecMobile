import React from 'react';
import {Router, Scene} from 'react-native-router-flux';

import FormQRCodeReader from './scenes/FormQRCodeReader';
import FormMenuEvento from './scenes/FormMenuEvento';
import FormMenuDia from './scenes/FormMenuDia';
import FormMenuTrilha from './scenes/FormMenuTrilha';
import FormMenuCheckIn from './scenes/FormMenuCheckIn';
import FormLeituraRegistrada from './scenes/FormLeituraRegistrada';
import FormLeituraManual from './scenes/FormLeituraManual';
import FormLogin from './scenes/FormLogin';

const Rotas  = () => (
  <Router sceneStyle={{ paddingTop: 50}}>
    <Scene key='FormMenuEvento' component={FormMenuEvento} title='Tipo de Evento' />
    <Scene key='FormMenuDia' component={FormMenuDia} title='Dia do Evento' />
    <Scene key='FormMenuTrilha' component={FormMenuTrilha} title='Atividades da Trilha' />
    <Scene key='FormQRCodeReader' component={FormQRCodeReader} title='Aproxime o QR-Code' />
    <Scene key='FormMenuCheckIn' component={FormMenuCheckIn} title='Tipo de Leitura' />
    <Scene key='FormLeituraRegistrada' component={FormLeituraRegistrada} title='Leitura Registrada' />
    <Scene key='FormLeituraManual' component={FormLeituraManual} title='Leitura Manual' />
    <Scene key='FormLogin' component={FormLogin} initial title='Expotec Mobile' />
  </Router>
);

export default Rotas;
