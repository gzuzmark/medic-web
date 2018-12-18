import * as React from 'react';
import { FactorySessionBean } from '../../../domain/FactorySession/FactorySessionBean';
import {FormLocationDependency} from "../../../domain/FormSession/FormLocationDependency";

const session = new FactorySessionBean();
const locations = new FormLocationDependency();
const listSession: object = {};
const ScheduleSessionContext = React.createContext({session, listSession, locations});
export default ScheduleSessionContext;
export interface IScheduleContext {
    session: FactorySessionBean,
    listSession: object
    locations: FormLocationDependency;
}
