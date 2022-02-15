import { ArrayHelpers, FieldArray } from "formik";
import * as React from "react";
import { IMentorAwardsInfo } from "src/domain/Mentor/MentorBaseForm";
import styled from "styled-components";
import FormColumn from "../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../common/FormRow/FormRow";
import Icon from "../../../../../common/Icon/Icon";
import colors from "../../../../../common/MentorColor";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import { Body1, Subhead1 } from "../../../../../common/MentorText";
import MentorFormBaseContext, { IMentorFormBaseContext } from "../../../MentorFormBase/MentorFormBase.context";
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

interface IPropsFormAwards {
    isEdit?: boolean;
    forceDisable?: boolean;
}
interface IStateAwards{
    hasData?:boolean;
}

class AwardsInfo extends React.Component <IPropsFormAwards,IStateAwards> {
    public state : IStateAwards;
    constructor(props: IPropsFormAwards) {
        super(props);
        this.renderAwards = this.renderAwards.bind(this);
        this.state = {
            hasData: true
        };
    }

    public render() {
        return (
            <MentorFormBaseContext.Consumer>
                {(context: IMentorFormBaseContext, ) => {
                    const addNew =()=>{
                        this.setState({hasData: true});
                    }
                    return (
                        <>
                        <span style={{color:'#1ECD96',fontWeight:700,fontSize:'18px',paddingTop:'10px',display:'flex'}}>DESTACADOS</span>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <span style={{fontFamily:'Mulish',paddingBottom:'9px'}}>Mencione tus ponencias, reconocimientos u otros destacados</span>
                            {!this.state.hasData &&
                                <OptionsHandler>
                                <button onClick={addNew} type={"button"}>
                                    <Icon name={"add-circle"}/><Body1>Agregar dato</Body1>
                                </button>
                            </OptionsHandler> }
                        </div>
                        {this.state.hasData && 
                                <FieldArray
                                name="awards"
                                render={this.renderAwards(context)}/>
                            }
                        </>
                    )
                }}
            </MentorFormBaseContext.Consumer>
        )
    }

    private renderAwards(ctxt: IMentorFormBaseContext) {
        let counter = 0;
        const awards = !!ctxt.values.awards ? ctxt.values.awards : [] as IMentorAwardsInfo[];
        return (arrayHelpers: ArrayHelpers) => {
            const addNewEducation = () => {
                arrayHelpers.push({ description: '' });
            };
            const removeExperience = (index: number) => {
                return () => {
                    arrayHelpers.remove(index);
                    if(index === 0 && awards.length <=1){
                        this.setState({hasData: false})
                        ctxt.setFieldValue(`awards[0]`, { description: '' });
                    }
                }
            };
            if (awards.length<1){
                arrayHelpers.push({ description: '' })
            }
            return awards.map((valueInfo: IMentorAwardsInfo, index: number) => {
                return (
                    <EducationItem key={index} className={'AwardsItem'}>
                        <FormRow style={{ paddingBottom: '30px', margin: 0 }} columns={[
                            <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                                <MentorInput
                                    label={"Nombre"}
                                    disabled={!!this.props.forceDisable}
                                    attrs={{
                                        maxLength: 150,
                                        name: `awards[${index}].description`,
                                        onBlur: ctxt.handleBlur,
                                        onChange: ctxt.handleChange,
                                        placeholder: "",
                                        value: valueInfo? valueInfo.description: '' }}/>
                            </FormColumn>
                        ]} />
                        <OptionsHandler>
                            <button disabled={!!this.props.forceDisable} onClick={removeExperience(index)} type={"button"}>
                                <Icon name={"trash"}/><Body1>Eliminar</Body1>
                            </button>
                            {awards.length === index + 1 &&
                            <button  disabled={!!this.props.forceDisable} onClick={addNewEducation} type={"button"}>
                                <Icon name={"add-circle"}/><Body1>Agregar destacado</Body1>
                            </button>}
                        </OptionsHandler>
                    </EducationItem>
                )}
            )
        }
    }
}

export default AwardsInfo;
