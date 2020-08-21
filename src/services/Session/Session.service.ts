import { ISessionNutritionistFormValidations } from '../../components/Mentor/SessionsMentor/components/NutritionistForm/NutritionistForm.context';
import {ISessionsToDelete} from '../../domain/FormSession/FormSessionDeleteBean';
import { ISessionHistoryForm, ISessionPatientCaseForm } from '../../domain/Session/SessionEditPatientHistory';
import {ISessionMentor} from '../../domain/Session/SessionMentorBean';
import { IRecipe } from '../../domain/Session/SessionRecipe';
import { IReportForSession } from '../../interfaces/Reports.interface';
import BaseRequest from '../BaseRequest';

class SessionService extends BaseRequest {
    private listMentorSessionsCancelToken: any = null;

    public list(params: string = '') {
        if (!!this.listMentorSessionsCancelToken) {
            this.listMentorSessionsCancelToken.cancel();
        }
        this.listMentorSessionsCancelToken = this.generateCancelToken();
        const instance = this.getCustomInstance(this.listMentorSessionsCancelToken);
        return new Promise((resolve, reject) => {
            instance.get(`ugo-admin/sessions?${params}`)
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

    public rescheduleSession(oldSessionId: string, newSessionId: string) {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo-admin/session/${oldSessionId}/reassign?new_session=${newSessionId}`)
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

    public getSessionPDF(session: string) {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo-admin/session/${session}/consult_pdf`)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data);
                    } else {
                        reject([]);
                    }
                })
                .catch((error: any) => {
                    this.validSession();
                    reject(error);
                });
        });
    }

    public confirmSessionPayment(session: string) {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo-admin/sessions/${session}/confirm_payment`)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data);
                    } else {
                        reject([]);
                    }
                })
                .catch((error: any) => {
                    this.validSession();
                    reject(error);
                });
        });
    }

    public followupSession(oldSessionId: string, newSessionId: string) {
      return new Promise((resolve, reject) => {
        this.instance.post(`ugo-admin/session/${oldSessionId}/follow_up?new_session=${newSessionId}`)
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

    public getSessionsByDoctor(session: string, doctorId: string, limit?: number) {
        return new Promise((resolve, reject) => {
            const params = `?doctor=${doctorId}&limit=${limit || 10}`;
            this.instance.get(`ugo-admin/session/${session}/sessions_to_reassign${params}`)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data.items);
                    } else {
                        reject([]);
                    }
                })
                .catch((error: any) => {
                    this.validSession();
                    reject(error);
                });
        });
    }

    public getDoctorsBySession(session: string) {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo-admin/session/${session}/doctors_to_reassign`)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data.items);
                    } else {
                        reject([]);
                    }
                })
                .catch((error: any) => {
                    this.validSession();
                    reject(error);
                });
        });
    }

    public cancelSession(sessionId: string) {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo-admin/sessions/${sessionId}/cancel`)
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

    public listReport(params: string): Promise<IReportForSession> {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo-admin/sessions/report?${params}`)
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

    public searchSessions(params: string): Promise<ISessionsToDelete[]> {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo-admin/sessions/search?${params}`)
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

    public getReportLink(params: object): Promise<string> {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo-admin/sessions/report`, params)
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

    public deleteSessions(ids: string[]): Promise<string> {
        return new Promise((resolve, reject) => {
            this.instance.delete(`ugo-admin/sessions`, {
                data: {
                    items: ids
                }
            }).then((response: any) => {
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

    // Mentor Service
    public listMentorSessions(from: string, to: string): Promise<ISessionMentor[]> {
        if (!!this.listMentorSessionsCancelToken) {
            this.listMentorSessionsCancelToken.cancel();
        }
        this.listMentorSessionsCancelToken = this.generateCancelToken();
        const instance = this.getCustomInstance(this.listMentorSessionsCancelToken);
        return new Promise((resolve, reject) => {
            instance.get(`ugo/mentors-api/me/sessions/all?from=${from}&to=${to}`)
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

    public listNoAttendedSessions(): Promise<ISessionMentor[]> {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo/mentors-api/me/sessions/noattended?limit=1`)
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

    public getSessionMentor(session: string): Promise<ISessionMentor> {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo/mentors-api/me/sessions/${session}`)
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

    public getSessionConsult(session: string) {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo/mentors-api/me/sessions/${session}/consult`)
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

    public getPastSessionConsults(session: string) {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo/mentors-api/me/sessions/${session}/past_consults`)
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

    public updateSessionConsult(session: string, patientCase: ISessionPatientCaseForm | ISessionNutritionistFormValidations) {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo/mentors-api/me/sessions/${session}/consult`, patientCase)
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

    public updateHistoryBackground(session: string, patientBackground: ISessionHistoryForm) {
        return new Promise((resolve, reject) => {
            this.instance.put(`ugo/mentors-api/me/sessions/${session}/clinic_history`, patientBackground)
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

    public sendTreatmentsRecipe(recipeForm: IRecipe) {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo/mentors-api/inkafarma/preview-prescription`, recipeForm)
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

    public createPrescription(recipeForm: IRecipe) {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo/mentors-api/inkafarma/prescription`, recipeForm)
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

    public uploadPrescription(form: FormData) {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo/mentors-api/upload_prescription`, form)
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

    public getFileURL(folioNumber: string) {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo/mentors-api/inkafarma/prescription/${folioNumber}`)
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

    public markAsAttended(session: string, ids: string[]) {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo/mentors-api/sessions/${session}/students`, {
                items: ids
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

    public markAsNoAttended(session: string) {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo/mentors-api/sessions/${session}/noattended`)
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

export default SessionService;
