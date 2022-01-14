import * as React from "react";
import FormColumn from "../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../common/FormRow/FormRow";
import MentorDropDown from "../../../../../common/MentorDropDown/MentorDropDown";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import useHandlerDocument, {
    IUseHandlerDocument
} from "../../../MentorFormCreate/components/FormMail/UseHandlerDocument";
import {IFormManagerDisabledFields, IFormManagerInfoFields} from "../../../MentorFormCreate/components/FormManager/FormManager";
import MentorFormBaseContext, {IMentorFormBaseContext} from "../../../MentorFormBase/MentorFormBase.context";
import {DOCUMENT_STATUS} from "../../../MentorFormBase/MentorFormBase.validations";


interface IStateFormProfessionalData {
    loadingSkills: boolean;
    loadingDocument: boolean;
}

interface IPropsFormProfessionalData {
    disableFields: IFormManagerDisabledFields;
    infoFields?: IFormManagerInfoFields;
    isEdit?: boolean;
    forceDisable?: boolean;
    loadingSkills?: boolean;
    onChangeDocument?: (status: number) => void;
}

interface IPropsFormProfessionalDataCore extends IPropsFormProfessionalData {
    document: IUseHandlerDocument;
}

class FormPersonalDataCore extends React.Component <IPropsFormProfessionalDataCore, IStateFormProfessionalData> {
    public state: IStateFormProfessionalData;
    constructor(props: IPropsFormProfessionalDataCore) {
        super(props);
        this.state = {
            loadingDocument: false,
            loadingSkills: false
        };
        // this.handlerLocation = this.handlerLocation.bind(this);
        this.handlerSkills = this.handlerSkills.bind(this);
        this.getDocumentAttr = this.getDocumentAttr.bind(this);
        this.hasErrorSkills = this.hasErrorSkills.bind(this);
    }

    public render() {
        let counter = 0;
        return (
            <MentorFormBaseContext.Consumer>
                {(context: IMentorFormBaseContext) => {
                    const {errors, touched, values, handleBlur, handleChange} = context;
                   // const skills = context.values.skills.map((v: IPropsMentorOptionsDropDown) => v.value);
                   
                    const skillsError = this.hasErrorSkills(context);
                    return (
                        <React.Fragment>
                            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                                <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorDropDown lowercaseLabel={true}
                                        label={"Especialidad"}
                                        name={"skill"}
                                        error={skillsError}
                                        disabled={this.state.loadingSkills || !!this.props.forceDisable}
                                        isSearchable={true}
                                        value={context.values.skill.value}
                                        onBlur={context.handleBlur}
                                        triggerChange={this.handlerSkills(context)}
                                        placeholder="Ejmpl.: Química general, matemáti..."
                                        options={context.listSkills} />
                                </FormColumn>
                            ]}/>
                            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                                <FormColumn width={3} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorInput lowercaseLabel={true}
                                        label={"Colegiatura"}
                                        disabled={true}
                                        error={touched.college && errors.college}
                                        attrs={{
                                            maxLength: 20,
                                            name: "college",
                                            onBlur: context.handleBlur,
                                            onChange: context.handleChange,
                                            placeholder: "CMP",
                                            value: context.values.college}}/>
                                </FormColumn>,
                                <FormColumn width={3} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorInput lowercaseLabel={true}
                                        label={"Número de colegiatura"}
                                        info={"El número de colegiatura debe ser de, <br> entre 4 y 8 digitos"}                                        
                                        disabled={!!this.props.forceDisable}     
                                        error={touched.medicCollegeNumber && errors.medicCollegeNumber}               
                                        attrs={{
                                            name: "medicCollegeNumber",
                                            onBlur: handleBlur,                            
                                            onChange: handleChange,
                                            placeholder: "Ejemplo: 088569, 4564",
                                            value: values.medicCollegeNumber
                                            }}/>
                                </FormColumn>,
                                <FormColumn width={3} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorInput 
                                        label={"RNE"}
                                        info={""}                                        
                                        disabled={!!this.props.forceDisable}     
                                        error={touched.rne && errors.rne}               
                                        attrs={{
                                            name: "rne",
                                            onBlur: handleBlur,                            
                                            onChange: handleChange,
                                            placeholder: "Ejemplo: 088569, 4564",
                                            value: values.rne
                                            }}/>
                            </FormColumn>
                            ]}/>
                            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                                <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorInput lowercaseLabel={true}
                                        label={"Ubicación *"}
                                        disabled={!!this.props.forceDisable}
                                        attrs={{
                                            name: "city",
                                            onBlur: handleBlur,                            
                                            onChange: handleChange,
                                            placeholder: "Lima norte, Lima centro, etc",
                                            value: context.values.city
                                            }}/>
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
/*
    private handlerLocation(context: IMentorFormBaseContext) {
        return (name: string, option: IPropsMentorOptionsDropDown) => {
            
            if (context.updateListSkills) {
                context.updateListSkills().then(() => {
                    this.setState({loadingSkills: false});
                });
            }
        }
    }*/

    private hasErrorSkills(context: IMentorFormBaseContext) {
        let message = '';
        const noSkillSelected = !!context.touched.skills && context.errors.skills;
        if (noSkillSelected) {
            message = 'Seleccione al menos una especialidad'
        }
        return message
    }

    private handlerSkills(context: IMentorFormBaseContext) {
        return (name: string, option: any) => {
            context.setFieldValue(name, option);
            context.setFieldTouched(name);
            context.setFieldValue('college', option.code);
            context.setFieldTouched('college', false);
            if (context.updateListDiagnostics) {
                context.updateListDiagnostics(option.value).then(() => {
                    // this.setState({loadingSkills: false});
                });
            }
        }
    }
}

const ProfessionalDataForm: React.FC<IPropsFormProfessionalData> = (props) => {
    const document = useHandlerDocument(props.onChangeDocument || (() => void(0)), DOCUMENT_STATUS.NOT_FOUND);
    return (
        <FormPersonalDataCore {...props} document={document} />
    )
}

export default ProfessionalDataForm;
