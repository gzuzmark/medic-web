import * as React from 'react';
import logo_header from '../../assets/images/logo_header.png';
import {ROL_ADMIN} from "../../components/Login/components/LoginForm/LoginForm";
import UserRepository from '../../repository/UserRepository';
import Avatar from '../Avatar/Avatar';
import { Text } from '../ConsoleText';
import {LIGHT_TEXT, Subhead1} from '../MentorText';
import Sticky from '../Sticky/Sticky';
import Utilities from "../Utilities";
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
    private title: string;
    constructor(props: IPropsLayout) {
        super(props);
        this.date = new Date();
        this.title = this.props.title ? this.props.title : "Administrador";
    }

    public componentDidMount() {
        Utilities.scrollToTop();
    }

    public render() {
        return (
            <React.Fragment>
                <Sticky height={80} top={80} style={{'zIndex': 6}}>
                    <div className="Header">
                        <div className="Header_wrapper u-LayoutMargin">
                            <div className="Header_section">
                                <div className="Header_container-image">
                                    <img className="Header_image" src={logo_header} height='18'/>
                                </div>
                                <Subhead1 color="font_light" weight={LIGHT_TEXT} style={{padding: '0 14px'}}>
                                    {UserRepository.getUser().rol === ROL_ADMIN ? 'Administrador' : 'Tutores'}
                                </Subhead1>
                            </div>
                            <div className="Header_section">
                                <Subhead1 color="font_light" weight={LIGHT_TEXT} style={{padding: '0 10px'}}>Hola, {UserRepository.getUser().name}</Subhead1>
                                <Avatar size={32} source={UserRepository.getUser().photo}/>
                                {UserRepository.getUser().rol === ROL_ADMIN && <MenuTop />}
                            </div>
                        </div>
                    </div>
                </Sticky>
                {!!this.props.menu && this.props.menu}
                <div className="Layout">
                    <div>{this.props.children}</div>
                </div>
                <div className="Footer">
                    <div className="Footer-wrapper u-LayoutMargin">
                        <div className="Footer-section">
                            <Text className="Footer-text">UGO {this.title} {this.date.getFullYear()}. Todos los derechos reservados</Text>
                        </div>
                        <div className="Footer-section">
                            <a className="Footer-link" href="mailto:ugoadministrador@ugo.com.pe"><Text className="Footer-text">ugoadministrador@ugo.com.pe</Text></a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Layout;
