import { ICoupon } from '../../domain/Coupon/Coupon';
import BaseRequest from '../BaseRequest';

class CouponService extends BaseRequest {
	public list() {
		return new Promise((resolve, reject) => {
			this.instance
				.get('ugo-admin/coupons')
				.then((response: any) => {
					if (response.status === 200 && response.data) {
						const items: ICoupon = response.data.items;
						resolve(items);
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

	public create(coupon: ICoupon) {
		return new Promise((resolve, reject) => {
			this.instance
				.post('ugo-admin/coupons', coupon)
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

	public update(coupon: ICoupon) {
		return new Promise((resolve, reject) => {
			this.instance
				.put(`ugo-admin/coupons/${coupon.id}`, coupon)
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

	public delete(couponId: string) {
		return new Promise((resolve, reject) => {
			this.instance
				.delete(`ugo-admin/coupons/${couponId}`)
				.then((response: any) => {
					if (response.status === 204) {
						resolve(couponId);
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

export default CouponService;
