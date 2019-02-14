import * as React from "react";
import MentorDropDown, {IPropsMentorOptionsDropDown} from "../../../../../common/MentorDropDown/MentorDropDown";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import FormColumn from "../../../ScheduleSession/components/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../ScheduleSession/components/FormRow/FormRow";
import MentorCreateContext, {IMentorCreateContext} from "../../MentorCreate.context";
import {IFormManagerDisabledFields} from "../FormManager/FormManager";

interface IPropsFormPersonalData {
    disableFields: IFormManagerDisabledFields;
}
class FormPersonalData extends React.Component <IPropsFormPersonalData, {}> {
    constructor(props: IPropsFormPersonalData) {
        super(props);
        this.handlerDocumentType = this.handlerDocumentType.bind(this);
        this.handlerLocation = this.handlerLocation.bind(this);
        this.handlerSkills = this.handlerSkills.bind(this);
        this.getAttrs = this.getAttrs.bind(this);
        this.getDocumentAttr = this.getDocumentAttr.bind(this);
    }

    public render() {
        let counter = 0;
        return (
            <MentorCreateContext.Consumer>
                {(context: IMentorCreateContext) => {
                    const {errors, touched} = context;
                    const documentAttrs = this.getDocumentAttr(this.props.disableFields.document, context.values.documentType.value);
                    const firstNameAttrs = this.getAttrs(this.props.disableFields.firstName);
                    const lastNameAttrs = this.getAttrs(this.props.disableFields.lastName);
                    const documentTypeDisabled = this.props.disableFields.documentType;
                    return (
                        <React.Fragment>
                            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorInput
                                        label={"NOMBRE"}
                                        error={touched.firstName && errors.firstName}
                                        attrs={{
                                            name: "firstName",
                                            onBlur: context.handleBlur,
                                            onChange: context.handleChange,
                                            placeholder: "Ingresa el nombre completo",
                                            value: context.values.firstName,
                                            ...firstNameAttrs}}/>
                                </FormColumn>,
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorInput
                                        label={"APELLIDO"}
                                        error={touched.lastName && errors.lastName}
                                        attrs={{
                                            name: "lastName",
                                            onBlur: context.handleBlur,
                                            onChange: context.handleChange,
                                            placeholder: "Ingresa el apellido",
                                            value: context.values.lastName,
                                            ...lastNameAttrs}}/>
                                </FormColumn>
                            ]}/>
                            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorDropDown
                                        label={"TIPO DE DOCUMENTO"}
                                        name={"documentType"}
                                        disabled={documentTypeDisabled}
                                        value={context.values.documentType.value}
                                        triggerChange={this.handlerDocumentType(context)}
                                        placeholder="DNI, Carné de extranjería, etc."
                                        options={[
                                            {value: "DNI", label: "DNI"},
                                            {value: "CARNET_EXT", label: "Carné de extranjería"}]} />
                                </FormColumn>,
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorInput
                                        label={"NUMERO DE DOCUMENTO"}
                                        error={touched.document && errors.document}
                                        attrs={{
                                            name: "document",
                                            onBlur: context.handleBlur,
                                            onChange: context.handleChange,
                                            placeholder: "Ingresa el número de docuemnto",
                                            value: context.values.document,
                                            ...documentAttrs}}/>
                                </FormColumn>
                            ]}/>
                            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorDropDown
                                        label={"SEDE"}
                                        name={"location"}
                                        value={context.values.location.value}
                                        triggerChange={this.handlerLocation(context)}
                                        placeholder="Empl.: Lima norte, Lima centro, etc."
                                        options={[
                                            {value: "dni", label: "Sede Central"},
                                            {value: "ext", label: "Sede LaCafetaLab"}]} />
                                </FormColumn>,
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorDropDown
                                        label={"CURSOS"}
                                        name={"skills"}
                                        isMulti={true}
                                        isSearchable={true}
                                        value={context.values.skills.map((v) => v.value)}
                                        triggerChange={this.handlerSkills(context)}
                                        placeholder="Ejmpl.: Química general, matemáti..."
                                        options={[
                                            {value: "ingles", label: "Ingles"},
                                            {value: "quimica", label: "Quimica"},
                                            {value: "P", label: "Programación"},
                                            {value: "qw", label: "Introducción a la Química General"},
                                            {value: "intra", label: "Introducción a la matemática para ingenieros"},
                                            {value: "s", label: "Portugues"},
                                            {value: "a", label: "Fisica"},
                                            {value: "d", label: "Diseño"},
                                            {value: "ext", label: "Mate"}]} />
                                </FormColumn>
                            ]}/>
                            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorInput
                                        label={"NUMERO DE CONTACTO"}
                                        error={touched.numberContact && errors.numberContact}
                                        attrs={{
                                            name: "numberContact",
                                            onBlur: context.handleBlur,
                                            onChange: context.handleChange,
                                            placeholder: "(51-1) 9878 678 677",
                                            value: context.values.numberContact}}/>
                                </FormColumn>
                            ]}/>
                        </React.Fragment>
                    )
                }}
            </MentorCreateContext.Consumer>
        )
    }

    private getAttrs(disabled: boolean) {
        let attr: object = {};
        if (disabled) {
            attr = {disabled: true};
        }
        return attr;
    }

    private getDocumentAttr(disabled: boolean, documentType?: string) {
        let attr: object = {disabled: true};
        if (!!documentType) {
            attr = {
                maxLength: documentType === 'DNI' ? 8 : 12
            }
        }
        if (disabled) {
            attr = {...attr, disabled: true};
        }
        return attr;
    }
    private handlerLocation(context: IMentorCreateContext) {
        return (name: string, option: IPropsMentorOptionsDropDown) => {
            context.setFieldValue(name, option);
            context.setFieldTouched(name);
        }
    }

    private handlerDocumentType(context: IMentorCreateContext) {
        return (name: string, option: IPropsMentorOptionsDropDown) => {
            context.setFieldValue(name, option);
            context.setFieldTouched(name);
            context.setFieldValue('document', '');
            context.setFieldTouched('document', false);
        }
    }

    private handlerSkills(context: IMentorCreateContext) {
        return (name: string, option: IPropsMentorOptionsDropDown[]) => {
            context.setFieldValue(name, option);
            context.setFieldTouched(name);
        }
    }
}

export default FormPersonalData;
