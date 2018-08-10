import {ISessionReport} from "./Session.interface";
import {IStudentReport} from "./Student.interface";

interface IReportBase {
    pageSize: number;
    totalItems: number;
    currentPage: number;
}

export interface IReportForSession extends IReportBase{
    items?: ISessionReport[];
}

export interface IReportForStudent extends IReportBase{
    items?: IStudentReport[];
}
