import * as React from 'react';
import 'react-dates/initialize';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/fonts/fonts.scss';
import './assets/styles/styles.scss';
import HOCLayout from "./common/Layout/HOCLayout";
import ListMentors from './components/ListMentors/ListMentors';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import MentorSession from './components/MentorSession/MentorSession';
import Reports from "./components/Reports/Reports";
import AddScheduleSession from "./components/ScheduleSession/ScheduleSession";
import registerServiceWorker from './registerServiceWorker';


const PageReports = (props: any) => {
    const LayoutReports = HOCLayout(Reports);
    return <LayoutReports baseText={'Reportes'} url={'/admin/reportes'} {...props} keyPage={'report'}/>;
};

ReactDOM.render(
    <Router>
        <div>
            <Route exact={true} path="/logout" component={Logout} />
            <Route exact={true} path="/" component={Login} />
            <Route exact={true} path="/admin" component={ListMentors} />
            <Route exact={true} path="/admin/mentores" component={ListMentors} />
            <Route exact={true} path="/admin/reportes" render={PageReports}/>
            <Route exact={true} path="/admin/mentores/:id/sesiones" component={MentorSession}  />
            <Route exact={true} path="/admin/mentores/:id/sesiones/agendar" component={AddScheduleSession} />
        </div>
    </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();