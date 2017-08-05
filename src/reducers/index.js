import {combineReducers} from 'redux';
import LeituraReducer from './LeituraReducer'
import AutenticacaoReducer from './AutenticacaoReducer'

export default combineReducers({
	LeituraReducer: LeituraReducer,
	AutenticacaoReducer : AutenticacaoReducer
});