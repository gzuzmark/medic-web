import * as React from 'react';
import { Link } from 'react-router-dom';
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
                <Sticky height={60} top={60}>
                    <div className="Header">
                        <div className="Header-wrapper u-LayoutMargin">
                            <div className="Header-section">
                                <Text className="Header-text">Administrador</Text>
                            </div>
                            <div className="Header-section">
                                <Text className="Header-text">{UserRepository.getUser().name}</Text>
                                <Avatar size={30} source={UserRepository.getUser().photo}/>
                            </div>
                        </div>
                    </div>
                </Sticky>
                {this.props.menu}
                <div className="Layout">
                    <div>{this.props.children}</div>
                    <div style={{'display': 'none'}}>
                        <Link to="/admin/mentores"><button>Module A</button></Link>
                        <Link to="/admin/module-b"><button>Module B</button></Link>
                        <hr/>
                        <div className="u-Layout-Padding">
                            <br/>
                            <Link to="/"><button>Salir</button></Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Layout;
