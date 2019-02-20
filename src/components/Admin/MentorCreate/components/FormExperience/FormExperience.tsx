import {ArrayHelpers, FieldArray} from "formik";
import * as React from "react";
import styled from "styled-components";
import {date} from "../../../../../common/DateUtilities";
import Icon from "../../../../../common/Icon/Icon";
import MentorCheckbox from "../../../../../common/MentorCheckbox/MentorCheckbox";
import colors from "../../../../../common/MentorColor";
import MentorDropDown, {IPropsMentorOptionsDropDown} from "../../../../../common/MentorDropDown/MentorDropDown";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import {Body1, Subhead1} from "../../../../../common/MentorText";
import {IMentorFormExperience} from "../../../../../domain/Mentor/MentorCreate";
import FormColumn from "../../../ScheduleSession/components/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../ScheduleSession/components/FormRow/FormRow";
import MentorCreateContext, {IMentorCreateContext} from "../../MentorCreate.context";


export const SubTitle = styled(Subhead1)`
    text-align: center;
`;

export const ExperienceItem = styled.div`
    padding: 30px 85px;
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
            color: ${colors.BACKGROUND_COLORS.background_purple};   
        }
        svg {
            fill: ${colors.BACKGROUND_COLORS.background_purple};
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
                color: ${colors.MISC_COLORS.light_purple};
            }
            svg {
                fill: ${colors.MISC_COLORS.light_purple};
            }
        }
        &:active {
            ${Body1} {
                color: ${colors.MISC_COLORS.dark_purple};
            }
            svg {
                fill: ${colors.MISC_COLORS.dark_purple};
            }
        }
    }
`;


class FormExperience extends React.Component <{}, {}> {
    constructor(props: any) {
        super(props);
        this.handlerDate = this.handlerDate.bind(this);
        this.renderExperience = this.renderExperience.bind(this);
    }

    public render() {
        return (
            <MentorCreateContext.Consumer>
                {(context: IMentorCreateContext) => {
                    return (
                        <div style={{padding: '30px 0'}}>
                            <SubTitle>Otras experiencias laborales</SubTitle>
                            <FieldArray
                                name="experiences"
                                render={this.renderExperience(context)}/>
                        </div>
                    )
                }}
            </MentorCreateContext.Consumer>
        )
    }

    private renderExperience(ctxt: IMentorCreateContext) {
        let counter = 0;
        const experiences = !!ctxt.values.experiences ? ctxt.values.experiences : [] as IMentorFormExperience[];
        const {touched, errors} = ctxt;
        const hasError = this.connectValidations(touched.experiences, errors.experiences);
        return (arrayHelpers: ArrayHelpers) => {
            const addNewExperience = () => {
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
            return experiences.map((value, index) => {
                const currentJobAttr = !!ctxt.values.experiences[index].currentJob ? {checked: true} : {}
                return (
                    <ExperienceItem key={index} className={'ExperienceItem'}>
                        <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                            <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                <MentorInput
                                    label={"CARGO"}
                                    error={hasError(index, "position")}
                                    attrs={{
                                        name: `experiences[${index}].position`,
                                        onBlur: ctxt.handleBlur,
                                        onChange: ctxt.handleChange,
                                        placeholder: "Ingresa su cargo actual",
                                        value: value.position}}/>
                            </FormColumn>,
                            <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                <MentorInput
                                    label={"EMPRESA"}
                                    error={hasError(index, "company")}
                                    attrs={{
                                        name: `experiences[${index}].company`,
                                        onBlur: ctxt.handleBlur,
                                        onChange: ctxt.handleChange,
                                        placeholder: "Ingresa el nombre de la empresa",
                                        value: value.company}}/>
                            </FormColumn>
                        ]}/>
                        <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                            <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                <FormRow style={{alignItems: 'flex-end'}} columns={[
                                    <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                        <MentorDropDown
                                            label={"FECHA DE INICIO"}
                                            value={value.fromMonth}
                                            error={(hasError(index, "toYear") || hasError(index, "fromYear")) && "  " }
                                            name={`experiences[${index}].fromMonth`}
                                            triggerChange={this.handlerDate(ctxt)}
                                            placeholder="Mes"
                                            options={date.months} />
                                    </FormColumn>,
                                    <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                        <MentorDropDown
                                            label={" "}
                                            value={value.fromYear}
                                            error={(hasError(index, "toYear") || hasError(index, "fromYear")) && "  "}
                                            name={`experiences[${index}].fromYear`}
                                            triggerChange={this.handlerDate(ctxt)}
                                            placeholder="Año"
                                            options={date.years} />
                                    </FormColumn>]}/>
                            </FormColumn>,
                            <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                <FormRow style={{alignItems: 'flex-end', marginBottom: 12}} columns={[
                                    <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                        <MentorDropDown
                                            label={"FECHA DE FIN"}
                                            value={value.toMonth}
                                            disabled={value.currentJob}
                                            error={hasError(index, "toYear") && "  "}
                                            name={`experiences[${index}].toMonth`}
                                            triggerChange={this.handlerDate(ctxt)}
                                            placeholder="Mes"
                                            options={date.months} />
                                    </FormColumn>,
                                    <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                        <MentorDropDown
                                            label={" "}
                                            value={value.toYear}
                                            disabled={value.currentJob}
                                            error={hasError(index, "toYear") && "  "}
                                            name={`experiences[${index}].toYear`}
                                            triggerChange={this.handlerDate(ctxt)}
                                            placeholder="Año"
                                            options={date.years} />
                                    </FormColumn>]}/>
                                <MentorCheckbox
                                    text={"Actualmente trabaja aquí"}
                                    attr={{
                                        name: `experiences[${index}].currentJob`,
                                        onBlur: ctxt.handleBlur,
                                        onChange: this.handlerCurrentJob(ctxt, index),
                                        ...currentJobAttr
                                    }}/>
                            </FormColumn>
                        ]}/>
                        <OptionsHandler>
                            <button disabled={experiences.length <= 1 && index === 0} onClick={removeExperience(index)} type={"button"}>
                                <Icon name={"trash"}/><Body1>Eliminar</Body1>
                            </button>
                            {experiences.length === index + 1 &&
                            <button  disabled={experiences.length >= 3} onClick={addNewExperience} type={"button"}>
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

    private handlerCurrentJob(context: IMentorCreateContext, index: number) {
        return (e: any) => {
            context.setFieldTouched(`experiences[${index}].fromMonth`);
            context.setFieldTouched(`experiences[${index}].fromYear`);
            context.setFieldValue(`experiences[${index}].toMonth`, '');
            context.setFieldValue(`experiences[${index}].toYear`, '');
            context.handleChange(e);
        }
    }

    private handlerDate(context: IMentorCreateContext) {
        return (name: string, selectedOption: IPropsMentorOptionsDropDown | IPropsMentorOptionsDropDown[]) => {
            if (!Array.isArray(selectedOption)) {
                context.setFieldValue(name, selectedOption.value);
                context.setFieldTouched(name);
                /*
                if (name === "toYear") {
                    context.setFieldTouched("fromMonth");
                    context.setFieldTouched("toMonth");
                }
                */
            }
        };
    }
}

export default FormExperience;
