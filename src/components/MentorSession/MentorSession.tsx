import * as React from 'react';
import Layout from "../../common/Layout/Layout";
import Menu from "../../common/Menu/Menu";
import Sticky from "../../common/Sticky/Sticky";
import UserRepository from "../../repository/UserRepository";
import './MentorSession.scss';

class MentorSession extends React.Component {
    public renderMenu() {
        return (
            <Sticky height={60} top={60}>
                <Menu textNavigation={'Calendario de sesiones de ' + UserRepository.getUser().name}/>
            </Sticky>
        )
    }


    public render() {
        return (
            <Layout menu={this.renderMenu()}>
                <div className="Module B">
                    <span>Module B</span>
                </div>
            </Layout>
        );
    }
}

export default MentorSession;
