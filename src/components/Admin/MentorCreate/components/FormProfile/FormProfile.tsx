import * as React from "react";
import styled from "styled-components";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import {Subhead1} from "../../../../../common/MentorText";
import MentorTextArea from "../../../../../common/MentorTextArea/MentorTextArea";
import FormColumn from "../../../ScheduleSession/components/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../ScheduleSession/components/FormRow/FormRow";
import MentorCreateContext, {IMentorCreateContext} from "../../MentorCreate.context";
import {limitDescription} from "../../MentorCreate.validations";

export const SubTitle = styled(Subhead1)`
    text-align: center;
`;

class FormProfile extends React.Component <{}, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        let counter = 0;
        return (
            <MentorCreateContext.Consumer>
                {(context: IMentorCreateContext) => {
                    const {errors, touched} = context;
                    return (
                        <React.Fragment>
                            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                                <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorTextArea
                                        limit={limitDescription}
                                        label={"Descripción del mentor"}
                                        info={"Este mensaje debe ser corto, <br> inspirador y conciso."}
                                        attrs={{
                                            name: "description",
                                            onBlur: context.handleBlur,
                                            onChange: context.handleChange,
                                            placeholder: "Ingresa una descripción para el mentor. Por ejemplo: ¡Hola! Tengo más de 10 años de experiencia como docente en diferentes universidades y estoy dispuesto a ayudarte.",
                                            style: {height: 112},
                                            value: context.values.description
                                        }} />
                                </FormColumn>
                            ]}/>
                            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorInput
                                        label={"CARGO"}
                                        error={touched.currentPosition && errors.currentPosition}
                                        attrs={{
                                            name: "currentPosition",
                                            onBlur: context.handleBlur,
                                            onChange: context.handleChange,
                                            placeholder: "Ingresa su cargo actual",
                                            value: context.values.currentPosition}}/>
                                </FormColumn>,
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorInput
                                        label={"EMPRESA ACTUAL"}
                                        error={touched.currentCompany && errors.currentCompany}
                                        attrs={{
                                            name: "currentCompany",
                                            onBlur: context.handleBlur,
                                            onChange: context.handleChange,
                                            placeholder: "Ingresa el nombre de la empresa",
                                            value: context.values.currentCompany}}/>
                                </FormColumn>
                            ]}/>
                        </React.Fragment>
                    )
                }}
            </MentorCreateContext.Consumer>
        )
    }
}

export default FormProfile;
