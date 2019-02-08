import * as Yup from 'yup';
export const errorRequired = 'Campo es requerido.';


export const mentorCreateSchema = Yup.object().shape({
    currentCompany: Yup.string().required(errorRequired),
    currentPosition: Yup.string().required(errorRequired),
    description: Yup.string().required(errorRequired),
    experiences: Yup.array().min(1).max(3).of(
        Yup.object().shape({
            company: Yup.string().required(errorRequired),
            from: Yup.string(),
            position: Yup.string().required(errorRequired),
            to: Yup.string(),
        })
    ),
    firstName: Yup.string().required(errorRequired),
    lastName: Yup.string().required(errorRequired),
    numberContact: Yup.string().required(errorRequired),
    picture: Yup.string().required(errorRequired),
});

export default mentorCreateSchema;
