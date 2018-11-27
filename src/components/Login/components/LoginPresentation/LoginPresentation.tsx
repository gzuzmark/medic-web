import * as React from 'react';
import styled from "styled-components";
import logo from '../../../../assets/images/logo.png';
import Icon from "../../../../common/Icon/Icon";
import colors from "../../../../common/MentorColor";
import {Display2, LIGHT_TEXT, Small2, Subhead1} from '../../../../common/MentorText';
import './LoginPresentation.scss';

const Background = (props: any) =>
    <div className={`Login_section Login_section--background ${props.className}`}>
        &nbsp;
    </div>;

const SectionRight = styled(Background)`
  background: ${colors.BACKGROUND_COLORS.background_purple}  
`;

class LoginPresentation extends React.Component<{}, {}> {

    public render() {
        return (
            <div className="Login">
                <SectionRight />
                <div className="Login_section Login_section--form">
                    <div className="Login_form">
                        <Display2 weight={LIGHT_TEXT} color={'font_medium'}>¡Bienvenido!</Display2>
                        <Subhead1 weight={LIGHT_TEXT} color={'font_medium'}>
                            Ingresa tu correo y contraseña de UTP
                        </Subhead1>
                        {this.props.children}
                        <div className="Login_footer">
                            <div><Icon name={'locker'}/></div>
                            <div>
                                <Small2>¿Olvidaste tu contraseña?&nbsp;</Small2>
                                <Small2 weight={LIGHT_TEXT}>Para recuperarla escríbenos a ugoadministrador@ugo.com.pe</Small2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Login_section Login_section--image-container">
                    <img className="Login_image" src={logo} />
                </div>
            </div>
        );
    }
}

export default LoginPresentation;
