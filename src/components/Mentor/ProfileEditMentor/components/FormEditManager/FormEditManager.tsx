import * as React from "react";
import styled from "styled-components";
import {ButtonNormal} from "../../../../../common/Buttons/Buttons";
import ContentModal from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import {FONTS} from "../../../../../common/MentorColor";
import { Heading2 } from '../../../../../common/MentorText';
import {IMentorFormValidations} from "../../../../../domain/Mentor/MentorBaseForm";
import {IMentorRating} from "../../../../../domain/Mentor/MentorProfile";
import FormExperience from "../../../../Admin/MentorFormBase/components/FormExperience/FormExperience";
import getExperiencesWithError from "../../../../Admin/MentorFormBase/components/FormExperience/ValidateExperiences";
import FormImage from "../../../../Admin/MentorFormBase/components/FormImage/FormImage";
import FormProfile from "../../../../Admin/MentorFormBase/components/FormProfile/FormProfile";
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

const FormProfileTemplate = formTemplateHOC(FormProfile);
const FormExperienceTemplate = formTemplateHOC(FormExperience);

const FormEditManager: React.FC<IPropsFormEditManager> = (props) => {
    const [modal, setModal] = React.useState(false);
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
            <FormProfileTemplate
                titleForm={"Tu información de perfil"}
                isEdit={true} />
            <FormExperienceTemplate
                titleForm={"Otras experiencias laborales"}
                isEdit={true} />
            <ButtonNormal text={"Guardar Cambios"}
                          attrs={...buttonAttrUpdate}/>
        </React.Fragment>
    )
}

export default FormEditManager;
