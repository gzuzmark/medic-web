import * as React from "react";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import {IMentorBean} from "../../../../../domain/Mentor/MentorBean";
import {emailStatus} from "../../../../../domain/Mentor/MentorCreate";
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
        this.verifyMentor = this.verifyMentor.bind(this);
        this.getStatusEmail = this.getStatusEmail.bind(this);
        this.fillMentorData = this.fillMentorData.bind(this);
        this.updateStatusEmailValidation = this.updateStatusEmailValidation.bind(this);
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
                    const statusEmail = this.getStatusEmail(values.validation);
                    const errorValidation =
                        touched.validation && statusEmail;
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

    private getStatusEmail(validation: string) {
        const alreadyRegistered = validation === emailStatus.ALREADY_REGISTERED && emailStatus.ALREADY_REGISTERED;
        const errorProcess = validation === emailStatus.ERROR_PROCESS && emailStatus.ERROR_PROCESS;
        return alreadyRegistered || errorProcess || '';
    }

    private fillMentorData(value: IMentorBean, context: IMentorCreateContext) {
        context.setFieldValue("validation", emailStatus.FULL_DATA);
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
    }

    private updateStatusEmailValidation(code: number, context: IMentorCreateContext) {
        if (code === 404) {
            context.setFieldValue("validation", emailStatus.NO_DATA);
        } else if (code === 409) {
            context.setFieldValue("validation", emailStatus.ALREADY_REGISTERED);
        } else if (code === 400) {
            context.setFieldValue("validation", emailStatus.EMAIL_NOT_VALID);
        } else if (code === 401) {
            context.setFieldValue("validation", emailStatus.ERROR_PROCESS);
        }
    }

    private verifyMentor(email: string, context: IMentorCreateContext) {
        this.mentorService.verify(email.trim()).then((mentor: IMentorBean) => {
            this.fillMentorData(mentor, context);
            this.setState({loading: false});
        }).catch((error) => {
            if (error.response && error.response.data) {
                this.setState({loading: false});
                this.updateStatusEmailValidation(error.response.data.code, context);
            }
        });
    }

    private onChange(context: IMentorCreateContext) {
        return (e: any) => {
            context.handleChange(e);
            context.setFieldValue("validation", emailStatus.CLEAN);
            this.setState({loading: false});
            clearTimeout(this.timer);
            if (e.target.value.includes("@")) {
                context.setFieldTouched("email");
                context.setFieldTouched("validation");
                this.timer = setTimeout(() => {
                    this.setState({loading: true}, () => {
                        this.verifyMentor(e.target.value.trim(), context);
                    });
                }, 500);
            }
        }
    }
}

export default FormMail;
