import {IStudentProfile} from "../../domain/Student/IStudentProfile";
import { IStudentChecklist } from "../../domain/StudentChecklist/StudentChecklistBean";
import {IReportForStudent} from "../../interfaces/Reports.interface";
import BaseRequest from '../BaseRequest';

class StudentService extends BaseRequest {
  public list(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.instance.get(`ugo-admin/patients`)
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
    public studentsFromSession(session:string): Promise<IStudentChecklist>  {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo/mentors-api/sessions/${session}/students?tags=true`)
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

    public searchStudentFromSession(session:string, codeStudent: string): Promise<IStudentChecklist>  {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo/mentors-api/sessions/${session}/students/search?code=${codeStudent}`)
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

    public addStudentToSession(session:string, student: string, id: string, locationType: string): Promise<{id: string}>  {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo/mentors-api/sessions/${session}/students/${student}/reservation`, {
                syncCalendar : true,
                type : locationType
            })
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

    public getStudentDetail(student: string): Promise<IStudentProfile>  {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo/mentors-api/students/${student}/sessions/details`)
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
}

export default StudentService;
