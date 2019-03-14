import * as React from "react";
import {IPropsMentorOptionsDropDown} from "../../../../../common/MentorDropDown/MentorDropDown";
import {emailStatus} from "../../../../../domain/Mentor/MentorBaseForm";
import MentorService from "../../../../../services/Mentor/Mentor.service";
import MentorFormBaseContext from "../../../MentorFormBase/MentorFormBase.context";

const mentorService = new MentorService();
export const DOCUMENT_STATUS = {
    EMPTY: 3,
    ERROR: 1,
    EXIST: 409,
    FOUND: 200,
    NOT_FOUND: 404,
    REQUEST_ERROR: 400,
    WAITING: 0
};
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

const useHandlerDocument = (onChangeDocument: (status: number) => void, documentStatus: number): IUseHandlerDocument => {
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
            documentStatus === DOCUMENT_STATUS.EXIST ||
            documentStatus === DOCUMENT_STATUS.FOUND;
        const requestHasError = documentStatus === DOCUMENT_STATUS.REQUEST_ERROR;

        const errorValidation =  touched.document && errors.document;
        const errorRequest = requestHasError && "Documento no válido";
        const errorDocument = documentHasError && "Documento Inválido. Verifícalo e ingrésalo nuevamente. ";
        const documentCheck  = documentStatus === DOCUMENT_STATUS.NOT_FOUND;
        setState({
            ...state,
            error: errorValidation || errorRequest || errorDocument,
            loadSuccess: documentCheck ? 'check': ''
        });

    }, [context.values.document, context.values.documentType, documentStatus]);

    React.useEffect(() => {
        if (context.values.status === emailStatus.EMAIL_NOT_VALID && documentStatus === DOCUMENT_STATUS.EMPTY) {
            context.setFieldValue("documentType", {value: ''});
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

    const verifyDocument = (document: string) => {
        if (document.length > 0 && !context.touched.document) {
            context.setFieldTouched('document', true);
        }
        mentorService.verifyDocument(document).then(() => {
            handleLoading(false, DOCUMENT_STATUS.FOUND);
        }).catch((e) => {
            if (e.response && e.response.data) {
                handleLoading(false, e.response.data.code);
            } else {
                handleLoading(false, DOCUMENT_STATUS.ERROR);
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
