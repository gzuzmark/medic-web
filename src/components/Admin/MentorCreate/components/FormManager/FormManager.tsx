import * as React from "react";
import styled from "styled-components";
import FormExperience from "../FormExperience/FormExperience";
import FormImage from "../FormImage/FormImage";
import FormMail from "../FormMail/FormMail";
import FormPersonalData from "../FormPersonalData/FormPersonalData";
import FormProfile from "../FormProfile/FormProfile";
import FormReview from "../FormReview/FormReview";
import {formTemplateHOC} from "./FormTemplateHOC";

interface IStateFormManager {
    submitText: string;
}

interface IPropsFormManager {
    currentStep: number;
}

export const FormManagerContainer = styled.div`
    margin: 100px auto 80px auto;
    width: 874px;
`;

const FormMailTemplate = formTemplateHOC(FormMail);
const FormPersonalDataTemplate = formTemplateHOC(FormPersonalData);
const FormExperienceTemplate = formTemplateHOC(FormProfile, FormExperience);
const FormReviewTemplate = formTemplateHOC(FormReview);

class FormManager extends React.Component <IPropsFormManager, IStateFormManager> {
    public state: IStateFormManager;
    constructor(props: IPropsFormManager) {
        super(props);
        this.state = {
            submitText: "Continuar"
        }
    }

    public render() {
        return (
            <React.Fragment>
                {1 === this.props.currentStep &&
                    <FormManagerContainer>
                        <FormMailTemplate
                            title={"Para empezar, ingresa el correo del mentor"} />
                    </FormManagerContainer>}
                {2 === this.props.currentStep &&
                    <FormManagerContainer>
                        <FormPersonalDataTemplate
                            title={"Datos personales del mentor"}
                            subTitle={"Ingresa los datos del mentor que deseas agregar"} />
                    </FormManagerContainer>}
                {3 === this.props.currentStep &&
                <FormManagerContainer>
                    <FormExperienceTemplate
                        title={"Perfil del mentor"}
                        name={"Mario Augusto Benedetti de las Casas Montalván"}
                        subTitle={"Esta información será visible en el perfil del mentor"} >
                        <FormImage id={"fileImageUploader"}/>
                    </FormExperienceTemplate>
                </FormManagerContainer>}
                {4 === this.props.currentStep &&
                <FormManagerContainer>
                    <FormReviewTemplate
                        title={"Estás agregando al mentor"}
                        name={"Mario Augusto Benedetti de las Casas Montalván"}
                        subTitle={"Revisa la información que agregaste del mentor"} />
                </FormManagerContainer>}
                <FormManagerContainer
                    style={{display: 'flex', justifyContent: 'flex-end', margin: ' 0 auto'}}>
                    {this.props.children}
                </FormManagerContainer>
            </React.Fragment>
        )
    }
}

export default FormManager;
