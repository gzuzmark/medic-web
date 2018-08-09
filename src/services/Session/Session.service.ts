import { IReportForSession } from "../../interfaces/Reports.interface";
import BaseRequest from '../BaseRequest';

class SessionService extends BaseRequest {

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
}

export default SessionService;