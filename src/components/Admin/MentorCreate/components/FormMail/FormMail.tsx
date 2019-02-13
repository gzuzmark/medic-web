import * as React from "react";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import {IMentorBean} from "../../../../../domain/Mentor/MentorBean";
import MentorService from "../../../../../services/Mentor/Mentor.service";
import MentorCreateContext, {IMentorCreateContext} from "../../MentorCreate.context";

interface IStateFormMail {
    loading: boolean;
}

class FormMail extends React.Component <{}, IStateFormMail> {
    public state: IStateFormMail;
    private mentorService: MentorService;
    private timer: any = 0;
    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.mentorService = new MentorService();
        this.state = {
            loading: false
        }
    }

    public render() {
        return (
            <MentorCreateContext.Consumer>
                {(context: IMentorCreateContext) => {
                    const {errors, touched, values} = context;
                    const errorEmail = touched.email && errors.email;
                    const errorValidation = touched.validation && !values.validation && 'Hubo problemas al validar el correo' || '';
                    return (
                        <React.Fragment>
                            <MentorInput
                                label={"CORREO"}
                                error={errorEmail || errorValidation}
                                loading={this.state.loading}
                                attrs={{
                                    name: "email",
                                    onBlur: context.handleBlur,
                                    onChange: this.onChange(context),
                                    placeholder: "Ingresa el correo UTP del mentor o crea un nuevo correo",
                                    value: context.values.email
                                }}
                                styleContainer={{padding: '30px 65px'}}/>
                        </React.Fragment>
                    )
                }}
            </MentorCreateContext.Consumer>
        )
    }

    private onChange(context: IMentorCreateContext) {
        return (e: any) => {
            clearTimeout(this.timer);
            // todo: retirar setitimeout
            this.setState({loading: false});
            if (!context.errors.email && e.target.value.length > 3) {
                this.setState({loading: true});
                this.timer = setTimeout(() => {
                    this.mentorService.verify(e.target.value.trim()).then((value: IMentorBean) => {
                        context.setFieldValue("validation", true);
                        context.setFieldTouched("validation");
                        context.setFieldValue("documentType", {value: value.documentType});
                        context.setFieldTouched("documentType");
                        context.setFieldValue("document", value.document);
                        context.setFieldTouched("document");
                        context.setFieldValue("lastName", value.lastname);
                        context.setFieldTouched("lastName");
                        context.setFieldValue("firstName", value.name);
                        context.setFieldTouched("firstName");
                        context.setFieldValue("picture", value.photo);
                        context.setFieldTouched("picture");
                        this.setState({loading: false});
                    }).catch((error) => {
                        if (error.response && error.response.data && error.response.data.code === 409) {
                            context.setFieldValue("validation", true);
                            context.setFieldTouched("validation");
                        } else {
                            context.setFieldValue("validation", false);
                        }
                        this.setState({loading: false});
                    });
                }, 0);
            }
            context.handleChange(e);
        }
    }
}

export default FormMail;
