import * as React from "react";
import {ButtonNormal} from "../../../../../common/Buttons/Buttons";
import {IMentorFormValidations} from "../../../../../domain/Mentor/MentorBaseForm";
import FormExperience from "../../../MentorFormBase/components/FormExperience/FormExperience";
import FormImage from "../../../MentorFormBase/components/FormImage/FormImage";
import FormPersonalData from "../../../MentorFormBase/components/FormPersonalData/FormPersonalData";
import FormProfile from "../../../MentorFormBase/components/FormProfile/FormProfile";
import {
    IFormManagerDisabledFields,
    IFormManagerInfoFields
} from "../../../MentorFormCreate/components/FormManager/FormManager";
import {formTemplateHOC} from "../../../MentorFormCreate/components/FormManager/FormTemplateHOC";

interface IPropsFormManager {
    formData: {
        errors: any;
        touched: any;
        values: IMentorFormValidations;
    }
    onHandleSubmit: (e: any) => void;
}

interface IStateFormManager {
    disabledFields: IFormManagerDisabledFields;
    infoFields: IFormManagerInfoFields;
    modal: boolean;
}

const FormPersonalDataTemplate = formTemplateHOC(FormPersonalData);
const FormProfileTemplate = formTemplateHOC(FormProfile);
const FormExperienceTemplate = formTemplateHOC(FormExperience);

class FormManager extends React.Component <IPropsFormManager, IStateFormManager> {
    public state: IStateFormManager;
    constructor(props: IPropsFormManager) {
        super(props);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.state = {
            disabledFields: {
                document: true,
                documentType: true,
                firstName: true,
                lastName: true
            },
            infoFields: {
                document: "Estos datos no podrán cambiarse",
                documentType: "Estos datos no podrán cambiarse",
                firstName: "Estos datos no podrán cambiarse",
                lastName: "Estos datos no podrán cambiarse"
            },
            modal: false
        }
    }
    public render() {
        return (
            <React.Fragment>
                <FormImage id={"FormImageEdit"}/>
                <FormPersonalDataTemplate disableFields={this.state.disabledFields} infoFields={this.state.infoFields} />
                <FormProfileTemplate/>
                <FormExperienceTemplate/>
                <ButtonNormal text={"Guardar Cambios"}
                              attrs={{
                                  onClick: this.onHandleSubmit,
                                  style: {margin : '40px 0 0 auto'}}}/>
            </React.Fragment>
        )
    }

    private onHandleSubmit() {
        this.props.onHandleSubmit(this.props.formData.values)
    }
}

export default FormManager;
