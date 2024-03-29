import {ISkill, ISubSkill} from "../../domain/Skill/Skill";
import BaseRequest from '../BaseRequest';

class SkillService extends BaseRequest {

    public list(): Promise<ISkill[]> {
        return new Promise((resolve, reject) => {
            this.instance.get('ugo-admin/skills')
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

    public listByMentor(): Promise<ISkill[]> {
        return new Promise((resolve, reject) => {
            this.instance.get('ugo/mentors-api/me/skills')
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data.skills);
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

    public listStudents(id: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo/mentors-api/sessions/skill/${id}/students`)
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

    public listBySite(id: string): Promise<ISkill[]> {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo-admin/sites/${id}/skills`)
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

    public listBySiteInMentor(id: string): Promise<ISkill[]> {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo/mentors-api/me/sites/${id}/skills`)
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

    public listDiagnosticsBySkill(id:string): Promise<ISubSkill[]>{
        return new Promise((resolve,reject)=>{
            this.instance.get(`ugo-admin/skills_specialities/${id}`).
            then((response:any)=>{
                if (response.status === 200 && response.data) {
                    resolve(response.data.items);
                } else {
                    reject(null);
                }
            })
        })
    }

    public listDiagnosticsBySkillInMentor(id: string): Promise<ISubSkill[]>{
        return new Promise((resolve,reject)=>{
            this.instance.get(`ugo/mentors-api/skills_specialities/${id}`).
            then((response:any)=>{
                if (response.status === 200 && response.data) {
                    resolve(response.data.items);
                } else {
                    reject(null);
                }
            })
        })
    }
}

export default SkillService;
