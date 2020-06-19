import * as React from 'react';
import styled from 'styled-components';
import Icon from '../../../../../common/Icon/Icon';
import colors, { FONTS } from '../../../../../common/MentorColor';
import { Subhead1 } from '../../../../../common/MentorText';
import { ICoupon } from '../../../../../domain/Coupon/Coupon';

const ContainerRow = styled.div`
	align-items: center;
	display: flex;
	width: 100%;
	.icon-exclamation {
		fill: ${colors.BACKGROUND_COLORS.background_green};
		&:hover {
			fill: ${colors.BACKGROUND_COLORS.background_dark_green};
		}
		&:focus {
			fill: ${colors.BACKGROUND_COLORS.background_dark_green};
		}
	}
`;

interface IPropsListCouponsBody {
	coupon: ICoupon;
	deleteCoupon: (coupon?: ICoupon) => void;
	updateCoupon: (coupon?: ICoupon) => void;
}

const ListCouponsBody: React.FC<IPropsListCouponsBody> = ({
	coupon,
	deleteCoupon,
	updateCoupon,
}) => {
	const { name = '', code = '', percentage = 0, limit = '' } = coupon || {};
	const handleEdit = () => updateCoupon(coupon);
	const handleDelete = () => deleteCoupon(coupon);
	return (
		<ContainerRow>
			<div className='ListCoupons_column ListCoupons_column--cell'>
				{code && <Subhead1 color={FONTS.dark}>{code}</Subhead1>}
			</div>
			<div className='ListCoupons_column'>
				{name && <Subhead1 color={FONTS.dark}>{name}</Subhead1>}
			</div>
			<div className='ListCoupons_column ListCoupons_column--cell'>
				{percentage && <Subhead1 color={FONTS.dark}>{percentage}%</Subhead1>}
			</div>
			<div className='ListCoupons_column ListCoupons_column--cell'>
				{limit && <Subhead1 color={FONTS.dark}>{limit}</Subhead1>}
			</div>
			<div className='ListCoupons_column ListCoupons_column--cell'>
				<Icon
					name='pencil'
					click={handleEdit}
					attr={{ 'data-tip': 'Editar' }}
					style={{ cursor: 'pointer', fill: '#1ECD96' }}
				/>
			</div>
			<div className='ListCoupons_column ListCoupons_column--cell'>
				<Icon
					name='trash'
					click={handleDelete}
					attr={{ 'data-tip': 'Eliminar' }}
					style={{ cursor: 'pointer', fill: '#1ECD96' }}
				/>
			</div>
		</ContainerRow>
	);
};

export default ListCouponsBody;
