import * as React from 'react';
import logo from '../../../../assets/images/logo.png';
import { Heading1, Heading2, Heading3 } from '../../../../common/ConsoleText';
import './LoginPresentation.scss';

class LoginPresentation extends React.Component<{}, {}> {

    public render() {
        return (
            <div className="Login">
                <div className="Login-section Login-section--background">
                    <img className="Login-image" src={logo} />
                    <Heading3 color="textLight">Administrador</Heading3>
                </div>
                <div className="Login-section Login-section--form">
                    <div className="Login-form">
                        <Heading1 className="Login-title">Bienvenido</Heading1>
                        <Heading2 className="Login-subtitle">Por favor, ingresa tu correo y contraseña de UTP.</Heading2>
                        {this.props.children}
                        <Heading3 className="Login-information">
                            ¿Olvidaste tu contraseña? Para recuperarla escríbenos a ugoadministrador@ugo.com.pe
                        </Heading3>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPresentation;
