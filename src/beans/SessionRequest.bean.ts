export interface ISessionRequestBean {
    startDate: Date;
    endDate: Date;
    doctorId: string;
    documentNumber: string
}
const day = 86400000;
const initYear = 1970;
const DEFAULT_DATE_STEP = 6;
export class SessionRequestBean implements ISessionRequestBean {
    public startDate = new Date();
    public endDate = new Date();
    public doctorId = '';
    public documentNumber = '';

    constructor(sessionRequest?: ISessionRequestBean) {
        if (sessionRequest) {
            const b = {...sessionRequest};
            b.endDate.setHours(0, 0, 0, 0);
            b.startDate.setHours(0, 0, 0, 0);
            if (b.endDate < b.startDate) {
                b.endDate = b.startDate;
            } else {
                const time = b.endDate.getTime() - b.startDate.getTime();
                const diff = new Date(time + day);
                const years = (diff.getFullYear() - initYear);
                if (years >= 1) {
                    const startDate = new Date(b.startDate);
                    startDate.setFullYear(b.startDate.getFullYear() + 1);
                    startDate.setDate(startDate.getDate() - 1);
                    b.endDate = startDate;
                }
            }
            this.startDate = new Date(b.startDate);
            this.endDate = new Date(b.endDate);
            this.doctorId = sessionRequest.doctorId;
            this.documentNumber = sessionRequest.documentNumber;
        } else {
            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + DEFAULT_DATE_STEP);
            endDate.setHours(0, 0, 0, 0);
            startDate.setHours(0, 0, 0, 0);
            this.startDate = startDate;
            this.endDate = endDate;
            this.doctorId = '';
            this.documentNumber = '';
        }
    }

    public isValid(): boolean {
        return !!this.startDate && !!this.endDate;
    }

    public toParams(): string {
        const from = new Date(this.startDate);
        const to = new Date(this.endDate);
        from.setHours(0,0,0, 0);
        to.setDate(to.getDate() + 1);
        to.setHours(0,0,0,0);
        const params = {
          doctor_id: this.doctorId,
          from: from.toISOString(),
          patient_document_number: this.documentNumber,
          to: to.toISOString(),
        };
        return Object.keys(params).map((key) => {
            if (params[key]) {
              return key + '=' + encodeURIComponent(params[key]);
            }
            return null;
        }).filter(p => !!p).join('&');
    }
}
