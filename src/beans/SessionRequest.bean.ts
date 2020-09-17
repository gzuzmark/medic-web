export interface ISessionRequestBean {
	startDate: Date;
	endDate: Date;
	reservationStartDate: Date;
	reservationEndDate: Date;
	doctorId: string;
	documentNumber: string;
}
const day = 86400000;
const initYear = 1970;
const DEFAULT_DATE_STEP = 6;
export class SessionRequestBean implements ISessionRequestBean {
	public startDate = new Date();
	public endDate = new Date();
	public reservationStartDate = new Date();
	public reservationEndDate = new Date();
	public doctorId = '';
	public documentNumber = '';

	constructor(
		sessionRequest?: ISessionRequestBean,
		isUpdatingReservation: boolean = false,
	) {
		if (sessionRequest) {
			const b = { ...sessionRequest };
			if (isUpdatingReservation) {
				const {
					start: reservationStartDate,
					end: reservationEndDate,
				} = this.getFixedDates(b.reservationStartDate, b.reservationEndDate);
				this.reservationStartDate = new Date(reservationStartDate);
				this.reservationEndDate = new Date(reservationEndDate);
				this.startDate = b.startDate;
				this.endDate = b.endDate;
			} else {
				const { start: startDate, end: endDate } = this.getFixedDates(
					b.startDate,
					b.endDate,
				);
				this.startDate = new Date(startDate);
				this.endDate = new Date(endDate);
				this.reservationStartDate = b.reservationStartDate;
				this.reservationEndDate = b.reservationEndDate;
			}
			this.doctorId = sessionRequest.doctorId;
			this.documentNumber = sessionRequest.documentNumber;
		} else {
			const startDate = new Date();
			const endDate = new Date();
			const reservationStartDate = new Date();
			const reservationEndDate = new Date();
			endDate.setDate(endDate.getDate() + DEFAULT_DATE_STEP);
			endDate.setHours(0, 0, 0, 0);
			startDate.setHours(0, 0, 0, 0);
			reservationEndDate.setDate(
				reservationEndDate.getDate() + DEFAULT_DATE_STEP,
			);
			reservationEndDate.setHours(0, 0, 0, 0);
			reservationStartDate.setHours(0, 0, 0, 0);
			this.startDate = startDate;
			this.endDate = endDate;
			this.reservationStartDate = reservationStartDate;
			this.reservationEndDate = reservationEndDate;
			this.doctorId = '';
			this.documentNumber = '';
		}
	}

	public isValid(): boolean {
		return (
			!!this.startDate &&
			!!this.endDate &&
			!!this.reservationStartDate &&
			!!this.reservationEndDate
		);
	}

	public toParams(): string {
		const from = new Date(this.startDate);
		const to = new Date(this.endDate);
		const reservationFrom = new Date(this.reservationStartDate);
		const reservationTo = new Date(this.reservationEndDate);
		from.setHours(0, 0, 0, 0);
		reservationFrom.setHours(0, 0, 0, 0);
		to.setDate(to.getDate() + 1);
		to.setHours(0, 0, 0, 0);
		reservationTo.setDate(reservationTo.getDate() + 1);
		reservationTo.setHours(0, 0, 0, 0);
		const params = {
			doctor_id: this.doctorId,
			from: from.toISOString(),
			patient_document_number: this.documentNumber,
			reservation_date_from: reservationFrom.toISOString(),
			reservation_date_to: reservationTo.toISOString(),
			to: to.toISOString(),
		};
		return Object.keys(params)
			.map((key) => {
				if (params[key]) {
					return key + '=' + encodeURIComponent(params[key]);
				}
				return null;
			})
			.filter((p) => !!p)
			.join('&');
	}

	private getFixedDates(start: Date, end: Date) {
		end.setHours(0, 0, 0, 0);
		start.setHours(0, 0, 0, 0);
		if (end < start) {
			end = start;
		} else {
			const time = end.getTime() - start.getTime();
			const diff = new Date(time + day);
			const years = diff.getFullYear() - initYear;
			if (years >= 1) {
				const startDate = new Date(start);
				startDate.setFullYear(start.getFullYear() + 1);
				startDate.setDate(startDate.getDate() - 1);
				end = startDate;
			}
		}
		return { start, end };
	}
}
