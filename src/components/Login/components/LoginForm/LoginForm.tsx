import * as React from 'react';
import { ButtonNormal } from '../../../../common/Buttons/Buttons';
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
                    label={"USUARIO"}/>
                <MentorInput
                    attrs={{
                        name: "password",
                        onBlur: this.props.handleBlur,
                        onChange: this.props.handleChange,
                        placeholder: "Ingresa tu contraseña"}}
                    error={(this.props.touched.password && !!this.props.errors.password) ? ' ' : ''}
                    label={"CONTRASEÑA"}/>
                {(!!this.props.errors.username || !!this.props.errors.password) &&
                    <InputError
                        error={this.props.errors.username || this.props.errors.password}
                        touched={this.props.touched.username || this.props.touched.password}/>}
                <ButtonNormal text={"Ingresar"} attrs={{...this.props.buttonAttr}}/>
            </form>
        );
    }
}

export default LoginForm;
