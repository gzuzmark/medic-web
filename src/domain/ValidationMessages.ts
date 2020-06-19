const yupLocaleObject = {
	mixed: {
		required: 'Este campo es requerido',
	},
	number: {
		max: 'Este campo debe ser menor a ${max}',
		positive: 'El valor de este campo debe ser positivo',
	},
	string: {
		max: 'No debe tener más de ${max} caracteres',
	},
};

export default yupLocaleObject;
