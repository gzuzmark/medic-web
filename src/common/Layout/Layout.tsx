import * as React from 'react';
import logo_header from '../../assets/images/logo_header.png';
import { Text } from '../../common/ConsoleText';
import UserRepository from '../../repository/UserRepository';
import Avatar from '../Avatar/Avatar';
import Sticky from '../Sticky/Sticky';
import './Header.scss';
import './Layout.scss';

interface IPropsLayout {
    menu: JSX.Element;
}

class Layout extends React.Component<IPropsLayout, {}> {

    constructor(props: IPropsLayout) {
        super(props);
    }

    public render() {
        return (
            <React.Fragment>
                <Sticky height={80} top={80}>
                    <div className="Header">
                        <div className="Header-wrapper u-LayoutMargin">
                            <div className="Header-section">
                                <Text className="Header-text"><img src={logo_header} height='18'/></Text>
                            </div>
                            <div className="Header-section">
                                <Text className="Header-text">Hola, {UserRepository.getUser().name}</Text>
                                <Avatar size={32} source={UserRepository.getUser().photo}/>
                            </div>
                        </div>
                    </div>
                </Sticky>
                {this.props.menu}
                <div className="Layout">
                    <div>{this.props.children}</div>
                </div>
            </React.Fragment>
        );
    }
}

export default Layout;
