import * as React from "react";
import {IPropsMentorOptionsDropDown} from "../../../../../common/MentorDropDown/MentorDropDown";
import MentorService from "../../../../../services/Mentor/Mentor.service";
import MentorFormBaseContext from "../../../MentorFormBase/MentorFormBase.context";

const mentorService = new MentorService();
export const DOCUMENT_STATUS = {
    EMPTY: 3,
    ERROR: 1,
    EXIST: 409,
    FOUND: 200,
    NOT_FOUND: 404,
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

const useHandlerDocument = (onChangeDocument: (status: number) => void): IUseHandlerDocument => {
    const [timer, setTimer] = React.useState(0 as any);
    const [loading, setLoading] = React.useState(false);
    const [state, setState] = React.useState({error: '', documentStatus:  DOCUMENT_STATUS.EMPTY, loadSuccess: ''});
    const context = React.useContext(MentorFormBaseContext);
    const {values} = context;
    const attrs = getDocumentAttr(values.documentType.value);
    const value =  values.document;
    const valueType =  values.documentType.value;
    const handleBlur = context.handleBlur;
    React.useEffect(() => {
        const {touched, errors} = context;
        const errorDocument =  touched.document && errors.document;
        const documentError =
            state.documentStatus === DOCUMENT_STATUS.EXIST ||
            state.documentStatus === DOCUMENT_STATUS.FOUND ||
            state.documentStatus === DOCUMENT_STATUS.EMPTY;
        setState({
            ...state,
            error: errorDocument,
            loadSuccess: documentError ? '': 'check'
        });

    }, [context]);

    const handleLoading = (loadingDocument: boolean, status: number) => {
        setLoading(loadingDocument);
        setState({...state, documentStatus: status});
        onChangeDocument(status);
    };

    const handlerDocumentType = (name: string, option: IPropsMentorOptionsDropDown) => {
        context.setFieldValue(name, option);
        context.setFieldTouched(name);
        context.setFieldValue('document', '');
        context.setFieldTouched('document', false);
    };

    const handlerDocument = (e: any) => {
        context.handleChange(e);
        clearTimeout(timer);
        handleLoading(true, DOCUMENT_STATUS.WAITING);
        const newTimer = setTimeout(() => {
            mentorService.verifyDocument(e.target.value).then(() => {
                handleLoading(false, DOCUMENT_STATUS.FOUND);
            }).catch((error) => {
                if (error.response && error.response.data) {
                    handleLoading(false, error.response.data.code);
                } else {
                    handleLoading(false, DOCUMENT_STATUS.ERROR);
                }
            });
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
