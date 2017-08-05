const INITIAL_STATE = {
	cpf   : '',
	senha : '',
	token : ''
}

export default (state = INITIAL_STATE, action) => {

	if(action.type == 'modifica_cpf'){
		return { ...state, cpf: action.payload}
	}
	
	if(action.type == 'modifica_senha'){
		return { ...state, senha: action.payload}
	}

	if(action.type == 'modifica_token'){
		return { ...state, token: action.payload}
	}

	return state;
}