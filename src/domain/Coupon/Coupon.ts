export interface ICoupon {
	id?: string;
	name: string;
	code: string;
	percentage: number;
	limit: string;
	used: string;
}

export interface ICouponForm {
	name: string;
	code: string;
	percentage: string;
	limit: string;
}
