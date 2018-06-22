import * as React from 'react';
import { Link } from 'react-router-dom';
import './Layout.scss';

class Layout extends React.Component {
    public render() {
        return (
            <div className="Layout">
                <h1>Layout</h1>
                <h2>Menu</h2>
                <Link to="/admin/module-a"><button>Module A</button></Link>
                <Link to="/admin/module-b"><button>Module B</button></Link>
                <hr/>
                <div>{this.props.children}</div>
                <br/>
                <Link to="/"><button>Salir</button></Link>
            </div>
        );
    }
}

export default Layout;
