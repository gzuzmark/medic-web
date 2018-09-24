import BaseRequest from '../BaseRequest';

export interface IBase {
    id?: string,
    name: string
}

export interface IInterestAreaParent extends IBase{
    interesAreasId: string[];
}

export interface IInterestAreaSite extends IBase{
    site: string;
}

export interface IInterestAreaService {
    areas: IBase[];
    skills: IInterestAreaParent[];
    sites: IInterestAreaParent[];
    types: IBase[];
}

export interface IInterestAreaDeleteService extends IInterestAreaService{
    rooms: IInterestAreaSite[];
}

class InterestAreaService extends BaseRequest {
    public getBasicData(idMentor: string): Promise<IInterestAreaService> {
        return new Promise((resolve, reject) => {
            this.instance.get('ugo-admin/interest-areas/mentors/' + idMentor)
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

export default InterestAreaService;