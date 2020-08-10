import * as yup from 'yup';
import yupLocaleObject from '../ValidationMessages';

yup.setLocale(yupLocaleObject);

const sessionFormValidationSchema = yup.object().shape({
	case: yup.object().shape({
		treatments: yup.array().of(
			yup.object().shape({
				frequency: yup.string().required(),
				period: yup.string().required(),
				quantity: yup.string().required(),
			}),
		),
	}),
});

export default sessionFormValidationSchema;
