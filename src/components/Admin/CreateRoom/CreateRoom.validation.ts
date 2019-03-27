import * as Yup from "yup";
import {errorRequired} from "../MentorFormBase/MentorFormBase.validations";

const roomCreateSchema = Yup.object().shape({
    block: Yup.string().required(errorRequired),
    description : Yup.string().required(errorRequired).trim(),
    interestAreasId: Yup.array().required(errorRequired).min(1).of(Yup.string()),
    maxStudents: Yup.string().required(errorRequired).trim(),
    site: Yup.string().required(errorRequired)
});

export default roomCreateSchema
