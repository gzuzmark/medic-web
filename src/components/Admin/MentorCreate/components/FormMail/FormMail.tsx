import * as React from "react";
import colors from "../../../../../common/MentorColor";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import {IMentorBean} from "../../../../../domain/Mentor/MentorBean";
import {emailStatus} from "../../../../../domain/Mentor/MentorCreate";
import MentorService from "../../../../../services/Mentor/Mentor.service";
import MentorCreateContext, {IMentorCreateContext} from "../../MentorCreate.context";
import {IFormManagerDisabledFields} from "../FormManager/FormManager";

interface IStateFormMail {
    loading: boolean;
}

interface IPropsFormMail {
    updateDisabledFields: (fields: IFormManagerDisabledFields) => void;
}

class FormMail extends React.Component <IPropsFormMail, IStateFormMail> {
    public state: IStateFormMail;
    private mentorService: MentorService;
    private timer: any = 0;
    constructor(props: IPropsFormMail) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.verifyMentor = this.verifyMentor.bind(this);
        this.getStatusEmail = this.getStatusEmail.bind(this);
        this.fillMentorData = this.fillMentorData.bind(this);
        this.updateStatusEmailValidation = this.updateStatusEmailValidation.bind(this);
        this.cleanMentorData = this.cleanMentorData.bind(this);
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
                    const errorValidation = touched.validation && statusEmail;
                    const loadSuccess = touched.email && !this.state.loading && !errorEmail && !errorValidation;
                    return (
                        <React.Fragment>
                            <MentorInput
                                label={"CORREO"}
                                error={errorEmail || errorValidation}
                                loading={this.state.loading}
                                icon={loadSuccess ? 'check' : ''}
                                iconStyles={{fill: colors.MISC_COLORS.green}}
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
        this.props.updateDisabledFields({
            document: !!value && !!value.document && !!value.document.trim(),
            documentType: !!value && !!value.documentType && !!value.documentType.trim(),
            firstName: !!value && !!value.name && !!value.name.trim(),
            lastName: !!value && !!value.lastname && !!value.lastname.trim()
        })
    }

    private cleanMentorData(context: IMentorCreateContext) {
        context.setFieldValue("validation", emailStatus.CLEAN);
        context.setFieldValue("documentType", {value: ''});
        context.setFieldTouched("documentType", false);
        context.setFieldValue("document", '');
        context.setFieldTouched("document", false);
        context.setFieldValue("lastName", '');
        context.setFieldTouched("lastName", false);
        context.setFieldValue("firstName", '');
        context.setFieldTouched("firstName", false);
        context.setFieldValue("picture", '');
        context.setFieldTouched("picture", false);
        this.props.updateDisabledFields({
            document: false,
            documentType: false,
            firstName: false,
            lastName: false
        })
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
            this.setState({loading: false});
            this.fillMentorData(mentor, context);
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
            this.cleanMentorData(context);
            this.setState({loading: false});
            clearTimeout(this.timer);
            if (e.target.value.includes("@")) {
                context.setFieldTouched("email");
                context.setFieldTouched("validation");
                this.timer = setTimeout(() => {
                    this.setState({loading: true}, () => {
                        this.verifyMentor(e.target.value.trim(), context);
                    });
                }, 250);
            }
        }
    }
}

export default FormMail;
