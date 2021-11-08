import BaseRequest from '../BaseRequest';

class MedicalLeaveService extends BaseRequest {
	public async getMedicalLeavePdf(sessionId: string): Promise<string> {
		const response = await this.instance.get(`ugo/patient-api/medical-leave/${sessionId}`)
        return response.data.data
	}
}

export default MedicalLeaveService;
