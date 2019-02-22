import * as React from 'react';
import Loader from "../../common/Loader/Loader";
import UserRepository from "../../repository/UserRepository";

class Logout extends React.Component <{}, {}> {
    constructor(props: any) {
        super(props);
        UserRepository.setUser('');
        UserRepository.setToken('');
        window.location.assign('/');
    }

    public render() {
        return (
            <Loader style={{marginTop: 200}}/>
        );
    }
}

export default Logout;
