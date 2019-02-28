import * as React from "react";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import MentorTextArea from "../../../../../common/MentorTextArea/MentorTextArea";
import FormColumn from "../../../ScheduleSession/components/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../ScheduleSession/components/FormRow/FormRow";
import MentorFormBaseContext, {IMentorFormBaseContext} from "../../MentorFormBase.context";
import {limitDescription} from "../../MentorFormBase.validations";
import getBorderColor from "../FormTemplate/FormTemplateField";

export interface IPropsFormProfile {
    isEdit?: boolean;
    forceDisable?: boolean;
}

class FormProfile extends React.Component <IPropsFormProfile, {}> {
    constructor(props: IPropsFormProfile) {
        super(props);
    }

    public render() {
        let counter = 0;
        return (
            <MentorFormBaseContext.Consumer>
                {(context: IMentorFormBaseContext) => {
                    const {errors, touched, values} = context;
                    const isEdit = !!this.props.isEdit;
                    return (
                        <React.Fragment>
                            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                                <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorTextArea
                                        limit={limitDescription}
                                        disabled={!!this.props.forceDisable}
                                        label={"Descripción del mentor"}
                                        info={"Este mensaje debe ser corto, <br> inspirador y conciso."}
                                        attrs={{
                                            name: "description",
                                            onBlur: context.handleBlur,
                                            onChange: context.handleChange,
                                            placeholder: "Ingresa una descripción para el mentor. Por ejemplo: ¡Hola! Soy Fabbian y mi objetivo es ser tu mejor compañero de estudios fuera de clase, conmigo podrás resolver tus dudas acerca de los cursos de química.",
                                            style: {height: 112, borderColor: getBorderColor(values.description, isEdit)},
                                            value: context.values.description
                                        }} />
                                </FormColumn>
                            ]}/>
                            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorInput
                                        label={"CARGO"}
                                        error={touched.currentPosition && errors.currentPosition}
                                        disabled={!!this.props.forceDisable}
                                        attrs={{
                                            maxLength: 150,
                                            name: "currentPosition",
                                            onBlur: context.handleBlur,
                                            onChange: context.handleChange,
                                            placeholder: "Ingresa su cargo actual",
                                            style: {borderColor: getBorderColor(values.currentPosition, isEdit)},
                                            value: context.values.currentPosition}}/>
                                </FormColumn>,
                                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                                    <MentorInput
                                        label={"EMPRESA ACTUAL"}
                                        error={touched.currentCompany && errors.currentCompany}
                                        disabled={!!this.props.forceDisable}
                                        attrs={{
                                            maxLength: 150,
                                            name: "currentCompany",
                                            onBlur: context.handleBlur,
                                            onChange: context.handleChange,
                                            placeholder: "Ingresa el nombre de la empresa",
                                            style: {borderColor: getBorderColor(values.currentCompany, isEdit)},
                                            value: context.values.currentCompany}}/>
                                </FormColumn>
                            ]}/>
                        </React.Fragment>
                    )
                }}
            </MentorFormBaseContext.Consumer>
        )
    }
}

export default FormProfile;
