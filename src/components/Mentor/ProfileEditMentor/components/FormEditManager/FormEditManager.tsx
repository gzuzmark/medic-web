import * as React from "react";
import { IFormManagerDisabledFields } from "src/components/Admin/MentorFormCreate/components/FormManager/FormManager";
import AwardsInfo from "src/components/Admin/MentorFormCreate/components/FormsCreateDoctor/AwardsInfo";
import DiagnosticsForm from "src/components/Admin/MentorFormCreate/components/FormsCreateDoctor/DiagnosticsForm";
import EducationDataForm from "src/components/Admin/MentorFormCreate/components/FormsCreateDoctor/EducationDataForm";
import ExperienceForm from "src/components/Admin/MentorFormCreate/components/FormsCreateDoctor/ExperienceForm";
import PatientCareInfo from "src/components/Admin/MentorFormCreate/components/FormsCreateDoctor/PatientCareInfo";
import PersonalDataForm from "src/components/Admin/MentorFormCreate/components/FormsCreateDoctor/PersonalDataForm";
import ProfessionalDataForm from "src/components/Admin/MentorFormCreate/components/FormsCreateDoctor/ProfessionalDataForm";
import ProfileDataForm from "src/components/Admin/MentorFormCreate/components/FormsCreateDoctor/ProfileDataForm";
import styled from "styled-components";
import {ButtonNormal} from "../../../../../common/Buttons/Buttons";
import ContentModal from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import {FONTS} from "../../../../../common/MentorColor";
import { Heading2 } from '../../../../../common/MentorText';
import {IMentorFormValidations} from "../../../../../domain/Mentor/MentorBaseForm";
import {IMentorRating} from "../../../../../domain/Mentor/MentorProfile";
import getExperiencesWithError from "../../../../Admin/MentorFormBase/components/FormExperience/ValidateExperiences";
import FormImage from "../../../../Admin/MentorFormBase/components/FormImage/FormImage";
import {formTemplateHOC} from "../../../../Admin/MentorFormBase/components/FormTemplate/FormTemplateHOC";
import MentorFormBaseContext from "../../../../Admin/MentorFormBase/MentorFormBase.context";
import {limitDescription} from "../../../../Admin/MentorFormBase/MentorFormBase.validations";
import MentorRating from "../../../components/MentorRating/MentorRating";

export interface IPropsFormEditManager {
    formData: {
        errors: any;
        touched: any;
        values: IMentorFormValidations | any;
    },
    onHandleSubmit: (e: any) => void;
    rating?: IMentorRating;
    validateForm: () => void;
}

const BasicData = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const FormImageColumn = styled(FormImage)`
    align-items: center;
    display: flex;
    flex-direction: column;
`;
const FormPersonalDataTemplate = formTemplateHOC(PersonalDataForm);
const FormProfileTemplate = formTemplateHOC(ProfessionalDataForm);
const FormPatientInfo = formTemplateHOC(DiagnosticsForm,PatientCareInfo);
const FormAboutMe = formTemplateHOC(ProfileDataForm);
const FormExperienceTemplate = formTemplateHOC(ExperienceForm);
const EducationInfo = formTemplateHOC(EducationDataForm,AwardsInfo);

const FormEditManager: React.FC<IPropsFormEditManager> = (props) => {
    const [modal, setModal] = React.useState(false);
    const [disabledFields,setDisabledFields] = React.useState<IFormManagerDisabledFields>
    ({document:false,documentType: false,
        firstName: false,
        lastName: false});
    const context = React.useContext(MentorFormBaseContext);
    const validateForm = props.validateForm;
    const openModal = () => setModal(true);
    
    const buttonAttrBase: any = {
        onClick: openModal,
        style: {margin : '40px 0 0 auto'},
        type: "button"};
    let buttonAttrUpdate = buttonAttrBase;
    const warningContent = {
        button: "Aceptar",
        description: "Los cambios que realices se guardarán en tu perfil.",
        image: <Icon name={'alert'} />,
        title: "¿Estás seguro que deseas guardar los cambios?"
    };

    React.useEffect(() => {
        validateForm();
        setDisabledFields({
            document: true,
            documentType: true,
            firstName: true,
            lastName: true
        })
    }, [0]);

    React.useEffect(() => {
        const {errors, values} = props.formData;
        buttonAttrUpdate = {...buttonAttrBase};
        const experiencesStatus = getExperiencesWithError(values.experiences, errors);
        if (values.description && values.description.length > limitDescription) {
            buttonAttrUpdate = {...buttonAttrUpdate, disabled: true};
        } else if (experiencesStatus.some(error => !!error)) {
            buttonAttrUpdate = {...buttonAttrUpdate, disabled: true};
        }else if (experiencesStatus.length < values.experiences.length && values.experiences.length > 1 ) {
            buttonAttrUpdate = {...buttonAttrUpdate, disabled: true};
        }
    }, [props.formData.values.experiences]);

    const onHandleSubmit = () => {
        closeModal();
        props.onHandleSubmit(props.formData.values)
    };

    const closeModal = () => setModal(false);
    const updateDisableFields = (disableFields: IFormManagerDisabledFields)=>{
        const newDisabledFields = {...disabledFields,email:true};
        return newDisabledFields;
    }
    return (
        <React.Fragment>
            <MentorModalBase show={modal} onCloseModal={closeModal}>
                <ContentModal.Generic generic={warningContent} loading={false} confirm={onHandleSubmit} />
            </MentorModalBase>
            <FormImageColumn id={"FormImageProfileEdit"} forceDisable={false} size={88} mentor={true}>
                <BasicData>
                    <Heading2 color={FONTS.green} style={{margin: '40px 0 10px 0'}}>
                        {context.values.firstName} {context.values.lastName}
                        </Heading2>
                    {props.rating && <MentorRating count={props.rating.count} average={props.rating.average}/>}
                </BasicData>
            </FormImageColumn>
            <FormPersonalDataTemplate
                    titleForm={"DATOS PERSONALES"}
                    disableFields={disabledFields}
                    isEdit={true}
                    forceDisable={true}
                    updateDisabledFields={updateDisableFields}
                    />
            <FormProfileTemplate
                titleForm={"DATOS DE OCUPACIÓN"}
                isEdit={true} />
            <FormPatientInfo isEdit={true}/>
            <FormAboutMe
                titleForm="SOBRE MI"
                isEdit={true}/>
            <FormExperienceTemplate
                isEdit={true} />
            <EducationInfo/>
            <ButtonNormal text={"Guardar Cambios"}
                          attrs={...buttonAttrUpdate}/>
        </React.Fragment>
    )
}

export default FormEditManager;
