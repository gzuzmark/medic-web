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
import {IMentorFormExperience} from "../../../../../domain/Mentor/MentorBaseForm";
import MentorFormBaseContext, {IMentorFormBaseContext} from "../../../MentorFormBase/MentorFormBase.context";
import getBorderColor from "../../../MentorFormBase/components/FormTemplate/FormTemplateField";
export const SubTitle = styled(Subhead1)`
    text-align: center;
`;

export const ExperienceItem = styled.div`
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

export interface IPropsFormExperience {
    isEdit?: boolean;
    forceDisable?: boolean;
}

const PASS = 'pass';

class ExperienceForm extends React.Component <IPropsFormExperience, {}> {
    constructor(props: IPropsFormExperience) {
        super(props);
        this.handlerDate = this.handlerDate.bind(this);
        this.renderExperience = this.renderExperience.bind(this);
    }

    public render() {
        return (
            <MentorFormBaseContext.Consumer>
                {(context: IMentorFormBaseContext) => {
                    return (
                        <>
                        <span style={{color:'#1ECD96',fontWeight:700,fontSize:'18px',marginTop:'10px',display:'flex'}}>EXPERIENCIA</span>
                        <FieldArray
                            name="experiences"
                            render={this.renderExperience(context)}/>
                        </>
                    )
                }}
            </MentorFormBaseContext.Consumer>
        )
    }
    
    private renderExperience(ctxt: IMentorFormBaseContext) {
        let counter = 0;
        const experiences = !!ctxt.values.experiences ? ctxt.values.experiences : [] as IMentorFormExperience[];
        const {touched, errors} = ctxt;
        const hasError = this.connectValidations(touched.experiences, errors.experiences);
        const experienceType = [
            {value: "Profesional", label: "Profesional"},
            {value: "Residentado", label: "Residentado"},
            {value: "Serum", label: "Serums"},
            {value: "Intercambio", label: "Intercambio"}
        ];
        return (arrayHelpers: ArrayHelpers) => {
            const addNewExperience = () => {
                arrayHelpers.push({
                    company: "",
                    type:"",
                    currentJob: false,
                    fromYear: "",
                    position: "",
                    toYear: "",
                    location:"",
                })
            };
            const removeExperience = (index: number) => {
                return () => {
                    arrayHelpers.remove(index);
                }
            };
            return experiences.map((value: IMentorFormExperience, index: number) => {
                const isEdit = !!this.props.isEdit;
                const positionEmpty = counter === 0 && !value.position ? '' : PASS;
                const companyEmpty = counter === 0 && !value.company ? '' : PASS;
                const fromYearEmpty = counter === 0 && !value.fromYear && isEdit;
                const toYearEmpty = counter === 0 && !value.toYear && isEdit && !value.currentJob;
                const fromYearValue = this.getYearFromDateString(value.fromYear);
                const toYearValue = this.getYearFromDateString(value.toYear);
                return (
                    <ExperienceItem key={index} className={'ExperienceItem'}>
                        <FormRow style={{padding: '0px 0 40px 0', margin: 0}} columns={[
                            <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                                <MentorDropDown lowercaseLabel={true}
                                    label={"Tipo de experiencia"}
                                    value={value.type}
                                    disabled={!!this.props.forceDisable}
                                    error={hasError(index, "type")}
                                    name={`experiences[${index}].type`}
                                    triggerChange={this.handlerExpType(ctxt)}
                                    placeholder="Profesional, Residentado, Serums, Intercambio..."
                                    options={experienceType.map(a => ({label: a.label, value: a.value}))} />
                            </FormColumn>
                        ]}/>
                        <FormRow style={{padding: '0px 0 30px 0', margin: 0}} columns={[
                            <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                <MentorInput lowercaseLabel={true}
                                    label={"Cargo"}
                                    error={hasError(index, "position")}
                                    disabled={!!this.props.forceDisable}
                                    attrs={{
                                        maxLength: 150,
                                        name: `experiences[${index}].position`,
                                        onBlur: ctxt.handleBlur,
                                        onChange: ctxt.handleChange,
                                        placeholder: "Ingresa su cargo actual",
                                        style: {borderColor: getBorderColor(positionEmpty, isEdit)},
                                        value: value.position}}/>
                            </FormColumn>,
                            <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                <FormRow style={{marginBottom: 12}} columns={[
                                    <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                        <MentorDropDown lowercaseLabel={true}
                                            label={"Fecha de Inicio*"}
                                            value={fromYearValue}
                                            empty={fromYearEmpty}
                                            disabled={!!this.props.forceDisable}
                                            error={hasError(index, "year") && "  "}
                                            name={`experiences[${index}].fromYear`}
                                            triggerChange={this.handlerDate(ctxt)}
                                            placeholder="Año"
                                            options={date.years} />
                                    </FormColumn>,
                                    <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                        <MentorDropDown lowercaseLabel={true}
                                            label={"Fecha de fin*"}
                                            value={toYearValue}
                                            empty={toYearEmpty}
                                            disabled={value.currentJob === 1 || !!this.props.forceDisable}
                                            error={hasError(index, "year") && "  "}
                                            name={`experiences[${index}].toYear`}
                                            triggerChange={this.handlerDate(ctxt)}
                                            placeholder="Año"
                                            options={date.years} />
                                        <MentorCheckbox
                                            text={"Actualmente trabaja aquí"}
                                            disabled={!!this.props.forceDisable}
                                            attr={{
                                                checked: value.currentJob === 1 ? true : false,
                                                name: `experiences[${index}].currentJob`,
                                                onBlur: ctxt.handleBlur,
                                                onChange: this.handlerCurrentJob(ctxt, index),
                                                style:{fontSize:'11px'}
                                            }}

                                        />
                                    </FormColumn>]}/>
                            </FormColumn>
                        ]}/>
                        <FormRow style={{padding: '0px 0 30px 0', margin: 0}} columns={[
                            <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                                <MentorInput lowercaseLabel={true}
                                    label={"Centro laboral"}
                                    error={hasError(index, "company")}
                                    disabled={!!this.props.forceDisable}
                                    attrs={{
                                        maxLength: 150,
                                        name: `experiences[${index}].company`,
                                        onBlur: ctxt.handleBlur,
                                        onChange: ctxt.handleChange,
                                        placeholder: "",
                                        style: {borderColor: getBorderColor(companyEmpty, isEdit)},
                                        value: value.company}}/>
                            </FormColumn>
                        ]}/>
                        <FormRow style={{padding: '0px 0 30px 0', margin: 0}} columns={[
                            <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                                <MentorInput lowercaseLabel={true}
                                    label={"Ubicación*"}
                                    error={hasError(index, "location")}
                                    attrs={{
                                        maxLength: 150,
                                        name: `experiences[${index}].location`,
                                        onBlur: ctxt.handleBlur,
                                        onChange: ctxt.handleChange,
                                        placeholder: "Ciudad",
                                        value: value.location}}/>
                            </FormColumn>
                        ]}/>
                        <OptionsHandler>
                            <button disabled={experiences.length <= 1 && index === 0 || !!this.props.forceDisable} onClick={removeExperience(index)} type={"button"}>
                                <Icon name={"trash"}/><Body1>Eliminar</Body1>
                            </button>
                            {experiences.length === index + 1 &&
                            <button  disabled={!!this.props.forceDisable} onClick={addNewExperience} type={"button"}>
                                <Icon name={"add-circle"}/><Body1>Agregar experiencia laboral</Body1>
                            </button>}
                        </OptionsHandler>
                    </ExperienceItem>
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

    private getYearFromDateString(dateValue: string | null | undefined): string {
        if (dateValue === null || dateValue === undefined) {
            return '';
        }
        if (dateValue.length >= 4) {
            return dateValue.substring(0, 4);
        }
        return '';
    }

    private handlerCurrentJob(context: IMentorFormBaseContext, index: number) {
        return (e: any) => {
            if (!this.props.forceDisable) {
                const currentTime = new Date();
                const year = currentTime.getFullYear().toString();
                context.setFieldTouched(`experiences[${index}].fromYear`);
                context.setFieldValue(`experiences[${index}].toYear`, year);
                context.setFieldTouched(`experiences[${index}].currentJob`);
                context.handleChange(e);
            }
            if (e.target.checked) {
                context.setFieldValue(`experiences[${index}].currentJob`, 1);
                // cont.handleChange(e);
            }else if (!e.target.checked){
                context.setFieldValue(`experiences[${index}].currentJob`, 0);
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
    private handlerExpType(context: IMentorFormBaseContext) {
        return (name: string, option: IPropsMentorOptionsDropDown) => {
            context.setFieldValue(name, option.value);
            context.setFieldTouched(name);
        }
    }
}

export default ExperienceForm;
