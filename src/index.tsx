import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/fonts/fonts.scss';
import './assets/styles/styles.scss';
import ListMentors from './components/ListMentors/ListMentors';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import MentorSession from './components/MentorSession/MentorSession';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Route exact={true} path="/logout" component={Logout} />
            <Route exact={true} path="/" component={Login} />
            <Route exact={true} path="/admin" component={ListMentors} />
            <Route exact={true} path="/admin/mentores" component={ListMentors} />
            <Route exact={true} path="/admin/mentores/sessiones/:id" component={MentorSession} />
        </div>
    </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();