import * as React from "react";
import ContentModal from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import FormColumn from "../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../common/FormRow/FormRow";
import Icon from "../../../../../common/Icon/Icon";
import colors from "../../../../../common/MentorColor";
import MentorDropDown from "../../../../../common/MentorDropDown/MentorDropDown";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import {Body1, LIGHT_TEXT} from "../../../../../common/MentorText";
import {emailStatus} from "../../../../../domain/Mentor/MentorBaseForm";
import {documentDefaultSelection, documentTypeList} from "../../../../../repository/DocumentsIdentification";
import MentorFormBaseContext from "../../../MentorFormBase/MentorFormBase.context";
import {DOCUMENT_STATUS} from "../../../MentorFormBase/MentorFormBase.validations";
import {IFormManagerDisabledFields} from "../FormManager/FormManager";
import useHandlerDocument from "./UseHandlerDocument";
import useHandlerEmail from "./UseHandlerEmail";

export type fnUpdateDisabledFields  = (fields: IFormManagerDisabledFields) => void;
export type fnOnChangeDocument  = (status: number) => void;

interface IPropsFormMail {
    updateDisabledFields: fnUpdateDisabledFields,
    disableFields: IFormManagerDisabledFields;
    onChangeDocument: fnOnChangeDocument;
    documentStatus: number;
}


const FormMail: React.FC<IPropsFormMail> = (props) => {
    const [modal, setModal] = React.useState("");
    const email = useHandlerEmail(props.updateDisabledFields, props.onChangeDocument, setModal);
    const document = useHandlerDocument(props.onChangeDocument, props.documentStatus, props.updateDisabledFields);
    const context = React.useContext(MentorFormBaseContext);
    const onCloseModal = () => {
        context.setFieldValue("documentType", documentDefaultSelection);
        context.setFieldTouched("documentType", false);
        context.setFieldValue("document", '');
        context.setFieldTouched("document", false);
        context.setFieldValue("email", '');
        context.setFieldTouched("email", false);
        context.setFieldValue("status", emailStatus.NO_DATA);
        props.onChangeDocument(DOCUMENT_STATUS.EMPTY);
        setModal("");
    };
    let counter = 0;
    return (
        <React.Fragment>
            <MentorModalBase show={!!modal} styles={{textAlign: 'center', minHeight: 'auto', paddingBottom: 20}} onCloseModal={onCloseModal}>
                <ContentModal.Generic loading={false} generic={{image: <Icon name={'alert'} />, title: "Este mentor ya está registrado", description: modal}} />
                <Body1 style={{textAlign: 'center', marginTop: 25}} weight={LIGHT_TEXT}>Para cambiar los datos del mentor envíanos un <br/> correo a ugomonkeys@lacafetalab.pe</Body1>
            </MentorModalBase>
            <FormRow columns={[
                <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorInput
                        label={"CORREO"}
                        error={email.error}
                        loading={email.loading}
                        icon={email.loadSuccess}
                        iconStyles={{fill: colors.MISC_COLORS.green}}
                        attrs={{
                            name: "email",
                            onBlur: email.handleBlur,
                            onChange: email.onChange,
                            placeholder: "Ingresa el correo del doctor",
                            value: email.value
                        }}
                        styleContainer={{padding: '30px 0'}}/>
                </FormColumn>
            ]} />
            <FormRow columns={[
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorDropDown
                        label={"TIPO DE DOCUMENTO"}
                        name={"documentType"}
                        disabled={props.disableFields.documentType}
                        value={document.valueType}
                        triggerChange={document.onChangeType}
                        placeholder="DNI, Carné de extranjería, etc."
                        options={documentTypeList} />
                </FormColumn>,
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorInput
                        label={"NÚMERO DE DOCUMENTO"}
                        error={document.error}
                        disabled={props.disableFields.document}
                        icon={document.loadSuccess}
                        iconStyles={{fill: colors.MISC_COLORS.green}}
                        loading={document.loading}
                        attrs={{
                            name: "document",
                            onBlur: document.handleBlur,
                            onChange: document.onChange,
                            placeholder: "Ingresa el número de documento",
                            value: document.value,
                            ...document.attrs}}/>
                </FormColumn>
            ]} />
        </React.Fragment>
    )
};


export default FormMail;
