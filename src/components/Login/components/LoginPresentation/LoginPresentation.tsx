import * as React from 'react';
import styled from "styled-components";
import Icon from "../../../../common/Icon/Icon";
import colors from "../../../../common/MentorColor";
import {Display2, LIGHT_TEXT, Small2, Subhead1} from '../../../../common/MentorText';
import './LoginPresentation.scss';

const Background = (props: any) =>
    <div className={`Login_section Login_section--background ${props.className}`}>
        &nbsp;
    </div>;

const SectionRight = styled(Background)`
  background: ${colors.BACKGROUND_COLORS.background_green}  
`;

class LoginPresentation extends React.Component<{}, {}> {

    public render() {
        return (
            <div className="Login">
                <SectionRight />
                <div className="Login_section Login_section--form">
                    <div className="Login_form">
                        <Display2 weight={LIGHT_TEXT} color={'font_medium'}>¡Bienvenido!</Display2>
                        <Subhead1 weight={LIGHT_TEXT} style={{margin: '7px 0 auto 0'}}>
                            Ingresa tu correo y contraseña
                        </Subhead1>
                        {this.props.children}
                        <div className="Login_footer">
                            <div style={{marginRight: 5}}><Icon name={'locker'}/></div>
                            <div>
                                <Small2>¿Olvidaste tu contraseña? </Small2>
                                <Small2 weight={LIGHT_TEXT}>Para recuperarla escríbenos a nia@lavictoria.pe</Small2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPresentation;
