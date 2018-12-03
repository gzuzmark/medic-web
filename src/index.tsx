import 'react-dates/initialize';
import './assets/fonts/fonts.scss';
import './assets/fonts/fontsMentor.scss';
import './assets/styles/styles.scss';
import {initFirebase} from "./firebase";
import registerServiceWorker from './registerServiceWorker';
import {initRouter} from "./router";

initFirebase();
initRouter();
registerServiceWorker();
