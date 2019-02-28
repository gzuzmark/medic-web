import * as React from "react";
import MentorDropDown, {IPropsMentorOptionsDropDown} from "../../../../../common/MentorDropDown/MentorDropDown";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import {documentTypeList} from "../../../../../repository/DocumentsIdentification";
import {IFormManagerDisabledFields, IFormManagerInfoFields} from "../../../MentorFormCreate/components/FormManager/FormManager";
import FormColumn from "../../../ScheduleSession/components/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../ScheduleSession/components/FormRow/FormRow";
import MentorFormBaseContext, {IMentorFormBaseContext} from "../../MentorFormBase.context";

interface IStateFormPersonalData {
    loading: boolean;
}

interface IPropsFormPersonalData {
    disableFields: IFormManagerDisabledFields;
    infoFields?: IFormManagerInfoFields;
    isEdit?: boolean;
    forceDisable?: boolean;
}
class FormPersonalData extends React.Component <IPropsFormPersonalData, IStateFormPersonalData> {
    public state: IStateFormPersonalData;
    constructor(props: IPropsFormPersonalData) {
        super(props);
        this.state = {
            loading: false
        };
        this.handlerDocumentType = this.handlerDocumentType.bind(this);
        this.handlerLocation = this.handlerLocation.bind(this);
        this.handlerSkills = this.handlerSkills.bind(this);
        this.getDocumentAttr = this.getDocumentAttr.bind(this);
        this.hasErrorSkills = this.hasErrorSkills.bind(this);
    }

    public render() {
        let counter = 0;
        return (
            <MentorFormBaseContext.Consumer>
                {(context: IMentorFormBaseContext) => {
                    const {errors, touched} = context;
                    const documentAttrs = this.getDocumentAttr(context.values.documentType.value);
                    const documentTypeDisabled = this.props.disableFields.documentType;
                    const skills = context.values.skills.map((v: IPropsMentorOptionsDropDown) => v.value);
                    const skillsError = this.hasErrorSkills(context);
                    return (
                        <React.Fragment>
                            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorInput
                                        label={"NOMBRE"}
                                        error={(touched.lastName && errors.firstName) || (this.props.isEdit && errors.firstName)}
                                        info={this.props.infoFields && this.props.infoFields.firstName}
                                        disabled={this.props.disableFields.firstName || !!this.props.forceDisable}
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
                                        label={"APELLIDO"}
                                        error={(touched.lastName && errors.lastName) || (this.props.isEdit && errors.lastName)}
                                        info={this.props.infoFields && this.props.infoFields.lastName}
                                        disabled={this.props.disableFields.lastName || !!this.props.forceDisable}
                                        attrs={{
                                            maxLength: 150,
                                            name: "lastName",
                                            onBlur: context.handleBlur,
                                            onChange: context.handleChange,
                                            placeholder: "Ingrese los apellidos",
                                            value: context.values.lastName}}/>
                                </FormColumn>
                            ]}/>
                            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorDropDown
                                        label={"TIPO DE DOCUMENTO"}
                                        name={"documentType"}
                                        disabled={documentTypeDisabled || !!this.props.forceDisable}
                                        value={context.values.documentType.value}
                                        info={this.props.infoFields && this.props.infoFields.documentType}
                                        triggerChange={this.handlerDocumentType(context)}
                                        placeholder="DNI, Carné de extranjería, etc."
                                        options={documentTypeList} />
                                </FormColumn>,
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorInput
                                        label={"NÚMERO DE DOCUMENTO"}
                                        error={touched.document && errors.document}
                                        info={this.props.infoFields && this.props.infoFields.document}
                                        disabled={this.props.disableFields.document || !!this.props.forceDisable}
                                        attrs={{
                                            name: "document",
                                            onBlur: context.handleBlur,
                                            onChange: context.handleChange,
                                            placeholder: "Ingresa el número de documento",
                                            value: context.values.document,
                                            ...documentAttrs}}/>
                                </FormColumn>
                            ]}/>
                            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorDropDown
                                        label={"SEDE"}
                                        name={"location"}
                                        disabled={!!this.props.forceDisable}
                                        value={context.values.location.value}
                                        triggerChange={this.handlerLocation(context)}
                                        onBlur={context.handleBlur}
                                        placeholder="Ejmpl.: Lima norte, Lima centro, etc."
                                        options={context.listSites} />
                                </FormColumn>,
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorDropDown
                                        label={"CURSOS"}
                                        name={"skills"}
                                        isMulti={true}
                                        error={skillsError}
                                        disabled={this.state.loading || !!this.props.forceDisable}
                                        isSearchable={true}
                                        value={skills}
                                        onBlur={context.handleBlur}
                                        triggerChange={this.handlerSkills(context)}
                                        placeholder="Ejmpl.: Química general, matemáti..."
                                        options={context.listSkills} />
                                </FormColumn>
                            ]}/>
                            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorInput
                                        label={"NÚMERO DE CONTACTO"}
                                        disabled={!!this.props.forceDisable}
                                        error={touched.contactNumber && errors.contactNumber}
                                        attrs={{
                                            maxLength: 20,
                                            name: "contactNumber",
                                            onBlur: context.handleBlur,
                                            onChange: context.handleChange,
                                            placeholder: "(51-1) 9878 678 677",
                                            value: context.values.contactNumber}}/>
                                </FormColumn>
                            ]}/>
                        </React.Fragment>
                    )
                }}
            </MentorFormBaseContext.Consumer>
        )
    }

    private getDocumentAttr(documentType?: string) {
        let attr: object = {disabled: true};
        if (!!documentType) {
            attr = {
                maxLength: documentType === 'DNI' ? 8 : 12
            }
        }
        return attr;
    }

    private handlerLocation(context: IMentorFormBaseContext) {
        return (name: string, option: IPropsMentorOptionsDropDown) => {
            context.setFieldValue(name, option);
            context.setFieldTouched(name);
            context.setFieldValue('skills', []);
            context.setFieldTouched('skills', false);
            this.setState({loading: true});
            context.updateListSkills(option.value).then(() => {
                this.setState({loading: false});
            });
        }
    }

    private hasErrorSkills(context: IMentorFormBaseContext) {
        let message = '';
        const emptyLocation = !!context.values.location.value && !context.listSkills.length && !this.state.loading;
        const noSkillSelected = !!context.touched.skills && context.errors.skills;
        if (emptyLocation) {
            message = 'La sede seleccionada no contiene curso alguno'
        } else if (noSkillSelected) {
            message = 'Seleccione al menos un curso'
        }
        return message
    }

    private handlerDocumentType(context: IMentorFormBaseContext) {
        return (name: string, option: IPropsMentorOptionsDropDown) => {
            context.setFieldValue(name, option);
            context.setFieldTouched(name);
            context.setFieldValue('document', '');
            context.setFieldTouched('document', false);
        }
    }

    private handlerSkills(context: IMentorFormBaseContext) {
        return (name: string, option: IPropsMentorOptionsDropDown[]) => {
            context.setFieldValue(name, option);
            context.setFieldTouched(name);
        }
    }
}

export default FormPersonalData;
