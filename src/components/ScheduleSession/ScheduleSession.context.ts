import * as React from 'react';
import { SessionBean } from '../../beans/Session.bean';

const session = new SessionBean();
const listSession: object = {};
const ScheduleSessionContext = React.createContext({session, listSession});
export default ScheduleSessionContext;
export interface IScheduleContext {
    session: SessionBean,
    listSession: object
}