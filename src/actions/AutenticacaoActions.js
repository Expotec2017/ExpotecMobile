export const modificaSenha = (texto) =>{
	return{
		type: 'modifica_senha',
		payload: texto
	}
}

export const modificaCPF = (texto) =>{
	return{
		type: 'modifica_cpf',
		payload: texto
	}
}

export const modificaToken = (texto) =>{
	return{
		type: 'modifica_token',
		payload: texto
	}
}
