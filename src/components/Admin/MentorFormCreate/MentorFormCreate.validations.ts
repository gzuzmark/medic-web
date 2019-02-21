import * as Yup from 'yup';
import {emailStatus} from "../../../domain/Mentor/MentorBaseForm";
import mentorFormBaseSchema from "../MentorFormBase/MentorFormBase.validations";

export const errorRequired = 'Campo es requerido.';
export const emailRequired = emailStatus.EMAIL_NOT_VALID;
export const limitDescription = 120;

const mentorCreateSchema = mentorFormBaseSchema.clone();

mentorCreateSchema.shape({
    email: Yup.string().required(errorRequired)
        .test('emailValidation', emailRequired, (email: string) => {
            let isValid = false;
            if (!!email) {
                const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                isValid = re.test(email.trim());
            }
            return isValid
        }),
})

export default mentorCreateSchema;
