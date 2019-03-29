import {IArea} from "../../interfaces/Mentor.interface";
import BaseRequest from '../BaseRequest';

export interface IBase {
    id?: string,
    name: string
}

export interface IInterestAreaParent extends IBase{
    interesAreasId: string[];
}

export interface IInterestAreaSite extends IBase{
    siteId: string[];
    address: string;
}

export interface IInterestAreaBlock extends IBase {
    blockId: string;
}

export interface IInterestAreaService {
    areas: IBase[];
    skills: IInterestAreaParent[];
    sites: IInterestAreaParent[];
    blocks: IInterestAreaSite[];
    types: IBase[];
}

export interface IInterestAreaDeleteService extends IInterestAreaService{
    rooms: IInterestAreaBlock[];
}

class InterestAreaService extends BaseRequest {

    public listAreas(): Promise<IArea[]> {
        return new Promise((resolve, reject) => {
            this.instance.get('ugo-admin/interest-areas')
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
