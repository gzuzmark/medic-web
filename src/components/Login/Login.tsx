import { Formik } from 'formik';
import * as React from 'react';
import ErrorsMessage from "../../common/ErrorsMessage";
import { IUserInput } from '../../interfaces/User.interface';
import UserRepository from "../../repository/UserRepository";
import AuthService from '../../services/Auth/Auth.service';
import { schema } from './components/LoginForm.validation';
import LoginForm, {ROL_ADMIN} from './components/LoginForm/LoginForm';
import LoginPresentation from './components/LoginPresentation/LoginPresentation';

interface IStateLoginForm {
    buttonAttr: any;
    error: string;
    isLogin: boolean;
}

type typeSetSubmitting = (isSubmitting: boolean) => void;
type typeSetFieldError = (field: string, errorMsg: string) => void;

class Login extends React.Component <{}, IStateLoginForm> {
    public state: IStateLoginForm;
    private userService: AuthService;
    constructor(props: any) {
        super(props);
        this._renderForm = this._renderForm.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this.cleanError = this.cleanError.bind(this);
        this.showDefaultError = this.showDefaultError.bind(this);
        this._errorLogin = this._errorLogin.bind(this);
        this.userService = new AuthService();
        this.state = {
            buttonAttr: {},
            error: '',
            isLogin: false
        };
    }

    public componentDidMount() {
        if (UserRepository.getToken() && UserRepository.getUser()) {
            this.setState({isLogin: true});
            window.location.assign('/admin');
        } else {
            this.setState({isLogin: false});
            UserRepository.setUser('');
            UserRepository.setToken('');
        }
    }

    public render() {
        return (
            !(UserRepository.getToken() && UserRepository.getUser()) &&
            <LoginPresentation>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={schema}
                    validateOnBlur={false}
                    onSubmit={this._onSubmit}
                    render={this._renderForm}
                />
            </LoginPresentation>
        );
    }

    private _onSubmit(values: IUserInput, actions: any) {
        if (!!this.state.buttonAttr && !!this.state.buttonAttr.loading) {
            return
        }
        this.setState({buttonAttr: {loading: "true"}, error: ''});
        const checkbox: HTMLInputElement = document.querySelector(".LoginForm_rol input[type=radio]:checked") as HTMLInputElement;
        const redirection = checkbox.value === ROL_ADMIN ? '/admin' : '/mentor';
        this.userService.login(values, checkbox.value )
            .then((response) => {
                if (response) {
                    this.userService.setTokenHeader();
                    this.userService.loadUser(checkbox.value).then(() => {
                        if (response) {
                            window.location.assign(redirection);
                        } else {
                            this.showDefaultError(actions);
                        }
                    });
                } else {
                    this.showDefaultError(actions);
                }
            })
            .catch((error) => {
                const {code, appCode} = error.response.data;
                if (code === 400 && !!appCode) {
                    const message = ErrorsMessage[appCode.toString()];
                    if (!!message) {
                        if (appCode === 40005) {
                            this.setState({ buttonAttr: {} });
                            actions.setFieldError('username', message);
                            actions.setFieldError('password', message);
                        } else {
                            this.setState({error: message, buttonAttr: {}});
                        }
                    } else {
                        this.showDefaultError(actions);
                    }
                } else {
                    this.showDefaultError(actions);
                }
            });
    }

    private showDefaultError(actions: any) {
        this._errorLogin(
            actions.setSubmitting,
            actions.setFieldError,
            ErrorsMessage["40005"]);
    }

    private cleanError() {
        this.setState({error: ''});
    }

    private _errorLogin(setSubmitting: typeSetSubmitting, setFieldError: typeSetFieldError, message: string) {
        this.setState({buttonAttr: {}});
        setFieldError('username', message);
        setFieldError('password', message);
        setSubmitting(false);
    }

    private _renderForm (props: any) {
        return <LoginForm {...props}
                          buttonAttr={this.state.buttonAttr}
                          generalError={this.state.error}
                          cleanError={this.cleanError}  />;
    }
}

export default Login;
