import * as React from 'react';
import { Link } from "react-router-dom";
import './Login.scss';

class Login extends React.Component {
    public render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <Link to="/admin"><button>Login</button></Link>
            </div>
        );
    }
}

export default Login;
