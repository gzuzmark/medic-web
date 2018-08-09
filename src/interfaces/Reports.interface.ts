import {ISessionReport} from "./Session.interface";

interface IReportBase {
    pageSize: number;
    totalItems: number;
    currentPage: number;
}

export interface IReportForSession extends IReportBase{
    items?: ISessionReport[];
}