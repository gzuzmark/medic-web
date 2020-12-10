import * as React from 'react';
import 'react-dates/initialize';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './assets/fonts/fonts.scss';
import './assets/fonts/fontsMentor.scss';
import './assets/styles/styles.scss';
import HOCLayout from "./common/Layout/HOCLayout";
import LoaderFullScreen from "./common/Loader/LoaderFullsScreen";
import CouponsList from './components/Admin/CouponsList/CouponsList';
import MentorSession from './components/Admin/MentorSession/MentorSession';
import MentorsList from './components/Admin/MentorsList/MentorsList';
import PatientsList from './components/Admin/PatientsList/PatientsList';
import AddScheduleSession from "./components/Admin/ScheduleSession/ScheduleSession";
import SessionDeleteMultiple from "./components/Admin/SessionDelete/SessionDeleteMultiple";
import SessionDeleteSingle from "./components/Admin/SessionDelete/SessionDeleteSingle";
import SessionsList from './components/Admin/SessionsList/SessionsList';
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
    const Reports = React.lazy(() => import('./components/Admin/Reports/Reports'));
    const LayoutReports = HOCLayout(Reports);
    return <LayoutReports icon={'report'}
                          items={[{url: '/admin/reportes', text: 'Reportes'}]}
                          {...props}/>;
};

const PageCreateMentor = (props: any) => {
    const MentorFormCreate = React.lazy(() => import('./components/Admin/MentorFormCreate/MentorFormCreate'));
    const LayoutCreateMentor = HOCLayout(MentorFormCreate);
    return <LayoutCreateMentor icon={'book'}
                               items={[{url: '/admin', text: 'Doctores'}, {text: 'Agregar doctor'}]}
                               {...props}/>;
};

const PageEditMentor = (props: any) => {
    const MentorFormEdit = React.lazy(() => import('./components/Admin/MentorFormEdit/MentorFormEdit'));
    const LayoutEditMentor = HOCLayout(MentorFormEdit);
    return <LayoutEditMentor icon={'book'}
                             items={[{url: '/admin', text: 'Doctores'}, {text: 'Editar doctor'}]}
                             {...props}/>;
};

const PageProfileMentor = (props: any) => {
    const ProfileMentor = React.lazy(() => import('./components/Mentor/ProfileMentor/ProfileMentor'));
    const LayoutProfileMentor = HOCLayout(ProfileMentor);
    return <LayoutProfileMentor icon={'book'}
                                items={[{url: '/doctor', text: 'Inicio'}, {text: 'Ver perfil'}]}
                                {...props} />;
};

const PageEditProfileMentor = (props: any) => {
    const ProfileEditMentor = React.lazy(() => import('./components/Mentor/ProfileEditMentor/ProfileEditMentor'));
    const LayoutProfileEditMentor = HOCLayout(ProfileEditMentor);
    return <LayoutProfileEditMentor icon={'book'}
                                    items={[
                                        {url: '/doctor', text: 'Inicio'},
                                        {text: 'Ver perfil', url: '/doctor/perfil'},
                                        {text: 'Editar perfil'}]}
                                    {...props} />;
};

// const PageRoomList = (props: any) => {
//     const ListRooms = React.lazy(() => import('./components/Admin/RoomList/RoomList'));
//     const LayoutListRooms = HOCLayout(ListRooms);
//     return <LayoutListRooms icon={'box'}
//                              items={[{url: '/admin/aulas', text: 'Aulas'}]}
//                              {...props}/>;
// };

const PageListStudents = (props: any) => {
    const ListStudents = React.lazy(() => import('./components/Mentor/ListStudents/ListStudents'));
    const LayoutListStudents = HOCLayout(ListStudents);
    return <LayoutListStudents icon={'book'}
                             items={[
                                 {url: '/doctor', text: 'Inicio'},
                                 {url: '/doctor/pacientes', text: 'Pacientes'}]}
                             {...props}/>;
};

const PageMyRates = (props: any) => {
    const MyRates = React.lazy(() => import('./components/Mentor/MyRates/MyRates'));
    const LayoutMyRates = HOCLayout(MyRates);
    return <LayoutMyRates icon={'star'}
                             items={[
                                 {url: '/doctor', text: 'Inicio'},
                                 {url: '/doctor/calificaciones', text: 'Calificaciones'}]}
                             {...props}/>;
};

// const PageRoomCreate = (props: any) => {
//     const RoomCreate = React.lazy(() => import('./components/Admin/RoomCreate/RoomCreate'));
//     const LayoutListRooms = HOCLayout(RoomCreate);
//     return <LayoutListRooms icon={'box'}
//                              items={[
//                                  {url: '/admin/aulas', text: 'Aulas'},
//                                  {text: 'Nueva Aula'}]}
//                              {...props}/>;
// };

// const PageRoomEdit = (props: any) => {
//     const RoomEdit = React.lazy(() => import('./components/Admin/RoomEdit/RoomEdit'));
//     const LayoutListRooms = HOCLayout(RoomEdit);
//     return <LayoutListRooms icon={'box'}
//                              items={[
//                                  {url: '/admin/aulas', text: 'Aulas'},
//                                  {text: 'Editar Aula'}]}
//                              {...props}/>;
// };

const PageStudent = (props: any) => {
    const Student = React.lazy(() => import('./components/Mentor/Student/Student'));
    const LayoutStudent = HOCLayout(Student);
    return <LayoutStudent icon={'book'}
                             items={[
                                 {url: '/', text: 'Inicio'},
                                 {url: '/doctor/pacientes', text: 'Pacientes'},
                                 {text: 'Perfil de Alumno'}]}
                             {...props}/>;
};

export const initRouter = () => {
    ReactDOM.render(
        <Router>
            <React.Suspense fallback={<LoaderFullScreen text={"Cargando..."} styleLoaderContainer={{marginTop: 300}} />}>
                <Route exact={true} path="/" component={Login} />
                <Route exact={true} path="/logout" component={Logout} />
                <Route exact={true} path="/coupons" render={GuardComponent(CouponsList, ROL_ADMIN)} />
                <Route exact={true} path="/patients" render={GuardComponent(PatientsList, ROL_ADMIN)} />
                <Route exact={true} path="/sessions" render={GuardComponent(SessionsList, ROL_ADMIN)} />
                <Route exact={true} path="/admin" render={GuardComponent(MentorsList, ROL_ADMIN)} />
                <Route exact={true} path="/admin/doctores" render={GuardComponent(MentorsList, ROL_ADMIN)} />
                {/* <Route exact={true} path="/admin/aulas" render={GuardComponent(PageRoomList, ROL_ADMIN)} />
                <Route exact={true} path="/admin/aulas/crear" render={GuardComponent(PageRoomCreate, ROL_ADMIN)} />
                <Route exact={true} path="/admin/aulas/editar/:room/:block" render={GuardComponent(PageRoomEdit, ROL_ADMIN)} /> */}
                <Route exact={true} path="/admin/agregar-mentor" render={GuardComponent(PageCreateMentor, ROL_ADMIN)} />
                <Route exact={true} path="/admin/editar-mentor/:id" render={GuardComponent(PageEditMentor, ROL_ADMIN)} />
                <Route exact={true} path="/admin/reportes" render={GuardComponent(PageReports, ROL_ADMIN)}/>
                <Route exact={true} path="/admin/doctores/:id/sesiones" render={GuardComponent(MentorSession, ROL_ADMIN)} />
                <Route exact={true} path="/admin/doctores/:id/sesiones/agendar" render={GuardComponent(AddScheduleSession, ROL_ADMIN)} />
                <Route exact={true} path="/admin/doctores/:id/sesiones/:session/eliminar" render={GuardComponent(SessionDeleteSingle, ROL_ADMIN)} />
                <Route exact={true} path="/admin/doctores/:id/sesiones/eliminar" render={GuardComponent(SessionDeleteMultiple, ROL_ADMIN)} />
                <Route exact={true} path="/doctor" render={GuardComponent(MentorHome, ROL_MENTOR)} />
                <Route exact={true} path="/doctor/perfil" render={GuardComponent(PageProfileMentor, ROL_MENTOR)} />
                <Route exact={true} path="/doctor/pacientes" render={GuardComponent(PageListStudents, ROL_MENTOR)} />
                <Route exact={true} path="/doctor/pacientes/:skill" render={GuardComponent(PageListStudents, ROL_MENTOR)} />
                <Route exact={true} path="/doctor/calificaciones" render={GuardComponent(PageMyRates, ROL_MENTOR)} />
                <Route exact={true} path="/doctor/editar-perfil" render={GuardComponent(PageEditProfileMentor, ROL_MENTOR)} />
                <Route exact={true} path="/doctor/sesion/:session/" render={GuardComponent(SessionsMentor, ROL_MENTOR)} />
                <Route exact={true} path="/doctor/paciente/:id/" render={GuardComponent(PageStudent, ROL_MENTOR)} />
            </React.Suspense>
        </Router>,
        document.getElementById('root') as HTMLElement
    );
}
