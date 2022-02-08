import * as Yup from 'yup';
import {emailStatus} from "../../../domain/Mentor/MentorBaseForm";
import mentorFormBaseSchema, {errorRequired} from "../MentorFormBase/MentorFormBase.validations";

export const emailRequired = emailStatus.EMAIL_NOT_VALID;


const mentorCreateSchema = mentorFormBaseSchema.clone().shape({
    email: Yup.string().required(errorRequired)
        .test('emailValidation', emailRequired, (email: string) => {
            let isValid = false;
            if (!!email) {
                const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                isValid = re.test(email.trim());
            }
            return isValid
        }),

});


const mentorCreateSchemaRNERequired = mentorCreateSchema.clone().shape({

    rne: Yup.string().required(errorRequired).trim()

});

const mentorCreateSchemaRNENotRequired = mentorCreateSchema.clone().shape({

    rne: Yup.string().notRequired().trim()

});

export { mentorCreateSchemaRNERequired, mentorCreateSchemaRNENotRequired };
