import * as React from "react";
import {ButtonNormal} from "../../../../../common/Buttons/Buttons";
import ContentModal, {IGenericContentModal} from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import {MENTOR_STATUS} from "../../../../../domain/Mentor/MentorBase";
import {IMentorFormValidations} from "../../../../../domain/Mentor/MentorBaseForm";
import FormExperience from "../../../MentorFormBase/components/FormExperience/FormExperience";
import getExperiencesWithError from "../../../MentorFormBase/components/FormExperience/ValidateExperiences";
import FormImage from "../../../MentorFormBase/components/FormImage/FormImage";
import FormPersonalData from "../../../MentorFormBase/components/FormPersonalData/FormPersonalData";
import FormProfile from "../../../MentorFormBase/components/FormProfile/FormProfile";
import {formTemplateHOC} from "../../../MentorFormBase/components/FormTemplate/FormTemplateHOC";
import {limitDescription} from "../../../MentorFormBase/MentorFormBase.validations";
import {
    IFormManagerDisabledFields,
    IFormManagerInfoFields
} from "../../../MentorFormCreate/components/FormManager/FormManager";
import UpdateStatus from "../UpdateStatus/UpdateStatus";

export interface IPropsFormManager {
    disablePersonalData: boolean;
    formData: {
        errors: any;
        touched: any;
        values: IMentorFormValidations;
    },
    mentor: {
        status: string;
        id: string;
    }
    onHandleSubmit: (e: any) => void;
    validateForm: () => void;
}

interface IStateFormManager {
    modal: boolean;
}

const FormPersonalDataTemplate = formTemplateHOC(FormPersonalData);
const FormProfileTemplate = formTemplateHOC(FormProfile);
const FormExperienceTemplate = formTemplateHOC(FormExperience);

class FormManager extends React.Component <IPropsFormManager, IStateFormManager> {
    public state: IStateFormManager;
    private warningContent: IGenericContentModal;
    private disabledFields: IFormManagerDisabledFields;
    private infoFields: IFormManagerInfoFields;
    private buttonAttrUpdate: any;
    private forceDisable: boolean;
    constructor(props: IPropsFormManager) {
        super(props);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.updateInfoFields = this.updateInfoFields.bind(this);
        this.updateDisableFields = this.updateDisableFields.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.initialDisabledFields = this.initialDisabledFields.bind(this);
        this.state = {
            modal: false
        };
        this.forceDisable = this.props.mentor.status === MENTOR_STATUS.DISABLED;
        this.buttonAttrUpdate = {
            onClick: this.openModal,
            style: {margin : '40px 0 0 auto'},
            type: "button"};
        this.disabledFields = {
            document: true,
            documentType: true,
            firstName: true,
            lastName: true
        };
        this.infoFields = {
            document: "",
            documentType: "",
            firstName: "",
            lastName: ""
        };
        this.warningContent = {
            button: "Aceptar",
            description: "Los cambios que realices se guardarán en el perfil del mentor.",
            image: <Icon name={'alert'} />,
            title: "¿Estás seguro que deseas guardar los cambios?"
        }

    }

    public componentDidMount() {
        this.initialDisabledFields();
        this.props.validateForm();
    }

    public render() {
        const {errors, values} = this.props.formData;
        let buttonAttrUpdate = {...this.buttonAttrUpdate};
        if (this.forceDisable) {
            buttonAttrUpdate = {...buttonAttrUpdate, disabled: true};
        } else if (!!errors.firstName) {
            buttonAttrUpdate = {...buttonAttrUpdate, disabled: true};
        } else if (!!errors.lastName) {
            buttonAttrUpdate = {...buttonAttrUpdate, disabled: true};
        } else if (!!errors.location) {
            buttonAttrUpdate = {...buttonAttrUpdate, disabled: true};
        } else if (!!errors.skills) {
            buttonAttrUpdate = {...buttonAttrUpdate, disabled: true};
        } else if (!!errors.contactNumber) {
            buttonAttrUpdate = {...buttonAttrUpdate, disabled: true};
        } else {
            const experiencesStatus = getExperiencesWithError(values.experiences, errors);
            if (values.description && values.description.length > limitDescription) {
                buttonAttrUpdate = {...buttonAttrUpdate, disabled: true};
            } else if (experiencesStatus.some(error => !!error)) {
                buttonAttrUpdate = {...buttonAttrUpdate, disabled: true};
            }else if (experiencesStatus.length < values.experiences.length && values.experiences.length > 1 ) {
                buttonAttrUpdate = {...buttonAttrUpdate, disabled: true};
            }
        }
        return (
            <React.Fragment>
                <MentorModalBase show={this.state.modal} onCloseModal={this.closeModal}>
                    <ContentModal.Generic generic={this.warningContent} loading={false} confirm={this.onHandleSubmit} />
                </MentorModalBase>
                <FormImage id={"FormImageEdit"}
                           forceDisable={this.forceDisable}
                           mentor={false}>
                    <UpdateStatus status={this.props.mentor.status} idMentor={this.props.mentor.id}/>
                </FormImage>
                <FormPersonalDataTemplate
                    titleForm={"Datos Personales"}
                    disableFields={this.disabledFields}
                    isEdit={true}
                    forceDisable={this.forceDisable}
                    infoFields={this.infoFields} />
                <FormProfileTemplate
                    titleForm={"Datos de perfil"}
                    forceDisable={this.forceDisable}
                    isEdit={true} />
                <FormExperienceTemplate
                    titleForm={"Otras experiencias laborales"}
                    forceDisable={this.forceDisable}
                    isEdit={true} />
                <ButtonNormal text={"Guardar Cambios"}
                              attrs={...buttonAttrUpdate}/>
            </React.Fragment>
        )
    }

    private initialDisabledFields() {
        const {utp} = this.props.formData.values;
        if (!utp) {
            this.disabledFields = this.updateDisableFields(this.props.formData.values);
        }
        this.infoFields = this.updateInfoFields(this.disabledFields);
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

    private updateInfoFields(disabledFields: IFormManagerDisabledFields) {
        const {firstName, lastName, documentType, document} = disabledFields;
        return {
            document: document && !this.forceDisable ? "Estos datos no podrán cambiarse" : "",
            documentType: documentType && !this.forceDisable ? "Estos datos no podrán cambiarse" : "",
            firstName: firstName && !this.forceDisable ? "Estos datos no podrán cambiarse" : "",
            lastName: lastName && !this.forceDisable ? "Estos datos no podrán cambiarse" : ""
        }
    }

    private updateDisableFields(values: IMentorFormValidations) {
        const {documentType, document} = values;
        const disabledFields = {...this.disabledFields};
        disabledFields.firstName = this.props.disablePersonalData;
        disabledFields.lastName = this.props.disablePersonalData;
        disabledFields.documentType = !!documentType && documentType.value.trim().length > 0;
        disabledFields.document = !!document && document.trim().length > 0;
        return disabledFields;
    }
}

export default FormManager;
