import { Formik } from 'formik';
import * as React from 'react';
import { IUserInput } from '../../interfaces/User.interface';
import UserRepository from "../../repository/UserRepository";
import AuthService from '../../services/Auth/Auth.service';
import { schema } from './components/LoginForm.validation';
import LoginForm from './components/LoginForm/LoginForm';
import LoginPresentation from './components/LoginPresentation/LoginPresentation';

interface IStateLoginForm {
    buttonAttr: any;
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
        this._errorLogin = this._errorLogin.bind(this);
        this.userService = new AuthService();
        this.state = {
            buttonAttr: {},
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
                    onSubmit={this._onSubmit}
                    render={this._renderForm}
                />
            </LoginPresentation>
        );
    }

    private _onSubmit(values: IUserInput, actions: any) {
        this.setState({buttonAttr: {disabled: true, loading: true}});
        this.userService.login(values)
            .then((response) => {
                if (response) {
                    this.userService.setTokenHeader();
                    this.userService.loadUser().then(() => {
                        if (response) {
                            window.location.assign('/admin');
                        } else {
                            this._errorLogin(
                                actions.setSubmitting,
                                actions.setFieldError,
                                'Usuario no activado');
                        }
                    });
                } else {
                    this._errorLogin(
                        actions.setSubmitting,
                        actions.setFieldError,
                        'Correo y/o contraseña incorrectos.');
                }
            })
            .catch(() => {
                this._errorLogin(
                    actions.setSubmitting,
                    actions.setFieldError,
                    'Correo y/o contraseña incorrectos.');
            });
    }

    private _errorLogin(setSubmitting: typeSetSubmitting, setFieldError: typeSetFieldError, message: string) {
        this.setState({buttonAttr: {}});
        setSubmitting(false);
        setFieldError('password', message);
    }

    private _renderForm (props: any) {
        return <LoginForm {...props} buttonAttr={this.state.buttonAttr}/>;
    }
}

export default Login;
