import * as React from 'react';
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
                <input
                    type="text"
                    onChange={this.props.handleChange}
                    onBlur={this.props.handleBlur}
                    name="username"
                    placeholder="Ingresa tu usuario"
                    className="LoginForm-input LoginForm-input--username"
                />
                <input
                    type="password"
                    onChange={this.props.handleChange}
                    onBlur={this.props.handleBlur}
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    className="LoginForm-input LoginForm-input--password"
                />
                {this.props.errors.username &&
                    <InputError error={this.props.errors.username} touched={this.props.touched.username}/>}
                {!this.props.errors.username && this.props.errors.password &&
                    <InputError error={this.props.errors.password} touched={this.props.touched.password}/>}
                <button className="LoginForm-button"
                        type="submit"
                        {...this.props.buttonAttr}>
                    {!this.props.buttonAttr.disabled ? 'Ingresar': ''}</button>
            </form>
        );
    }
}

export default LoginForm;
