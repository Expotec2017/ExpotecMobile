const INITIAL_STATE = {
	evento_id   : 0,
	evento_nome : '',	
	trilha_id   : 0,
	trilha_nome : '',	
	qrCode      : '',
	data        : ''
}

export default (state = INITIAL_STATE, action) => {

	if(action.type == 'modifica_evento_id'){
		return { ...state, evento_id: action.payload}
	}
	
	if(action.type == 'modifica_evento_nome'){
		return { ...state, evento_nome: action.payload}
	}

	if(action.type == 'modifica_trilha_id'){
		return { ...state, trilha_id: action.payload}
	}

	if(action.type == 'modifica_trilha_nome'){
		return { ...state, trilha_nome: action.payload}
	}	
	
	if(action.type == 'modifica_qrcode'){
		return { ...state, qrCode: action.payload}
	}

	if(action.type == 'modifica_data'){
		return { ...state, data: action.payload}
	}


	return state;
}