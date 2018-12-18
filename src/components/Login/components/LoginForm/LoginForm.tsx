import * as React from 'react';
import { ButtonNormal } from '../../../../common/Buttons/Buttons';
import ConsoleInputRadio from "../../../../common/ConsoleInputRadio/ConsoleInputRadio";
import MentorInput from "../../../../common/MentorInput/MentorInput";
import {ROL_ADMIN, ROL_MENTOR} from "../../../../repository/UserRepository";
import InputError from "../InputError/InputError";
import './LoginForm.scss';

interface IPropsForm {
    handleSubmit: any;
    handleChange: any;
    handleBlur: any;
    values: any;
    errors: any;
    touched: any;
    buttonAttr: any;
    generalError: string;
    cleanError: any;
}

class LoginForm extends React.Component<IPropsForm, {}> {
    constructor(props: IPropsForm) {
        super(props);
    }

    public render() {
        return (
            <form className="LoginForm" onSubmit={this.props.handleSubmit}>
                <MentorInput
                    attrs={{
                        name: "username",
                        onBlur: this.props.handleBlur,
                        onChange: this.props.handleChange,
                        onInput: this.props.cleanError,
                        placeholder: "Ingresa tu correo"}}
                    error={(!!this.props.touched.username && !!this.props.errors.username) ? ' ' : '' }
                    label={"USUARIO"}
                    styleContainer={{marginBottom: 27}}/>
                <MentorInput
                    attrs={{
                        name: "password",
                        onBlur: this.props.handleBlur,
                        onChange: this.props.handleChange,
                        onInput: this.props.cleanError,
                        placeholder: "Ingresa tu contraseña",
                        type: 'password'}}
                    error={(!!this.props.touched.password && !!this.props.errors.password) ? ' ' : '' }
                    label={"CONTRASEÑA"}/>
                <InputError
                    error={(
                        (!!this.props.touched.password && !!this.props.errors.password) ||
                        (!!this.props.touched.username && !!this.props.errors.username)) ?
                        (this.props.errors.username || this.props.errors.password) : ''}
                    touched={!!this.props.touched.password || !!this.props.touched.username}/>
                <div className="LoginForm_rol">
                    <ConsoleInputRadio title='Mentor' attrs={{name:'rol', value: ROL_MENTOR, defaultChecked: true}}/>
                    <ConsoleInputRadio title='Administrador' attrs={{name:'rol', value: ROL_ADMIN}}/>
                </div>
                <InputError
                    error={this.props.generalError}
                    touched={!!this.props.generalError}/>
                <ButtonNormal text={"Ingresar"} attrs={{...this.props.buttonAttr, style: {marginTop: 20, marginBottom: 16}}}/>
            </form>
        );
    }
}

export default LoginForm;
