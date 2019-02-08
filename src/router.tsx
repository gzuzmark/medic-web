import * as React from 'react';
import 'react-dates/initialize';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './assets/fonts/fonts.scss';
import './assets/fonts/fontsMentor.scss';
import './assets/styles/styles.scss';
import HOCLayout from "./common/Layout/HOCLayout";
import MentorCreate from "./components/Admin/MentorCreate/MentorCreate";
import MentorSession from './components/Admin/MentorSession/MentorSession';
import MentorsList from './components/Admin/MentorsList/MentorsList';
import Reports from "./components/Admin/Reports/Reports";
import AddScheduleSession from "./components/Admin/ScheduleSession/ScheduleSession";
import SessionDeleteMultiple from "./components/Admin/SessionDelete/SessionDeleteMultiple";
import SessionDeleteSingle from "./components/Admin/SessionDelete/SessionDeleteSingle";
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import MentorHome from "./components/Mentor/MentorHome/MentorHome";
import SessionsMentor from "./components/Mentor/SessionsMentor/SessionsMentor";
import UserRepository, {ROL_ADMIN, ROL_MENTOR} from "./repository/UserRepository";

const GuardComponent = <P extends object>(Component: React.ComponentType, rol: string) => {
    const user = UserRepository.getUser();
    return (props: any) => {
        const hasPermission = !!user &&
            user.rol === rol &&
            !!UserRepository.getToken();
        if (hasPermission) {
            return <Component {...props} />
        } else {
            window.location.assign('/');
        }
        return null;
    }
};


const PageReports = (props: any) => {
    const LayoutReports = HOCLayout(Reports);
    return <LayoutReports baseText={'Reportes'} url={'/admin/reportes'} {...props} keyPage={'report'}/>;
};

const PageCreateMentor = (props: any) => {
    const LayoutReports = HOCLayout(MentorCreate);
    return <LayoutReports baseText={'Mentores'}
                          url={'/admin/agregar-mentor'}
                          {...props}
                          keyPage={'book'}
                          textNavigation={"Agregar mentor"}/>;
};

export const initRouter = () => {
    ReactDOM.render(
        <Router>
            <div>
                <Route exact={true} path="/" component={Login} />
                <Route exact={true} path="/logout" component={Logout} />
                <Route exact={true} path="/admin" render={GuardComponent(MentorsList, ROL_ADMIN)} />
                <Route exact={true} path="/admin/mentores" render={GuardComponent(MentorsList, ROL_ADMIN)} />
                <Route exact={true} path="/admin/agregar-mentor" render={GuardComponent(PageCreateMentor, ROL_ADMIN)} />
                <Route exact={true} path="/admin/reportes" render={GuardComponent(PageReports, ROL_ADMIN)}/>
                <Route exact={true} path="/admin/mentores/:id/sesiones" render={GuardComponent(MentorSession, ROL_ADMIN)} />
                <Route exact={true} path="/admin/mentores/:id/sesiones/agendar" render={GuardComponent(AddScheduleSession, ROL_ADMIN)} />
                <Route exact={true} path="/admin/mentores/:id/sesiones/:session/eliminar" render={GuardComponent(SessionDeleteSingle, ROL_ADMIN)} />
                <Route exact={true} path="/admin/mentores/:id/sesiones/eliminar" render={GuardComponent(SessionDeleteMultiple, ROL_ADMIN)} />
                <Route exact={true} path="/mentor" render={GuardComponent(MentorHome, ROL_MENTOR)} />
                <Route exact={true} path="/mentor/sesion/:session/" render={GuardComponent(SessionsMentor, ROL_MENTOR)} />
            </div>
        </Router>,
        document.getElementById('root') as HTMLElement
    );
}
