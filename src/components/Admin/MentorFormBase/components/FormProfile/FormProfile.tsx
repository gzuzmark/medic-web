// tslint:disable:no-console
import * as React from "react";
import FormColumn from "../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../common/FormRow/FormRow";
import LayoutContext from "../../../../../common/Layout/Layout.context";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import MentorTextArea from "../../../../../common/MentorTextArea/MentorTextArea";
import { ROL_MENTOR } from "../../../../../repository/UserRepository";
import MentorFormBaseContext from "../../MentorFormBase.context";
import { limitDescription } from "../../MentorFormBase.validations";
import getBorderColor from "../FormTemplate/FormTemplateField";

export interface IPropsFormProfile {
    isEdit?: boolean;
    forceDisable?: boolean;
}

const FormProfile: React.FC<IPropsFormProfile> = (props) => {
    const { errors, touched, values, handleBlur, handleChange } = React.useContext(MentorFormBaseContext);
    const { user } = React.useContext(LayoutContext);
    const isEdit = !!props.isEdit;
    let counter = 0;
    
    return (
        <React.Fragment>
            {user.rol === ROL_MENTOR && (
                <FormRow style={{ padding: '30px 0 40px 0', margin: 0 }} columns={[
                    <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                        <MentorTextArea
                            disabled={!!props.forceDisable}
                            label='Acerca de mi'
                            info='Breve descripción propia.'
                            attrs={{
                                name: 'about_me',
                                onBlur: handleBlur,
                                onChange: handleChange,
                                placeholder: 'Ingrese una breve descripción propia',
                                style: { height: 112, borderColor: getBorderColor(values.about_me, isEdit) },
                                value: values.about_me
                            }} />
                    </FormColumn>
                ]} />
            )}
            {user.rol === ROL_MENTOR && (
                <FormRow style={{ padding: '30px 0 40px 0', margin: 0 }} columns={[
                    <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                        <MentorTextArea
                            disabled={!!props.forceDisable}
                            label='Formación'
                            info='Información sobre formación.'
                            attrs={{
                                name: 'formation',
                                onBlur: handleBlur,
                                onChange: handleChange,
                                placeholder: 'Ingrese información sobre su formación académica',
                                style: { height: 112, borderColor: getBorderColor(values.formation, isEdit) },
                                value: values.formation
                            }} />
                    </FormColumn>
                ]} />
            )}
            <FormRow style={{ padding: '30px 0 40px 0', margin: 0 }} columns={[
                <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorTextArea
                        limit={limitDescription}
                        disabled={!!props.forceDisable}
                        label={user.rol === ROL_MENTOR ? "CMP" : "Datos adicionales del doctor"}
                        info={"Este mensaje debe ser corto, <br> inspirador y conciso."}
                        attrs={{
                            name: "description",
                            onBlur: handleBlur,
                            onChange: handleChange,
                            placeholder: "Ingresa una descripción para el doctor. Por ejemplo: ¡Hola! Soy Fabbian y mi objetivo es ser tu mejor compañero de estudios fuera de clase, conmigo podrás resolver tus dudas acerca de los cursos de química.",
                            style: { height: 112, borderColor: getBorderColor(values.description, isEdit) },
                            value: values.description
                        }} />
                </FormColumn>
            ]} />
            <FormRow style={{ padding: '0 0 40px 0', margin: 0 }} columns={[
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                <MentorInput
                    label={"Número de colegiatura"}
                    info={"El número de colegiatura debe ser de, <br> entre 4 y 8 digitos"}                                        
                    disabled={!!props.forceDisable}     
                    error={touched.medicCollegeNumber && errors.medicCollegeNumber}               
                    attrs={{
                        name: "medicCollegeNumber",
                        onBlur: handleBlur,                            
                        onChange: handleChange,
                        placeholder: "Ejemplo: 088569, 4564",
                        value: values.medicCollegeNumber
                        }}/>
            </FormColumn>
            ]} />
            <FormRow style={{ padding: '30px 0 40px 0', margin: 0 }} columns={[
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorInput
                        label={"CARGO"}
                        error={touched.currentPosition && errors.currentPosition}
                        disabled={!!props.forceDisable}
                        attrs={{
                            maxLength: 150,
                            name: "currentPosition",
                            onBlur: handleBlur,
                            onChange: handleChange,
                            placeholder: "Ingresa su cargo actual",
                            style: { borderColor: getBorderColor(values.currentPosition, isEdit) },
                            value: values.currentPosition
                        }} />
                </FormColumn>,
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorInput
                        label={"CENTRO LABORAL ACTUAL"}
                        error={touched.currentCompany && errors.currentCompany}
                        disabled={!!props.forceDisable}
                        attrs={{
                            maxLength: 150,
                            name: "currentCompany",
                            onBlur: handleBlur,
                            onChange: handleChange,
                            placeholder: "Ingresa el nombre del centro laboral",
                            style: { borderColor: getBorderColor(values.currentCompany, isEdit) },
                            value: values.currentCompany
                        }} />
                </FormColumn>
            ]} />
        </React.Fragment>
    )
};
export default FormProfile;
