import * as React from "react";
import styled from "styled-components";
import {ButtonNormal} from "../../../../../common/Buttons/Buttons";
import ContentModal, {IGenericContentModal} from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import {FONTS} from "../../../../../common/MentorColor";
import { Heading2 } from '../../../../../common/MentorText';
import {IMentorFormValidations} from "../../../../../domain/Mentor/MentorBaseForm";
import FormExperience from "../../../../Admin/MentorFormBase/components/FormExperience/FormExperience";
import getExperiencesWithError from "../../../../Admin/MentorFormBase/components/FormExperience/ValidateExperiences";
import FormImage from "../../../../Admin/MentorFormBase/components/FormImage/FormImage";
import FormProfile from "../../../../Admin/MentorFormBase/components/FormProfile/FormProfile";
import {formTemplateHOC} from "../../../../Admin/MentorFormBase/components/FormTemplate/FormTemplateHOC";
import {limitDescription} from "../../../../Admin/MentorFormBase/MentorFormBase.validations";
import MentorRating from "../../../components/MentorRating/MentorRating";

export interface IPropsFormEditManager {
    formData: {
        errors: any;
        touched: any;
        values: IMentorFormValidations;
    },
    onHandleSubmit: (e: any) => void;
    validateForm: () => void;
}

interface IStateFormEditManager {
    modal: boolean;
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

class FormEditManager extends React.Component <IPropsFormEditManager, IStateFormEditManager> {
    public state: IStateFormEditManager;
    private warningContent: IGenericContentModal;
    private buttonAttrUpdate: any;
    constructor(props: IPropsFormEditManager) {
        super(props);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            modal: false
        };
        this.buttonAttrUpdate = {
            onClick: this.openModal,
            style: {margin : '40px 0 0 auto'},
            type: "button"};
        this.warningContent = {
            button: "Aceptar",
            description: "Los cambios que realices se guardarán en el perfil del mentor.",
            image: <Icon name={'alert'} />,
            title: "¿Estás seguro que deseas guardar los cambios?"
        }

    }

    public componentDidMount() {
        this.props.validateForm();
    }

    public render() {
        const {errors, values} = this.props.formData;
        let buttonAttrUpdate = {...this.buttonAttrUpdate};
        const experiencesStatus = getExperiencesWithError(values.experiences, errors);
        if (values.description && values.description.length > limitDescription) {
            buttonAttrUpdate = {...buttonAttrUpdate, disabled: true};
        } else if (experiencesStatus.some(error => !!error)) {
            buttonAttrUpdate = {...buttonAttrUpdate, disabled: true};
        }else if (experiencesStatus.length < values.experiences.length && values.experiences.length > 1 ) {
            buttonAttrUpdate = {...buttonAttrUpdate, disabled: true};
        }
        return (
            <React.Fragment>
                <MentorModalBase show={this.state.modal} onCloseModal={this.closeModal}>
                    <ContentModal.Generic generic={this.warningContent} loading={false} confirm={this.onHandleSubmit} />
                </MentorModalBase>
                <FormImageColumn id={"FormImageProfileEdit"} forceDisable={false} size={88}>
                    <BasicData>
                        <Heading2 color={FONTS.purple} style={{margin: '40px 0 10px 0'}}>Mario Augusto Benedetti de las Casas Montalván</Heading2>
                        <MentorRating count={1} average={4.5}/>
                    </BasicData>
                </FormImageColumn>
                <FormProfileTemplate
                    titleForm={"Datos de perfil"}
                    isEdit={true} />
                <FormExperienceTemplate
                    titleForm={"Otras experiencias laborales"}
                    isEdit={true} />

                <ButtonNormal text={"Guardar Cambios"}
                              attrs={...buttonAttrUpdate}/>
            </React.Fragment>
        )
    }

    private onHandleSubmit() {
        this.closeModal();
        this.props.onHandleSubmit(this.props.formData.values)
    }

    private openModal() {
        this.setState({modal: true})
    }

    private closeModal() {
        this.setState({modal: false})
    }
}

export default FormEditManager;
