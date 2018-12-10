import * as React from 'react';
import { SessionBean } from '../../../beans/Session.bean';
import {FormLocationDependency} from "../../../domain/FormSession/FormLocationDependency";

const session = new SessionBean();
const locations = new FormLocationDependency();
const listSession: object = {};
const ScheduleSessionContext = React.createContext({session, listSession, locations});
export default ScheduleSessionContext;
export interface IScheduleContext {
    session: SessionBean,
    listSession: object
    locations: FormLocationDependency;
}
