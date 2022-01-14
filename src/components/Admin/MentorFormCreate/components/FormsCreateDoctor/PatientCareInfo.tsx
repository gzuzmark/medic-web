// tslint:disable:no-console
import * as React from "react";
import FormColumn from "../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../common/FormRow/FormRow";
import MentorFormBaseContext, { IMentorFormBaseContext } from "../../../MentorFormBase/MentorFormBase.context";
import MentorInput from "src/common/MentorInput/MentorInput";
import MentorCheckbox from "src/common/MentorCheckbox/MentorCheckbox";

export interface IPatientCareInfo {
    isEdit?: boolean;
    forceDisable?: boolean;
}

const PatientCareInfo: React.FC<IPatientCareInfo> = (props) => {
    const {values, handleBlur, handleChange,touched,errors } = React.useContext(MentorFormBaseContext);
    const context = React.useContext(MentorFormBaseContext);
    let counter = 0;
    
    const selectMenor =  (cont:IMentorFormBaseContext)=>{
        return (e: any) => {
            if (e.target.checked) {
                cont.setFieldValue('menorUnAnio', 1);
                // cont.handleChange(e);
            }else if (!e.target.checked){
                cont.setFieldValue('menorUnAnio', 0);
            }
        }
    }
    const selectTerEdad =  (cont:IMentorFormBaseContext)=>{
        return (e: any) => {
            if (e.target.checked) {
                cont.setFieldValue('terceraEdad', 1);
                // cont.handleChange(e);
            }else if (!e.target.checked){
                cont.setFieldValue('terceraEdad', 0);
            }
        }
    }
    return (
        <React.Fragment>
            <div style={{ padding: '20px 0', margin: 0 }} >
            <span style={{color:'#1ECD96',fontWeight:700,fontSize:'18px'}}>EDAD DE ATENCIÓN DE LOS PACIENTES</span>
            </div>
            <FormRow style={{ paddingBottom: '30px', margin: 0 }} columns={[
                <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                    <FormRow  columns={[
                    <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                        <span style={{fontFamily: 'Mulish',fontWeight:600}}>Pacientes a partir de *</span>
                    </FormColumn>,
                    <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                        <MentorInput
                            disabled={!!props.forceDisable}
                            error={touched.patientAgeFrom && errors.patientAgeFrom}
                            attrs={{
                                maxLength: 20,
                                name: "patientAgeFrom",
                                onBlur: handleBlur, 
                                onChange: handleChange,
                                placeholder: "1 Año",
                                value: values.patientAgeFrom}}/>
                        <MentorCheckbox
                                    text={"Menor a un año"}
                                    disabled={!!props.forceDisable}
                                    attr={{
                                        checked: values.menorUnAnio === 0 ? false : true,
                                        name: `menorUnAnio`,
                                        onChange: selectMenor(context)
                                    }}/>
                    </FormColumn>]}/>
                </FormColumn>,
                <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                    <FormRow  columns={[
                        <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`} style={{alignItems:'end'}}>
                            <span style={{fontFamily: 'Mulish',fontWeight:600}}>Hasta</span>
                        </FormColumn>,
                        <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                            <MentorInput
                                disabled={!!props.forceDisable}
                                error={touched.patientAgeTo && errors.patientAgeTo}
                                attrs={{
                                    maxLength: 2,
                                    name: "patientAgeTo",
                                    onBlur: handleBlur,
                                    onChange: handleChange,
                                    placeholder: "18 Años",
                                    value: values.patientAgeTo}}/>
                            <MentorCheckbox
                                    text={"Actualmente estudia aquí"}
                                    disabled={!!props.forceDisable}
                                    attr={{
                                        checked: values.terceraEdad === 0 ? false : true,
                                        name: `terceraEdad`,
                                        onBlur: context.handleBlur,
                                        onChange: selectTerEdad(context)
                                    }}/>
                        </FormColumn>
                    ]}/>
            </FormColumn>
            ]} />
        </React.Fragment>
    )
};
export default PatientCareInfo;
