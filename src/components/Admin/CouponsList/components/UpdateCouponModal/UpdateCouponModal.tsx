import { Formik } from 'formik';
import * as React from 'react';
import ConsoleColor from '../../../../../common/ConsoleColor';
import ConsoleModal from '../../../../../common/ConsoleModal/ConsoleModal';
import { Title2 } from '../../../../../common/ConsoleText';
import MentorInput from '../../../../../common/MentorInput/MentorInput';
import { ICoupon, ICouponForm } from '../../../../../domain/Coupon/Coupon';
import couponFormValidationSchema from '../../../../../domain/Coupon/CouponFormValidation';

import './UpdateCouponModal.scss';

interface IPropsUpdateCouponModal {
	show: boolean;
	style?: React.CSSProperties;
	coupon?: ICoupon | null;
	onClose(): void;
	confirm(coupon: ICoupon): void;
}

const couponFormDefault = {
	code: '',
	limit: '',
	name: '',
	percentage: '',
};

const mapDataToForm = (coupon: ICoupon): ICouponForm => ({
	code: coupon.code,
	limit: coupon.limit,
	name: coupon.name,
	percentage: `${coupon.percentage}`,
});

const UpdateCouponModal: React.FC<IPropsUpdateCouponModal> = ({
	show,
	onClose,
	confirm,
	coupon = null,
}) => {
	const isEditing = !!coupon;
	const initialCoupon = !!coupon ? mapDataToForm(coupon) : couponFormDefault;

	const onFormSubmit = (values: ICouponForm) => {
		const newCoupon = {
			code: values.code,
			limit: values.limit,
			name: values.name,
			percentage: +values.percentage,
		} as ICoupon;
		if (!!coupon) {
			newCoupon.id = coupon.id;
		}
		confirm(newCoupon);
	};

	return (
		<ConsoleModal
			show={show}
			styles={{
				backgroundColor: ConsoleColor.TEXT_COLORS.white,
				position: 'relative',
			}}
			onCloseModal={close}
		>
			<div className='ConsoleModalConfirm_header'>
				<Title2>{isEditing ? 'Editando' : 'Creando'} Cupón</Title2>
			</div>
			<div className='UpdateCouponModal ConsoleModalConfirm_body'>
				<Formik
					initialValues={initialCoupon}
					enableReinitialize={true}
					isInitialValid={false}
					validationSchema={couponFormValidationSchema}
					onSubmit={onFormSubmit}
				>
					{({
						values,
						errors,
						touched,
						handleBlur,
						handleChange,
						handleSubmit,
					}: any) => {
						return (
							<form id='couponForm' onSubmit={handleSubmit}>
								<div className='UpdateCouponModal_inputblock'>
									<MentorInput
										label={'Código:'}
										lowercaseLabel={true}
										error={touched.code && errors.code}
										attrs={{
											name: 'code',
											onBlur: handleBlur,
											onChange: handleChange,
											value: values.code,
										}}
									/>
								</div>
								<div className='UpdateCouponModal_inputblock'>
									<MentorInput
										label={'Nombre:'}
										lowercaseLabel={true}
										error={touched.name && errors.name}
										attrs={{
											name: 'name',
											onBlur: handleBlur,
											onChange: handleChange,
											value: values.name,
										}}
									/>
								</div>
								<div className='UpdateCouponModal_inputblock'>
									<MentorInput
										label={'Porcentaje:'}
										lowercaseLabel={true}
										error={touched.percentage && errors.percentage}
										attrs={{
											name: 'percentage',
											onBlur: handleBlur,
											onChange: handleChange,
											value: values.percentage,
										}}
									/>
								</div>
								<div className='UpdateCouponModal_inputblock'>
									<MentorInput
										label={'Máximo de usos:'}
										lowercaseLabel={true}
										error={touched.limit && errors.limit}
										attrs={{
											name: 'limit',
											onBlur: handleBlur,
											onChange: handleChange,
											value: values.limit,
										}}
									/>
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
			<div className='UpdateCouponModal_buttons'>
				<button className='u-Button u-Button--white' onClick={onClose}>
					Cancelar
				</button>
				<button type='submit' form='couponForm' className='u-Button'>
					Aceptar
				</button>
			</div>
		</ConsoleModal>
	);
};

export default UpdateCouponModal;
