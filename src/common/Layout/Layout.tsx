import * as React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import logo_header from '../../assets/images/logo_header.png';
import {MENTOR_STATUS} from "../../domain/Mentor/MentorBase";
import {IUser} from "../../interfaces/User.interface";
import UserRepository, {ROL_ADMIN, ROL_MENTOR} from '../../repository/UserRepository';
import Avatar from '../Avatar/Avatar';
import Icon from "../Icon/Icon";
import colors, {FONTS} from "../MentorColor";
import {Body1, LIGHT_TEXT, Subhead1} from '../MentorText';
import Sticky from '../Sticky/Sticky';
import MenuTop from "./components/MenuTop/MenuTop";
import './Footer.scss';
import './Header.scss';
import LayoutContext, {defaultNotificationValues, IHeaderNotification, TypeHeaderNotification} from "./Layout.context";
import './Layout.scss';

interface IPropsLayout {
    menu?: JSX.Element;
    title?: string;
}

const NotificationBox = styled.div`
    align-items: center;
    background: ${(props: {type: TypeHeaderNotification}) => {
        let color = colors.MISC_COLORS.green;
        if (props.type === "ERROR") {
            color = colors.TEXT_COLORS.font_error
        }    
        return color;
    }};
    display: flex;
    height: 40px;
    justify-content: center;
    min-width: 100vw;    
`;

const baseErrorNotification = <React.Fragment>
    <Body1 color={FONTS.light}>Tu perfil está incompleto.</Body1>
    <Body1 color={FONTS.light} weight={LIGHT_TEXT}>Recuerda si tu perfil está incompleto, tu coordinador no podrá programarte sesiones. </Body1>
</React.Fragment>;

export const errorLocatedNotification = {
    show: true,
    text: <span>
        {baseErrorNotification}
    </span>,
    type: "ERROR" as TypeHeaderNotification
};

export const errorDefaultNotification  = {
    show: true,
    text: <span>
        {baseErrorNotification}
        <Link to={"/doctor/perfil"}> <Body1 color={FONTS.light}>Ir al perfil</Body1></Link>
    </span>,
    type: "ERROR" as TypeHeaderNotification
};

const Layout: React.FC<IPropsLayout> = props => {
    const date = new Date();

    const [notification, setNotification] = React.useState(defaultNotificationValues as IHeaderNotification);
    const [user, setUser] = React.useState(UserRepository.getUser());

    React.useEffect(() => {
        if (user.rol === ROL_MENTOR) {
            if (user.status === MENTOR_STATUS.INCOMPLETE) {
                setNotification(errorDefaultNotification);
            } else {
                setNotification(defaultNotificationValues);
            }
        }
    }, [user]);

    React.useEffect(() => {
        UserRepository.setUser({...user})
    }, [user]);

    const updateUser = (newUser: IUser) => {
        setUser({...newUser});
    };

    return (
        <LayoutContext.Provider value={{user, notification, setNotification, setUser: updateUser}}>
            <Sticky height={80} top={80} style={{'zIndex': 6}}>
                <div className="Header" style={{background: colors.BACKGROUND_COLORS.background_green}}>
                    <div className="Header_wrapper u-LayoutMargin">
                        <div className="Header_section">
                            <Link to={'/'}>
                                <div className="Header_container-image">
                                    <img className="Header_image" src={logo_header} height='18'/>
                                </div>
                                <Subhead1 color="font_light" weight={LIGHT_TEXT} style={{padding: '0 14px'}}>
                                    {user.rol === ROL_ADMIN ? 'Administrador' : 'Doctores'}
                                </Subhead1>
                            </Link>
                        </div>
                        <div className="Header_section">
                            <Subhead1 color="font_light" weight={LIGHT_TEXT} style={{padding: '0 10px'}}>Hola, {user.name} {user.lastname}</Subhead1>
                            <Avatar size={32} source={user.photo}/>
                            <MenuTop warningProfile={user.rol === ROL_MENTOR && user.status === MENTOR_STATUS.INCOMPLETE} />
                        </div>
                    </div>
                    <div className={"Header_notifications"}>
                        {notification.show &&
                        <NotificationBox type={notification.type}>
                            <Icon name={"alert"} style={{fill: colors.BACKGROUND_COLORS.background_white}} />
                            <Body1 color={FONTS.light}>{notification.text}</Body1>
                        </NotificationBox>}
                    </div>
                </div>
            </Sticky>
            {!!props.menu && props.menu}
            <div className="Layout">
                <div>{props.children}</div>
            </div>
            <div className="Footer" style={{background: colors.MISC_COLORS.background_grey_1}}>
                <div className="Footer-wrapper u-LayoutMargin">
                    <div className="Footer-section">
                        <Body1 className="Footer-text" weight={LIGHT_TEXT}>UGO {user.rol === ROL_ADMIN ? 'Administrador' : 'Doctores'} {date.getFullYear()}. Todos los derechos reservados</Body1>
                    </div>
                    <div className="Footer-section">
                        <a className="Footer-link" href="mailto:nia@lavictoria.pe"><Body1 className="Footer-text" weight={LIGHT_TEXT}>nia@lavictoria.pe</Body1></a>
                    </div>
                </div>
            </div>
        </LayoutContext.Provider>
    )
};

export default Layout;
