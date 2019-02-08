import * as React from "react";
import styled from "styled-components";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import {Subhead1} from "../../../../../common/MentorText";
import {TextAreaComponent} from "../../../../Mentor/SessionsMentor/components/StudentCommentModal/StudentCommentModal";
import FormColumn from "../../../ScheduleSession/components/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../ScheduleSession/components/FormRow/FormRow";

interface IStateFormProfile {
    submitText: string;
}

interface IPropsFormProfile {
    currentStep?: number;
}

export const SubTitle = styled(Subhead1)`
    text-align: center;
`;

class FormProfile extends React.Component <IPropsFormProfile, IStateFormProfile> {
    public state: IStateFormProfile;
    constructor(props: IPropsFormProfile) {
        super(props);
        this.state = {
            submitText: "Continuar"
        }
    }

    public render() {
        let counter = 0;
        return (
            <div>
                <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                    <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                        <TextAreaComponent attrs={{placeholder: "Ingresa una descripción para el mentor. Por ejemplo: ¡Hola! Tengo más de 10 años de experiencia como \n" +
                            "docente en diferentes universidades y estoy dispuesto a ayudarte."}} />
                    </FormColumn>
                ]}/>
                <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                    <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                        <MentorInput
                            label={"CARGO"}
                            attrs={{placeholder: "Ingresa su cargo actual"}}/>
                    </FormColumn>,
                    <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                        <MentorInput
                            label={"EMPRESA ACTUAL"}
                            attrs={{placeholder: "Ingresa el nombre de la empresa"}}/>
                    </FormColumn>
                ]}/>
            </div>
        )
    }
}

export default FormProfile;
