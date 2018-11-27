import * as React from 'react';
import { ButtonNormal } from '../../../../common/Buttons/Buttons';
import ConsoleInputRadio from "../../../../common/ConsoleInputRadio/ConsoleInputRadio";
import MentorInput from "../../../../common/MentorInput/MentorInput";
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
                        placeholder: "Ingresa tu usuario"}}
                    error={(this.props.touched.username && !!this.props.errors.username) ? ' ' : '' }
                    label={"USUARIO"}
                    styleContainer={{marginBottom: 27}}/>
                <MentorInput
                    attrs={{
                        name: "password",
                        onBlur: this.props.handleBlur,
                        onChange: this.props.handleChange,
                        placeholder: "Ingresa tu contraseña"}}
                    error={(this.props.touched.password && !!this.props.errors.password) ? ' ' : ''}
                    label={"CONTRASEÑA"}/>
                <InputError
                    error={this.props.errors.username || this.props.errors.password}
                    touched={this.props.touched.username || this.props.touched.password}/>
                <div className="LoginForm_rol">
                    <ConsoleInputRadio title='Mentor' name='rol' checked={true} value={'mentor'} onChange={this.props.handleChange}/>
                    <ConsoleInputRadio title='Administrador' name='rol' checked={true} value={'administrador'} onChange={this.props.handleChange}/>
                </div>
                <ButtonNormal text={"Ingresar"} attrs={{...this.props.buttonAttr, style: {marginTop: 20, marginBottom: 10}}}/>
            </form>
        );
    }
}

export default LoginForm;
