import * as React from 'react';
import logo from '../../../../assets/images/logo.png';
import { Heading1, Heading5, Heading6 } from '../../../../common/ConsoleText';

class LoginPresentation extends React.Component<{}, {}> {

    public render() {
        return (
            <div className="Login">
                <div className="Login-section Login-section--background">
                    <img className="Login-image" src={logo} />
                </div>
                <div className="Login-section Login-section--form">
                    <div className="Login-form">
                        <Heading1>Bienvenido</Heading1>
                        <Heading5>Por favor, ingresa tu correo y contraseña de UTP.</Heading5>
                        {this.props.children}
                        <Heading6>
                            ¿Olvidaste tu contraseña? Para recuperarla escríbenos a ugoadministrador@ugo.com.pe
                        </Heading6>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPresentation;
