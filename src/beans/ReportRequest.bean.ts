
export type ReportType = 'SESSIONS' | 'STUDENTS' | '';

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
        const params = {
            from: this.startDate,
            pageNumber: page,
            pageSize: 20,
            to: this.endDate
        };
        return Object.keys(params).map((key) => {
            return key + '=' + encodeURIComponent(params[key]);
        }).join('&');
    }
}