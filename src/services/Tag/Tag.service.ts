import BaseRequest from '../BaseRequest';

export interface ITags {
    id: string;
    name: string;
}

class TagService extends BaseRequest {

    public list(): Promise<ITags> {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo/mentors-api/students/tags`)
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

    public addComment(session: string, student: string, body: any) : Promise<any> {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo/mentors-api/sessions/${session}/students/${student}/tags`, body)
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

export default TagService;
