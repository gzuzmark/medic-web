import * as React from 'react';
import logo_header from '../../assets/images/logo_header.png';
import UserRepository from '../../repository/UserRepository';
import Avatar from '../Avatar/Avatar';
import { Text } from '../ConsoleText';
import Sticky from '../Sticky/Sticky';
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
        window.scrollTo(0, 0);
    }

    public render() {
        return (
            <React.Fragment>
                <Sticky height={80} top={80} style={{'zIndex': 6}}>
                    <div className="Header">
                        <div className="Header-wrapper u-LayoutMargin">
                            <div className="Header-section">
                                <Text className="Header-text"><img src={logo_header} height='18'/></Text>
                            </div>
                            <div className="Header-section">
                                <Text className="Header-text">Hola, {UserRepository.getUser().name}</Text>
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
