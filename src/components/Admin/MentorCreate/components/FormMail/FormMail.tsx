import * as React from "react";
import MentorInput from "../../../../../common/MentorInput/MentorInput";

interface IStateFormMail {
    submitText: string;
}

interface IPropsFormMail {
    currentStep?: number;
}
class FormMail extends React.Component <IPropsFormMail, IStateFormMail> {
    public state: IStateFormMail;
    constructor(props: IPropsFormMail) {
        super(props);
        this.state = {
            submitText: "Continuar"
        }
    }

    public render() {
        return (
            <React.Fragment>
                <MentorInput
                    label={"CORREO"}
                    attrs={{placeholder: "Ingresa el correo UTP del mentor o crea un nuevo correo"}}
                    styleContainer={{padding: '30px 65px'}}/>
            </React.Fragment>
        )
    }
}

export default FormMail;
