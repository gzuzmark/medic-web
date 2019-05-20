import * as React from 'react';
import 'react-dates/initialize';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './assets/fonts/fonts.scss';
import './assets/fonts/fontsMentor.scss';
import './assets/styles/styles.scss';
import HOCLayout from "./common/Layout/HOCLayout";
import CreateRoom from "./components/Admin/CreateRoom/CreateRoom";
import ListRooms from "./components/Admin/ListRooms/ListRooms";
import MentorFormCreate from "./components/Admin/MentorFormCreate/MentorFormCreate";
import MentorFormEdit from "./components/Admin/MentorFormEdit/MentorFormEdit";
import MentorSession from './components/Admin/MentorSession/MentorSession';
import MentorsList from './components/Admin/MentorsList/MentorsList';
import Reports from "./components/Admin/Reports/Reports";
import AddScheduleSession from "./components/Admin/ScheduleSession/ScheduleSession";
import SessionDeleteMultiple from "./components/Admin/SessionDelete/SessionDeleteMultiple";
import SessionDeleteSingle from "./components/Admin/SessionDelete/SessionDeleteSingle";
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import ListStudents from "./components/Mentor/ListStudents/ListStudents";
import MentorHome from "./components/Mentor/MentorHome/MentorHome";
import ProfileEditMentor from "./components/Mentor/ProfileEditMentor/ProfileEditMentor";
import ProfileMentor from "./components/Mentor/ProfileMentor/ProfileMentor";
import SessionsMentor from "./components/Mentor/SessionsMentor/SessionsMentor";
import Student from "./components/Mentor/Student/Student";
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
    return <LayoutReports icon={'report'}
                          items={[{url: '/admin/reportes', text: 'Reportes'}]}
                          {...props}/>;
};

const PageCreateMentor = (props: any) => {
    const LayoutCreateMentor = HOCLayout(MentorFormCreate);
    return <LayoutCreateMentor icon={'book'}
                               items={[{url: '/admin', text: 'Mentores'}, {text: 'Agregar mentor'}]}
                               {...props}/>;
};

const PageEditMentor = (props: any) => {
    const LayoutEditMentor = HOCLayout(MentorFormEdit);
    return <LayoutEditMentor icon={'book'}
                             items={[{url: '/admin', text: 'Mentores'}, {text: 'Editar mentor'}]}
                             {...props}/>;
};

const PageProfileMentor = (props: any) => {
    const LayoutProfileMentor = HOCLayout(ProfileMentor);
    return <LayoutProfileMentor icon={'book'}
                                items={[{url: '/mentor', text: 'Inicio'}, {text: 'Ver perfil'}]}
                                {...props} />;
};

const PageEditProfileMentor = (props: any) => {
    const LayoutProfileEditMentor = HOCLayout(ProfileEditMentor);
    return <LayoutProfileEditMentor icon={'book'}
                                    items={[
                                        {url: '/mentor', text: 'Inicio'},
                                        {text: 'Ver perfil', url: '/mentor/perfil'},
                                        {text: 'Editar perfil'}]}
                                    {...props} />;
};

const PageListRooms = (props: any) => {
    const LayoutListRooms = HOCLayout(ListRooms);
    return <LayoutListRooms icon={'box'}
                             items={[{url: '/admin/aulas', text: 'Aulas'}]}
                             {...props}/>;
};

const PageListStudents = (props: any) => {
    const LayoutListStudents = HOCLayout(ListStudents);
    return <LayoutListStudents icon={'book'}
                             items={[
                                 {url: '/mentor', text: 'Inicio'},
                                 {url: '/mentor/alumnos', text: 'Alumnos'}]}
                             {...props}/>;
};

const PageCreateRoom = (props: any) => {
    const LayoutListRooms = HOCLayout(CreateRoom);
    return <LayoutListRooms icon={'box'}
                             items={[
                                 {url: '/admin/aulas', text: 'Aulas'},
                                 {text: 'Nueva Aula'}]}
                             {...props}/>;
};

const PageStudent = (props: any) => {
    const LayoutStudent = HOCLayout(Student);
    return <LayoutStudent icon={'book'}
                             items={[
                                 {url: '/', text: 'Inicio'},
                                 {url: '/mentor/alumnos', text: 'Alumnos'},
                                 {text: 'Perfil de Alumno'}]}
                             {...props}/>;
};

export const initRouter = () => {
    ReactDOM.render(
        <Router>
            <div>
                <Route exact={true} path="/" component={Login} />
                <Route exact={true} path="/logout" component={Logout} />
                <Route exact={true} path="/admin" render={GuardComponent(MentorsList, ROL_ADMIN)} />
                <Route exact={true} path="/admin/mentores" render={GuardComponent(MentorsList, ROL_ADMIN)} />
                <Route exact={true} path="/admin/aulas" render={GuardComponent(PageListRooms, ROL_ADMIN)} />
                <Route exact={true} path="/admin/aulas/crear" render={GuardComponent(PageCreateRoom, ROL_ADMIN)} />
                <Route exact={true} path="/admin/agregar-mentor" render={GuardComponent(PageCreateMentor, ROL_ADMIN)} />
                <Route exact={true} path="/admin/editar-mentor/:id" render={GuardComponent(PageEditMentor, ROL_ADMIN)} />
                <Route exact={true} path="/admin/reportes" render={GuardComponent(PageReports, ROL_ADMIN)}/>
                <Route exact={true} path="/admin/mentores/:id/sesiones" render={GuardComponent(MentorSession, ROL_ADMIN)} />
                <Route exact={true} path="/admin/mentores/:id/sesiones/agendar" render={GuardComponent(AddScheduleSession, ROL_ADMIN)} />
                <Route exact={true} path="/admin/mentores/:id/sesiones/:session/eliminar" render={GuardComponent(SessionDeleteSingle, ROL_ADMIN)} />
                <Route exact={true} path="/admin/mentores/:id/sesiones/eliminar" render={GuardComponent(SessionDeleteMultiple, ROL_ADMIN)} />
                <Route exact={true} path="/mentor" render={GuardComponent(MentorHome, ROL_MENTOR)} />
                <Route exact={true} path="/mentor/perfil" render={GuardComponent(PageProfileMentor, ROL_MENTOR)} />
                <Route exact={true} path="/mentor/alumnos" render={GuardComponent(PageListStudents, ROL_MENTOR)} />
                <Route exact={true} path="/mentor/editar-perfil" render={GuardComponent(PageEditProfileMentor, ROL_MENTOR)} />
                <Route exact={true} path="/mentor/sesion/:session/" render={GuardComponent(SessionsMentor, ROL_MENTOR)} />
                <Route exact={true} path="/mentor/alumno/:id/" render={GuardComponent(PageStudent, ROL_MENTOR)} />
            </div>
        </Router>,
        document.getElementById('root') as HTMLElement
    );
}
