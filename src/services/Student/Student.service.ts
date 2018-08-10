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
}

export default StudentService;