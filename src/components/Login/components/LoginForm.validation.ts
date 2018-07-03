import * as Yup from 'yup';

export const errorLoginMessage = 'Correo y/o contraseña incorrectos.';

export const schema = Yup.object().shape({
    password: Yup.string().required(errorLoginMessage),
    username: Yup.string().required(errorLoginMessage),
});