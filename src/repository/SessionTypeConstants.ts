import {IListItem} from "../common/FilterList/FilterList";

export const SESSION_VIRTUAL = 'VIRTUAL';
export const SESSION_PHYSICAL = 'PHYSICAL';
export const SESSION_UNDEFINED = 'UNDEFINED';
export const SESSION_WORKSHOP = 'WORKSHOP';

export const AREA_TYPE_SERVICE = 'SERVICE';
export const AREA_TYPE_TUTORY = 'TUTORY';

export const SESSION_TYPES_TUTORIES: IListItem[] = [
    {
        id: SESSION_VIRTUAL,
        name: 'Tutoría virtual'
    },
    {
        id: SESSION_PHYSICAL,
        name: 'Tutoría presencial'
    },
    {
        id: SESSION_UNDEFINED,
        name: 'Indefinido'
    },
];

export const SESSION_TYPES_SERVICES: IListItem[] = [
    {
        id: SESSION_VIRTUAL,
        name: 'Virtual'
    },
    {
        id: SESSION_PHYSICAL,
        name: 'Presencial'
    },
    {
        id: SESSION_UNDEFINED,
        name: 'Indefinido'
    },
];