import * as React from "react";
import colors from "../../../../../common/MentorColor";
import MentorDropDown from "../../../../../common/MentorDropDown/MentorDropDown";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import {documentTypeList} from "../../../../../repository/DocumentsIdentification";
import FormColumn from "../../../ScheduleSession/components/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../ScheduleSession/components/FormRow/FormRow";
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
    const email = useHandlerEmail(props.updateDisabledFields, props.onChangeDocument);
    const document = useHandlerDocument(props.onChangeDocument, props.documentStatus, props.updateDisabledFields);
    let counter = 0;
    return (
        <React.Fragment>
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
                            placeholder: "Ingresa el correo UTP del mentor",
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
