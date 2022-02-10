import * as React from "react";
import ContentModal from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import FormColumn from "../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../common/FormRow/FormRow";
import Icon from "../../../../../common/Icon/Icon";
import colors from "../../../../../common/MentorColor";
import MentorDropDown, {IPropsMentorOptionsDropDown} from "../../../../../common/MentorDropDown/MentorDropDown";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import {Body1, LIGHT_TEXT} from "../../../../../common/MentorText";
import {emailStatus,genderList} from "../../../../../domain/Mentor/MentorBaseForm";
import {documentDefaultSelection, documentTypeList} from "../../../../../repository/DocumentsIdentification";
import MentorFormBaseContext from "../../../MentorFormBase/MentorFormBase.context";
import {DOCUMENT_STATUS} from "../../../MentorFormBase/MentorFormBase.validations";
import {IFormManagerDisabledFields, IFormManagerInfoFields} from "../FormManager/FormManager";
import useHandlerDocument from "../FormMail/UseHandlerDocument";
import useHandlerEmail from "../FormMail/UseHandlerEmail";

export type fnUpdateDisabledFields  = (fields: IFormManagerDisabledFields) => void;
export type fnOnChangeDocument  = (status: number) => void;

interface IPropsPersonalData {
    disableFields: IFormManagerDisabledFields;
    isEdit?: boolean;
    infoFields?: IFormManagerInfoFields;
    forceDisable?: boolean;
    onChangeDocument?: fnOnChangeDocument;
    updateDisabledFields: fnUpdateDisabledFields,
}


const PersonalDataForm: React.FC<IPropsPersonalData> = (props) => {
    const [modal, setModal] = React.useState("");
    const email = useHandlerEmail(props.updateDisabledFields, props.onChangeDocument || (() => void(0)), setModal);
    const document = useHandlerDocument(props.onChangeDocument || (() => void(0)), DOCUMENT_STATUS.NOT_FOUND);
    const context = React.useContext(MentorFormBaseContext);
    const onCloseModal = () => {
        context.setFieldValue("documentType", documentDefaultSelection);
        context.setFieldTouched("documentType", false);
        context.setFieldValue("document", '');
        context.setFieldTouched("document", false);
        context.setFieldValue("email", '');
        context.setFieldTouched("email", false);
        context.setFieldValue("status", emailStatus.NO_DATA);
        if(!!props.onChangeDocument){
           props.onChangeDocument(DOCUMENT_STATUS.EMPTY); 
        }        
        setModal("");
    };
    const {errors, touched} = context;
    let counter = 0;
    const genders = genderList;
    const onChangeGender = (name: string, option: IPropsMentorOptionsDropDown) => {
        context.setFieldValue(name, option);
        context.setFieldTouched(name);
    };

    return (
        <React.Fragment>
            <MentorModalBase show={!!modal} styles={{textAlign: 'center', minHeight: 'auto', paddingBottom: 20}} onCloseModal={onCloseModal}>
                <ContentModal.Generic loading={false} generic={{image: <Icon name={'alert'} />, title: "Este mentor ya está registrado", description: modal}} />
                <Body1 style={{textAlign: 'center', marginTop: 25}} weight={LIGHT_TEXT}>Para cambiar los datos del mentor envíanos un <br/> correo a ugomonkeys@lacafetalab.pe</Body1>
            </MentorModalBase>
            <FormRow style={{padding: '30px 0 30px 0', margin: 0}} columns={[
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorInput lowercaseLabel={true}
                        label={"Nombre *"}
                        disabled={props.disableFields.firstName || !!props.forceDisable}
                        error={(touched.lastName && errors.firstName) || (!!props.isEdit && errors.firstName)}
                        attrs={{
                                maxLength: 150,
                                name: "firstName",
                                onBlur: context.handleBlur,
                                onChange: context.handleChange,
                                placeholder: "Ingresa el nombre completo",
                                value: context.values.firstName}}/>
                </FormColumn>,
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorInput
                        lowercaseLabel={true}
                        label={"Apellido *"}
                        error={(touched.lastName && errors.lastName) || (props.isEdit && errors.lastName)}
                        info={props.infoFields && props.infoFields.lastName}
                        disabled={props.disableFields.lastName || !!props.forceDisable}
                        attrs={{
                                maxLength: 150,
                                name: "lastName",
                                onBlur: context.handleBlur,
                                onChange: context.handleChange,
                                placeholder: "Ingrese los apellidos",
                                value: context.values.lastName}}/>
                </FormColumn>
            ]}/>
            <FormRow columns={[
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorDropDown lowercaseLabel={true}
                        label={"Sexo"}
                        name={"gender"}
                        value={context.values.gender.value}
                        triggerChange={onChangeGender}
                        placeholder="Masculino"
                        options={genders.map(a => ({label: a.label, value: a.value}))} />
                </FormColumn>,
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorInput lowercaseLabel={true}
                        label={"Celular"}
                        error={(touched.contactNumber && errors.contactNumber) || (props.isEdit && errors.lastName)}
                        iconStyles={{fill: colors.MISC_COLORS.green}}
                        attrs={{
                            name: "contactNumber",
                            onBlur: context.handleBlur,
                            onChange: context.handleChange,
                            placeholder: "",
                            value: context.values.contactNumber}}/>
                </FormColumn>
            ]} />
            <FormRow columns={[
                <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorInput lowercaseLabel={true}
                        label={"Correo"}
                        error={email.error}
                        loading={email.loading}
                        icon={email.loadSuccess}
                        iconStyles={{fill: colors.MISC_COLORS.green}}
                        disabled={props.disableFields.document || !!props.forceDisable}
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
                    <MentorDropDown lowercaseLabel={true}
                        label={"Tipo de documento"}
                        name={"documentType"}
                        disabled={props.disableFields.documentType || !!props.forceDisable}
                        value={document.valueType}
                        triggerChange={document.onChangeType}
                        placeholder="DNI, Carné de extranjería, etc."
                        options={documentTypeList} />
                </FormColumn>,
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorInput lowercaseLabel={true}
                        label={"Número de documento"}
                        error={document.error}
                        disabled={props.disableFields.document || !!props.forceDisable}
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


export default PersonalDataForm;
