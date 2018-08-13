import {PAGE_ITEMS_RANGE} from "../common/ConsolePager/ConsolePager.const";
import Utilities from "../common/Utilities";

export type ReportType = 'SESSIONS' | 'STUDENTS' | '';

export const REPORT_SESSIONS = 'SESSIONS' as ReportType;
export const REPORT_STUDENTS = 'STUDENTS' as ReportType;
export interface IReportRequestBean {
    startDate: Date;
    endDate: Date;
    type: ReportType;
}

export class ReportRequestBean implements IReportRequestBean {
    public startDate = new Date();
    public endDate = new Date();
    public type = '' as ReportType;

    constructor(reportRequest?: IReportRequestBean) {
        if (reportRequest) {
            const b = {...reportRequest};
            if (b.endDate < b.startDate) {
                b.endDate = b.startDate;
            } else {
                const time = b.endDate.getTime() - b.startDate.getTime();
                const diff = new Date(time);
                if (Math.abs(diff.getFullYear() - 1970) >= 1) {
                    const startDate = new Date(b.startDate);
                    startDate.setFullYear(b.startDate.getFullYear() + 1);
                    b.endDate = startDate;
                }
            }
            this.startDate = new Date(b.startDate);
            this.endDate = new Date(b.endDate);
            this.type = b.type;
        } else {
            const date = new Date();
            date.setDate(date.getDate() + 6);
            this.startDate = new Date();
            this.endDate = date;
            this.type = '' as ReportType;
        }
    }

    public isValid(): boolean {
        return !!this.startDate && !!this.endDate && !!this.type;
    }

    public toParams(page: number): string {
        const from = new Date(this.startDate);
        const to = new Date(this.endDate);
        from.setHours(0,0,0, 0);
        to.setDate(to.getDate() + 1);
        to.setHours(0,0,0,0);
        const params = {
            from: from.toISOString(),
            pageNumber: page,
            pageSize: PAGE_ITEMS_RANGE,
            to: to.toISOString()
        };
        return Object.keys(params).map((key) => {
            return key + '=' + encodeURIComponent(params[key]);
        }).join('&');
    }

    public toReportParams(): object {
        const from = new Date(this.startDate);
        const to = new Date(this.endDate);
        from.setHours(0,0,0, 0);
        to.setDate(to.getDate() + 1);
        to.setHours(0,0,0,0);
        const params = {
            from: from.toISOString(),
            to: to.toISOString()
        };
        return params;
    }

    public getName(): string {
        let type = '';
        if (this.type === REPORT_STUDENTS) {
            type = 'alumnos';
        } else if (this.type === REPORT_SESSIONS) {
            type = 'sesiones';
        }
        const startDate = Utilities.getDateFormatted(this.startDate);
        const endDate = Utilities.getDateFormatted(this.endDate);
        return `Reporte de ${type} del ${startDate} hasta ${endDate}`;
    }
}