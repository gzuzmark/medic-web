import * as React from 'react';
import {Link} from "react-router-dom";
import logo_header from '../../assets/images/logo_header.png';
import UserRepository, {ROL_ADMIN} from '../../repository/UserRepository';
import Avatar from '../Avatar/Avatar';
import colors from "../MentorColor";
import {Body1, LIGHT_TEXT, Subhead1} from '../MentorText';
import Sticky from '../Sticky/Sticky';
import Utilities from "../Utils/Utilities";
import MenuTop from "./components/MenuTop/MenuTop";
import './Footer.scss';
import './Header.scss';
import './Layout.scss';

interface IPropsLayout {
    menu?: JSX.Element;
    title?: string;
}

class Layout extends React.Component<IPropsLayout, {}> {
    private date: Date;
    constructor(props: IPropsLayout) {
        super(props);
        this.date = new Date();
    }

    public componentDidMount() {
        Utilities.scrollToTop();
    }

    public render() {
        return (
            <React.Fragment>
                <Sticky height={80} top={80} style={{'zIndex': 6}}>
                    <div className="Header" style={{background: colors.BACKGROUND_COLORS.background_purple}}>
                        <div className="Header_wrapper u-LayoutMargin">
                            <div className="Header_section">
                                <Link to={'/'}>
                                    <div className="Header_container-image">
                                        <img className="Header_image" src={logo_header} height='18'/>
                                    </div>
                                    <Subhead1 color="font_light" weight={LIGHT_TEXT} style={{padding: '0 14px'}}>
                                        {UserRepository.getUser().rol === ROL_ADMIN ? 'Administrador' : 'Mentores'}
                                    </Subhead1>
                                </Link>
                            </div>
                            <div className="Header_section">
                                <Subhead1 color="font_light" weight={LIGHT_TEXT} style={{padding: '0 10px'}}>Hola, {UserRepository.getUser().name} {UserRepository.getUser().lastname}</Subhead1>
                                <Avatar size={32} source={UserRepository.getUser().photo}/>
                                <MenuTop />
                            </div>
                        </div>
                    </div>
                </Sticky>
                {!!this.props.menu && this.props.menu}
                <div className="Layout">
                    <div>{this.props.children}</div>
                </div>
                <div className="Footer" style={{background: colors.MISC_COLORS.background_grey_1}}>
                    <div className="Footer-wrapper u-LayoutMargin">
                        <div className="Footer-section">
                            <Body1 className="Footer-text" weight={LIGHT_TEXT}>UGO {UserRepository.getUser().rol === ROL_ADMIN ? 'Administrador' : 'Mentores'} {this.date.getFullYear()}. Todos los derechos reservados</Body1>
                        </div>
                        <div className="Footer-section">
                            <a className="Footer-link" href="mailto:ugoadministrador@ugo.com.pe"><Body1 className="Footer-text" weight={LIGHT_TEXT}>ugoadministrador@ugo.com.pe</Body1></a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Layout;
