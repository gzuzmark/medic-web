import * as React from "react";
import {emailStatus, IMentorBaseForm} from "../../../../../domain/Mentor/MentorBaseForm";
import MentorService from "../../../../../services/Mentor/Mentor.service";
import MentorFormBaseContext from "../../../MentorFormBase/MentorFormBase.context";
import {DOCUMENT_STATUS} from "../../../MentorFormBase/MentorFormBase.validations";
import {fnOnChangeDocument, fnUpdateDisabledFields} from "./FormMail";

const mentorService = new MentorService();

const useHandlerEmail = (updateDisabledFields: fnUpdateDisabledFields, onChangeDocument: fnOnChangeDocument, setModal: (s: string) => void) => {
    const [timer, setTimer] = React.useState(0 as any);
    const [state, setState] = React.useState({error: '', loadSuccess: ''});
    const [loading, setLoading] = React.useState(false);
    const context = React.useContext(MentorFormBaseContext);
    React.useEffect(() => {
        const {errors, touched, values} = context;
        const statusEmail = getStatusEmail(values.status);
        const errorEmail = !!touched.email && errors.email;
        const errorValidation = touched.status && statusEmail;
        const loadSuccess = !!touched.email && !!values.email && values.email.length > 0 && !loading && !errorEmail && !errorValidation;
        setState({
            error: errorEmail || errorValidation,
            loadSuccess: loadSuccess ? 'check' : ''
        });
    }, [context]);

    const handleBlur = context.handleBlur;

    const getStatusEmail = (status: string) => {
        const alreadyRegistered = status === emailStatus.ALREADY_REGISTERED && emailStatus.ALREADY_REGISTERED;
        const errorProcess = status === emailStatus.ERROR_PROCESS && emailStatus.ERROR_PROCESS;
        const emailNotValid = status === emailStatus.EMAIL_NOT_VALID && emailStatus.EMAIL_NOT_VALID;
        return alreadyRegistered || errorProcess || emailNotValid || '';
    };

    const updateStatusEmailValidation = (code: number, message?: string) => {
        if (code === 404) {
            context.setFieldValue("status", emailStatus.NO_DATA);
        } else if (code === 409) {
            context.setFieldValue("status", emailStatus.ALREADY_REGISTERED);
        } else if (code === 412) {
            if (!!message) {
                setModal(message);
                context.setFieldValue("status", emailStatus.DNI_ALREADY_REGISTERED);
            }
        } else if (code === 400) {
            context.setFieldValue("status", emailStatus.EMAIL_NOT_VALID);
        } else if (code === 401) {
            context.setFieldValue("status", emailStatus.ERROR_PROCESS);
        } else {
            context.setFieldValue("status", emailStatus.EMAIL_NOT_VALID);
        }
    };

    const updateMentorData = (value?: IMentorBaseForm) => {
        context.setFieldValue("status", value ? emailStatus.FULL_DATA : emailStatus.NO_DATA);
        context.setFieldValue("utp", value ? value.utp : false);
        context.setFieldTouched("utp", !!value);
        // context.setFieldValue("lastName", value ? value.lastname : '');
        // context.setFieldTouched("lastName");
        // context.setFieldValue("firstName", value ? value.name : '');
        // context.setFieldTouched("firstName");
        if (value) {
            context.setFieldValue("documentType", {value: value.documentType});
            context.setFieldTouched("documentType", !value);
            context.setFieldValue("document", value.document);
            context.setFieldTouched("document", !value);
            onChangeDocument(DOCUMENT_STATUS.EMPTY);
        }
        updateDisabledFields({
            document: !!value && !!value.document && !!value.document.trim(),
            documentType: !!value && !!value.documentType && !!value.documentType.trim(),
            firstName: !!value && !!value.name && !!value.name.trim(),
            lastName: !!value && !!value.lastname && !!value.lastname.trim()
        })
    };


    const verifyMentor = (email: string) => {
        mentorService.verify(email.trim()).then((mentor: IMentorBaseForm) => {
            setLoading(false);
            updateMentorData(mentor);
        }).catch((error: any) => {
            if (error.response && error.response.data) {
                setLoading(false);
                const {code, message} = error.response.data;
                updateStatusEmailValidation(code, message);
            }
        });
    };

    const onChange = (e: any) => {
        context.handleChange(e);
        if (emailStatus.FULL_DATA === context.values.status) {
            updateMentorData();
        }
        setLoading(false);
        clearTimeout(timer);
        if (e.target.value.includes("@")) {
            context.setFieldTouched("status");
            context.setFieldTouched("email");
            context.setFieldValue("status", emailStatus.EMAIL_NOT_VALID);
            const newTimer = setTimeout(() => {
                setLoading(true);
                verifyMentor(e.target.value.trim());
            }, 250);
            setTimer(newTimer);
        }
    };

    return {error: state.error, loading, loadSuccess: state.loadSuccess, handleBlur, onChange, value: context.values.email}
};

export default useHandlerEmail;
