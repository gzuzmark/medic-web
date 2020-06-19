import * as yup from 'yup';
import yupLocaleObject from '../ValidationMessages';

yup.setLocale(yupLocaleObject);

const couponFormValidationSchema = yup.object().shape({
	code: yup.string().required(),
	limit: yup
		.number()
		.typeError('Este campo debe ser numérico')
		.required()
		.positive(),
	name: yup
		.string()
		.required()
		.max(255),
	percentage: yup
		.number()
		.typeError('Este campo debe ser numérico')
		.required()
		.max(100)
		.positive(),
});

export default couponFormValidationSchema;
