// tslint:disable:no-console
import * as React from "react";
import FormColumn from "../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../common/FormRow/FormRow";
import MentorTextArea from "../../../../../common/MentorTextArea/MentorTextArea";
import MentorFormBaseContext from "../../../MentorFormBase/MentorFormBase.context";
import { limitDescription } from "../../../MentorFormBase/MentorFormBase.validations";
import getBorderColor from "../../../MentorFormBase/components/FormTemplate/FormTemplateField";

export interface IProfileData {
    isEdit?: boolean;
    forceDisable?: boolean;
}

const ProfileDataForm: React.FC<IProfileData> = (props) => {
    const {values, handleBlur, handleChange } = React.useContext(MentorFormBaseContext);
    const isEdit = !!props.isEdit;
    let counter = 0;
    
    return (
        <React.Fragment>
            {!isEdit &&(
            <div style={{ paddingTop: '20px', margin: 0 }} >
            <span style={{color:'#1ECD96',fontWeight:700,fontSize:'18px'}}>SOBRE EL ESPECIALISTA</span>
            </div>)}
            <FormRow style={{ paddingBottom: '30px', margin: 0, paddingTop:'20px' }} columns={[
                <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorTextArea
                        limit={limitDescription}
                        disabled={!!props.forceDisable}
                        label='¿Porqué elegió especializarse en esta carrera? ¿Qué le apasiona de su especialización?*'
                        attrs={{
                            name: "about_me",
                            onBlur: handleBlur,
                            onChange: handleChange,
                            placeholder: "",
                            style: { height: 112, borderColor: getBorderColor(values.about_me, isEdit) },
                            value: values.about_me
                        }} />
                </FormColumn>
            ]} />
        </React.Fragment>
    )
};
export default ProfileDataForm;
