import * as React from 'react';
import { ButtonNormal } from '../../../common/Buttons/Buttons';
import FormColumn from '../../../common/FormRow/components/FormColumn/FormColumn';
import FormRow from '../../../common/FormRow/FormRow';
import MenuAside from '../../../common/Layout/components/MenuAside/MenuAside';
import Layout from '../../../common/Layout/Layout';
import ListHeader from '../../../common/List/ListHeader';
import Loader from '../../../common/Loader/Loader';
import colors, { FONTS } from '../../../common/MentorColor';
import MentorInput from '../../../common/MentorInput/MentorInput';
import { Headline1 } from '../../../common/MentorText';
import Sticky from '../../../common/Sticky/Sticky';
import { ICoupon } from '../../../domain/Coupon/Coupon';
import CouponService from '../../../services/Coupon/Coupon.service';
import FormSection from '../ScheduleSession/components/FormSection/FormSection';
import DeleteCouponModal from './components/DeleteCouponModal/DeleteCouponModal';
import ListCouponsBody from './components/ListCouponsBody/ListCouponsBody';
import UpdateCouponModal from './components/UpdateCouponModal/UpdateCouponModal';
import './CouponsList.scss';

const DEFAULT_STICKY_HEIGHT = 220;
const DEFAULT_STICKY_TOP = 80;
const TABLE_HEADER_TEXTS = [
	'CÓDIGO',
	'NOMBRE',
	'PORCENTAJE',
	'USOS MÁXIMOS',
	'EDITAR',
	'ELIMINAR',
];

const CouponsList: React.FC<{}> = () => {
	const [query, setQuery] = React.useState<string>('');
	const [coupons, setCoupons] = React.useState<ICoupon[]>([]);
	const [filteredCoupons, setFilteredCoupons] = React.useState<ICoupon[]>([]);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [showUpdateModal, setShowUpdateModal] = React.useState<boolean>(false);
	const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
	const [selectedCoupon, setSelectedCoupon] = React.useState<ICoupon | null>(
		null,
	);

	const couponService = new CouponService();

	const handleQueryChange = (e: any) => {
		const value = e.target.value;
		const filtered = coupons.filter(({ code }: ICoupon) =>
			code.toLowerCase().includes(value.toLowerCase()),
		);
		setQuery(value);
		setFilteredCoupons(filtered);
	};

	const handleAddCoupon = () => setShowUpdateModal(true);

	const openUpdateModal = (coupon?: ICoupon) => {
		if (!!coupon) {
			setSelectedCoupon(coupon);
		}
		setShowUpdateModal(true);
	};

	const openDeleteModal = (coupon?: ICoupon) => {
		if (!!coupon) {
			setSelectedCoupon(coupon);
		}
		setShowDeleteModal(true);
	};

	const onCloseUpdateModal = () => {
		setSelectedCoupon(null);
		setShowUpdateModal(false);
	};

	const onCloseDeleteModal = () => {
		setSelectedCoupon(null);
		setShowDeleteModal(false);
	};

	const onConfirmUpdateCoupon = async (coupon: ICoupon) => {
		try {
			setSelectedCoupon(null);
			setShowUpdateModal(false);
			const isCreating = !coupon.id;
			let retrievedCoupon = {} as ICoupon;
			let newCoupons = [];
			if (isCreating) {
				retrievedCoupon = (await couponService.create(coupon)) as ICoupon;
				newCoupons = [...coupons, retrievedCoupon] as ICoupon[];
			} else {
				retrievedCoupon = (await couponService.update(coupon)) as ICoupon;
				newCoupons = coupons.map((c: ICoupon) =>
					c.id === retrievedCoupon.id ? retrievedCoupon : c,
				);
			}
			setCoupons(newCoupons);
			setFilteredCoupons(newCoupons);
		} catch (e) {
			setSelectedCoupon(null);
			setShowDeleteModal(false);
		}
	};

	const deleteCoupon = async () => {
		const couponId = selectedCoupon && selectedCoupon.id;
		try {
			if (couponId) {
				setSelectedCoupon(null);
				setShowDeleteModal(false);
				const id = await couponService.delete(couponId);
				const newCoupons = coupons.filter((c) => c.id !== id);
				setCoupons(newCoupons);
				setFilteredCoupons(newCoupons);
			}
		} catch (e) {
			setSelectedCoupon(null);
			setShowDeleteModal(false);
		}
	};

	React.useEffect(() => {
		setLoading(true);
		couponService
			.list()
			.then((list: ICoupon[]) => {
				setLoading(false);
				setCoupons(list);
				setFilteredCoupons(list);
			})
			.catch((e) => {
				setLoading(false);
				setCoupons([]);
				setFilteredCoupons([]);
			});
		return () => {
			window.scrollTo(0, 0);
		};
	}, []);

	const renderTopMenu = () => (
		<Sticky
			height={DEFAULT_STICKY_HEIGHT}
			top={DEFAULT_STICKY_TOP}
			style={{ background: 'white' }}
		>
			<MenuAside
				icon={'paper-pencil'}
				items={[{ text: 'Cupones', url: '/coupons' }]}
			/>
			<div className='u-LayoutMargin u-ListCoupons_padding ListCoupons_sticky'>
				<FormSection style={{ display: 'block' }} itemStyle={{ width: 650 }}>
					<FormRow
						columns={[
							<FormColumn key='queryInput' width={2}>
								<MentorInput
									disabled={coupons.length === 0}
									attrs={{
										maxLength: 50,
										onChange: handleQueryChange,
										placeholder: 'Ingresa el código del cupón',
										value: query,
									}}
								/>
							</FormColumn>,
						]}
					/>
				</FormSection>
				<ButtonNormal
					text={'Agregar Cupón'}
					attrs={{ onClick: handleAddCoupon }}
				/>
			</div>
			<ListHeader header={TABLE_HEADER_TEXTS} baseClass='ListCoupons' />
		</Sticky>
	);

	const listCoupons = () => {
		const noResults = !loading && filteredCoupons.length === 0;
		const renderNoResults = () => (
			<div className='ListCoupons_row ListCoupons_row--center'>
				<Headline1 color={FONTS.medium}>No hay resultados</Headline1>
			</div>
		);
		const renderLoader = () => (
			<div className='ListCoupons_row ListCoupons_row--center'>
				<Loader />
			</div>
		);

		return (
			<div className='ListCoupons_body u-LayoutMargin'>
				{!loading && noResults && renderNoResults()}
				{loading && noResults && renderLoader()}
				{filteredCoupons.length > 0 &&
					filteredCoupons.map((item: ICoupon) => {
						const withRowStyle = {
							borderBottom: `1px solid ${colors.MISC_COLORS.background_grey_2}`,
						};
						return (
							<div
								key={'list-patient-row' + item.code}
								className={`ListCoupons_row ListCoupons_row--border u-ListCoupons_padding`}
								style={{ ...withRowStyle }}
							>
								<ListCouponsBody
									deleteCoupon={openDeleteModal}
									updateCoupon={openUpdateModal}
									coupon={item}
								/>
							</div>
						);
					})}
				<UpdateCouponModal
					show={showUpdateModal}
					coupon={selectedCoupon}
					onClose={onCloseUpdateModal}
					confirm={onConfirmUpdateCoupon}
				/>
				<DeleteCouponModal
					show={showDeleteModal}
					onClose={onCloseDeleteModal}
					confirm={deleteCoupon}
				/>
			</div>
		);
	};

	return (
		<Layout menu={renderTopMenu()}>
			<div className='ListCoupons'>
				{loading && (
					<div className='ListCoupons_row ListCoupons_row--center'>
						<Loader />
					</div>
				)}
				{listCoupons()}
			</div>
		</Layout>
	);
};

export default CouponsList;
