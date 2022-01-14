import {ArrayHelpers, FieldArray} from "formik";
import * as React from "react";
import styled from "styled-components";
import FormColumn from "../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../common/FormRow/FormRow";
import Icon from "../../../../../common/Icon/Icon";
import MentorCheckbox from "../../../../../common/MentorCheckbox/MentorCheckbox";
import colors from "../../../../../common/MentorColor";
import MentorDropDown, {IPropsMentorOptionsDropDown} from "../../../../../common/MentorDropDown/MentorDropDown";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import {Body1, Subhead1} from "../../../../../common/MentorText";
import {date} from "../../../../../common/Utils/DateUtilities";
import {IMentorEducationInfoForm} from "../../../../../domain/Mentor/MentorBaseForm";
import MentorFormBaseContext, {IMentorFormBaseContext} from "../../../MentorFormBase/MentorFormBase.context";
// import getBorderColor from "../../../MentorFormBase/components/FormTemplate/FormTemplateField";

export const SubTitle = styled(Subhead1)`
    text-align: center;
`;

export const EducationItem = styled.div`
    padding: 30px 0;
    border-bottom: 1px solid ${colors.MISC_COLORS.background_grey_2};
    &:last-child {
        border-bottom: 0;
    }
`;

export const OptionsHandler = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    button {
        align-items: center;
        background: transparent;
        border: 0;
        display: flex;
        ${Body1} {
            color: ${colors.BACKGROUND_COLORS.background_green }
        }
        svg {
            fill: ${colors.BACKGROUND_COLORS.background_green};
        }
        &:not([disabled]) {
            cursor: pointer;
        }
        &[disabled] {
            ${Body1} {
                color: ${colors.BACKGROUND_COLORS.background_disabled_button}!important;
            }
            svg {
                fill: ${colors.BACKGROUND_COLORS.background_disabled_button}!important;
            }
        }
        &:hover {
            ${Body1} {
                color: ${colors.BACKGROUND_COLORS.background_dark_green};
            }
            svg {
                fill: ${colors.BACKGROUND_COLORS.background_dark_green};
            }
        }
        &:active {
            ${Body1} {
                color: ${colors.BACKGROUND_COLORS.background_dark_green};
            }
            svg {
                fill: ${colors.BACKGROUND_COLORS.background_dark_green};
            }
        }
    }
`;

export interface IPropsFormEducationData {
    isEdit?: boolean;
    forceDisable?: boolean;
}


class EducationDataForm extends React.Component <IPropsFormEducationData, {}> {
    constructor(props: IPropsFormEducationData) {
        super(props);
        this.handlerDate = this.handlerDate.bind(this);
        this.renderEducation = this.renderEducation.bind(this);
    }

    public render() {
        return (
            <MentorFormBaseContext.Consumer>
                {(context: IMentorFormBaseContext) => {
                    return (
                        <>
                        <span style={{color:'#1ECD96',fontWeight:700,fontSize:'18px',marginTop:'10px',display:'flex'}}>FORMACIÓN</span>
                        <FieldArray
                            name="education"
                            render={this.renderEducation(context)}/>
                        </>
                    )
                }}
            </MentorFormBaseContext.Consumer>
        )
    }

    private renderEducation(ctxt: IMentorFormBaseContext) {
        let counter = 0;
        const education = !!ctxt.values.education ? ctxt.values.education : [] as IMentorEducationInfoForm[];
        const {touched, errors} = ctxt;
        const hasError = this.connectValidations(touched.education, errors.education);

        const educationType = [
            {value: "m", label: "Maestría"},
            {value: "d", label: "Doctorado"},
            {value: "t", label: "Titulado"},
            {value: "b", label: "Bachiller"},
            {value: "c", label: "Curso"},
            {value: "s", label: "Seminario"},
            {value: "p", label: "Programa"}];

        return (arrayHelpers: ArrayHelpers) => {
            const addNewEducation = () => {
                arrayHelpers.push({
                    company: "",
                    currentJob: false,
                    fromMonth: "",
                    fromYear: "",
                    position: "",
                    toMonth: "",
                    toYear: ""
                })
            };
            const removeExperience = (index: number) => {
                return () => {
                    arrayHelpers.remove(index);
                }
            };
            return education.map((value: IMentorEducationInfoForm, index: number) => {
                const isEdit = !!this.props.isEdit;
                const toYearEmpty = counter === 0 && !value.year && isEdit && !value.currentStudy;
                /*const educationType = counter === 0 && !value.educationType;
                const degree = counter === 0 && !value.degree ;
                const school = counter === 0 && !value.school && isEdit;
                */
                return (
                    <EducationItem key={index} className={'ExperienceItem'}>
                         <FormRow style={{ paddingBottom: '30px', margin: 0 }} columns={[
                            <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                                <MentorDropDown lowercaseLabel={true}
                                    label={"Tipo de formación"}
                                    value={value.educationType}
                                    disabled={!!this.props.forceDisable}
                                    error={hasError(index, "educationType")}
                                    name={`education[${index}].educationType`}
                                    triggerChange={this.handlerDate(ctxt)}
                                    placeholder="Bachilller, titulado, curso, seminario..."
                                    options={educationType.map(a => ({label: a.label, value: a.value}))} />
                            </FormColumn>
                        ]} />
                        <FormRow style={{ paddingBottom: '30px', margin: 0 }} columns={[
                            <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                <MentorInput lowercaseLabel={true}
                                    label={"Titulo *"}
                                    error={hasError(index, "degree")}
                                    disabled={!!this.props.forceDisable}
                                    attrs={{
                                        maxLength: 150,
                                        name: `education[${index}].degree`,
                                        onBlur: ctxt.handleBlur,
                                        onChange: ctxt.handleChange,
                                        placeholder: "",
                                        value: value.degree}}/>
                            </FormColumn>,
                            <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                <MentorDropDown lowercaseLabel={true}
                                        label={"Fecha de fin *"}
                                        value={value.year}
                                        empty={toYearEmpty}
                                        disabled={value.currentStudy || !!this.props.forceDisable}
                                        error={hasError(index, "year") && "  "}
                                        name={`education[${index}].year`}
                                        triggerChange={this.handlerDate(ctxt)}
                                        placeholder="Año"
                                        options={date.years} />
                                <MentorCheckbox
                                    text={"Actualmente estudia aquí"}
                                    disabled={!!this.props.forceDisable}
                                    attr={{
                                        checked: !!ctxt.values.education[index].currentStudy,
                                        name: `education[${index}].currentStudy`,
                                        onBlur: ctxt.handleBlur,
                                        onChange: this.handlerCurrentJob(ctxt, index)
                                    }}/>
                            </FormColumn>
                        ]}/>
                        <FormRow style={{ paddingBottom: '30px', margin: 0 }} columns={[
                            <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                                <MentorInput lowercaseLabel={true}
                                    label={"Institución educativa *"}
                                    error={hasError(index, "school")}
                                    disabled={!!this.props.forceDisable}
                                    attrs={{
                                        maxLength: 150,
                                        name: `education[${index}].school`,
                                        onBlur: ctxt.handleBlur,
                                        onChange: ctxt.handleChange,
                                        placeholder: "",
                                        value: value.school}}/>
                            </FormColumn>
                        ]} />
                        <FormRow style={{ paddingBottom: '30px', margin: 0 }} columns={[
                            <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                                <MentorInput lowercaseLabel={true}
                                    label={"Ubicación *"}
                                    error={hasError(index, "city")}
                                    disabled={!!this.props.forceDisable}
                                    attrs={{
                                        maxLength: 150,
                                        name: `education[${index}].city`,
                                        onBlur: ctxt.handleBlur,
                                        onChange: ctxt.handleChange,
                                        placeholder: "",
                                        value: value.city}}/>
                            </FormColumn>
                        ]} />
                        <OptionsHandler>
                            <button disabled={education.length <= 1 && index === 0 || !!this.props.forceDisable} onClick={removeExperience(index)} type={"button"}>
                                <Icon name={"trash"}/><Body1>Eliminar</Body1>
                            </button>
                            {education.length === index + 1 &&
                            <button  disabled={!!this.props.forceDisable} onClick={addNewEducation} type={"button"}>
                                <Icon name={"add-circle"}/><Body1>Agregar formación</Body1>
                            </button>}
                        </OptionsHandler>
                    </EducationItem>
                )}
            )
        }
    }

    private connectValidations(touched: any, errors: any) {
        return (index: number, key: string) => {
            const t = touched && touched[index] && touched[index][key];
            const e = errors && errors[index] && errors[index][key];
            return t && e;
        }
    }

    private handlerCurrentJob(context: IMentorFormBaseContext, index: number) {
        return (e: any) => {
            if (!this.props.forceDisable) {
                context.setFieldTouched(`experiences[${index}].fromMonth`);
                context.setFieldTouched(`experiences[${index}].fromYear`);
                context.setFieldValue(`experiences[${index}].toMonth`, '');
                context.setFieldValue(`experiences[${index}].toYear`, '');
                context.handleChange(e);
            }
        }
    }

    private handlerDate(context: IMentorFormBaseContext) {
        return (name: string, selectedOption: IPropsMentorOptionsDropDown | IPropsMentorOptionsDropDown[]) => {
            if (!Array.isArray(selectedOption)) {
                context.setFieldValue(name, selectedOption.value);
                context.setFieldTouched(name);
            }
        };
    }
}

export default EducationDataForm;
