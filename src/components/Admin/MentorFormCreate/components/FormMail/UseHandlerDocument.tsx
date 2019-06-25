import * as React from "react";
import {IPropsMentorOptionsDropDown} from "../../../../../common/MentorDropDown/MentorDropDown";
import {emailStatus, IMentorBaseForm} from "../../../../../domain/Mentor/MentorBaseForm";
import {documentDefaultSelection} from "../../../../../repository/DocumentsIdentification";
import MentorService from "../../../../../services/Mentor/Mentor.service";
import MentorFormBaseContext from "../../../MentorFormBase/MentorFormBase.context";
import {DOCUMENT_STATUS, listValidDocumentStatus} from "../../../MentorFormBase/MentorFormBase.validations";
import {fnOnChangeDocument, fnUpdateDisabledFields} from "./FormMail";

const mentorService = new MentorService();

const getDocumentAttr = (documentType?: string) => {
    let attr: object = {disabled: true};
    if (!!documentType) {
        attr = {
            maxLength: documentType === 'DNI' ? 8 : 12
        }
    }
    return attr;
};

export interface IUseHandlerDocument {
    attrs: object;
    error: string;
    handleBlur: any,
    loadSuccess: string;
    loading: boolean;
    onChange: any;
    onChangeType: any;
    value: string;
    valueType: string;
}

const useHandlerDocument = (
    onChangeDocument: fnOnChangeDocument,
    documentStatus: number,
    updateDisabledFields?: fnUpdateDisabledFields): IUseHandlerDocument => {
    const [timer, setTimer] = React.useState(0 as any);
    const [loading, setLoading] = React.useState(false);
    const [state, setState] = React.useState({error: '', loadSuccess: ''});
    const context = React.useContext(MentorFormBaseContext);
    const {values} = context;
    const attrs = getDocumentAttr(values.documentType.value);
    const value =  values.document;
    const valueType =  values.documentType.value;
    const handleBlur = context.handleBlur;
    React.useEffect(() => {
        const {touched, errors} = context;
        const documentHasError =
            documentStatus === DOCUMENT_STATUS.EXIST;
        const requestHasError = documentStatus === DOCUMENT_STATUS.REQUEST_ERROR;
        const errorValidation =  touched.document && errors.document;
        const errorRequest = requestHasError && "Documento no válido";
        const errorDocument = documentHasError && "Documento Inválido. Verifícalo e ingrésalo nuevamente. ";
        const documentCheck  = listValidDocumentStatus.indexOf(documentStatus) !== -1;
        setState({
            ...state,
            error: errorValidation || errorRequest || errorDocument,
            loadSuccess: documentCheck ? 'check': ''
        });

    }, [context.values.document, context.values.documentType, documentStatus]);

    React.useEffect(() => {
        if (context.values.status === emailStatus.EMAIL_NOT_VALID && documentStatus === DOCUMENT_STATUS.EMPTY) {
            context.setFieldValue("documentType", documentDefaultSelection);
            context.setFieldTouched("documentType", false);
            context.setFieldValue("document", '');
            context.setFieldTouched("document", false);
        }
    }, [context.values.status, documentStatus]);

    const handleLoading = (loadingDocument: boolean, status: number) => {
        setLoading(loadingDocument);
        onChangeDocument(status);
    };

    const handlerDocumentType = (name: string, option: IPropsMentorOptionsDropDown) => {
        context.setFieldValue(name, option);
        context.setFieldTouched(name);
        context.setFieldValue('document', '');
        context.setFieldTouched('document', false);
        handleLoading(false, DOCUMENT_STATUS.EMPTY);
    };

    const updateMentorData = (data?: IMentorBaseForm) => {
        context.setFieldValue("lastName", data ? data.lastname : '');
        context.setFieldTouched("lastName", !!data);
        context.setFieldValue("firstName", data ? data.name : '');
        context.setFieldTouched("firstName", !!data);
        if (!data) {
            handleLoading(false, DOCUMENT_STATUS.EMPTY);
        }
        if (updateDisabledFields) {
            updateDisabledFields({
                document: false,
                documentType: false,
                firstName: !!data && !!data.name && !!data.name.trim(),
                lastName: !!data && !!data.lastname && !!data.lastname.trim()
            })
        }
    };

    const verifyDocument = (document: string) => {
        if (document.length > 0 && !context.touched.document) {
            context.setFieldTouched('document', true);
        }
        if (DOCUMENT_STATUS.EMPTY !== documentStatus) {
            updateMentorData();
        }
        if (context.values.documentType.value !== 'DNI') {
            document.padStart(12, '0')
        }
        const fullDocument = context.values.documentType.value === 'DNI' ? document : document.padStart(12, '0');
        mentorService.verifyDocument(fullDocument).then((mentor: IMentorBaseForm) => {
            updateMentorData(mentor);
            handleLoading(false, DOCUMENT_STATUS.FOUND);
        }).catch((e) => {
            updateMentorData();
            if (e.response && e.response.data) {
                handleLoading(false, e.response.data.code);
            }
        });
    };

    const handlerDocument = (e: any) => {
        context.handleChange(e);
        clearTimeout(timer);
        handleLoading(true, DOCUMENT_STATUS.WAITING);
        const newTimer = setTimeout(() => {
            verifyDocument(e.target.value);
        }, 250);
        setTimer(newTimer);
    };

    return {
        attrs,
        error: state.error,
        handleBlur,
        loadSuccess: state.loadSuccess,
        loading,
        onChange: handlerDocument,
        onChangeType: handlerDocumentType,
        value,
        valueType
    }
};

export default useHandlerDocument;
