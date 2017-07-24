export const modificaEventoID = (texto) =>{
	return{
		type: 'modifica_evento_id',
		payload: texto
	}
}

export const modificaEventoNome = (texto) =>{
	return{
		type: 'modifica_evento_nome',
		payload: texto
	}
}

export const modificaTrilhaID = (texto) =>{
	return{
		type: 'modifica_trilha_id',
		payload: texto
	}
}

export const modificaTrilhaNome = (texto) =>{
	return{
		type: 'modifica_trilha_nome',
		payload: texto
	}
}

export const modificaQRCode = (texto) =>{
	return{
		type: 'modifica_qrcode',
		payload: texto
	}
}

export const modificaData = (texto) =>{
	return{
		type: 'modifica_data',
		payload: texto
	}
}

export const modificaTipo = (texto) =>{
	return{
		type: 'modifica_tipo',
		payload: texto
	}
}