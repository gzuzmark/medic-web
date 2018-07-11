import BaseRequest from '../BaseRequest';

class LocationService extends BaseRequest {

    public list(idArea: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo-admin/interest-areas/${idArea}/locations/tree`)
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

export default LocationService;