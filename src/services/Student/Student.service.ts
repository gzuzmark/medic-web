import { IStudentChecklist } from "../../domain/StudentChecklist/StudentChecklistBean";
import {IReportForStudent} from "../../interfaces/Reports.interface";
import BaseRequest from '../BaseRequest';

class StudentService extends BaseRequest {

    public listReport(params: string): Promise<IReportForStudent> {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo-admin/sessions/students/report?${params}`)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data);
                    } else {
                        reject(null);
                    }
                })
                .catch((error: any) => {
                    this.validSession();
                    reject(error);
                });
        });
    }

    public getReportLink(params: object): Promise<string> {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo-admin/sessions/students/report`, params)
                .then((response: any) => {
                    if (response.status === 200 && response.data && response.data.data) {
                        resolve(response.data.data);
                    } else {
                        reject(null);
                    }
                })
                .catch((error: any) => {
                    this.validSession();
                    reject(error);
                });
        });
    }

    // Mentor Service
    public studentsFromSession(session:string, id: string): Promise<IStudentChecklist>  {
        let instance: any;
        if (id === '') {
            instance = this.getCustomInstance(
                "/La6HK7/RI/6vveP0q3AptWgl5i/5SRvd+SwRJYAdy5olRqmmnPe8A==",
                "https://ugo-utp-dev.appspot.com/_ah/api/ugo/mentors-api/");
        } else {
            instance = this.getCustomInstance(id,
                "https://ugo-utp-qa.appspot.com/_ah/api/ugo/mentors-api/");
        }
        return new Promise((resolve, reject) => {
            instance.get(`sessions/${session}/students`)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data.items);
                    } else {
                        reject(null);
                    }
                })
                .catch((error: any) => {
                    this.validSession();
                    reject(error);
                });
        });
    }
}

export default StudentService;
