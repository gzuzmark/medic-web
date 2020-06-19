import * as React from 'react';
import ConsoleModalConfirm from '../../../../../common/ConsoleModal/ConsoleModalConfirm';
import './DeleteCouponModal.scss';

interface IPropsDeleteCouponModal {
	show: boolean;
	style?: React.CSSProperties;
	onClose(): void;
	confirm(): void;
}

const DeleteCouponModal: React.FC<IPropsDeleteCouponModal> = (props) => {
	return (
		<ConsoleModalConfirm
			show={props.show}
			onCloseModal={props.onClose}
			title={'¿Estás seguro que desea eliminar el cupón?'}
		>
			<div>
				<div className='DeleteCouponModal_buttons'>
					<button className='u-Button u-Button--white' onClick={props.onClose}>
						Cancelar
					</button>
					<button className='u-Button' onClick={props.confirm}>
						Aceptar
					</button>
				</div>
			</div>
		</ConsoleModalConfirm>
	);
};

export default DeleteCouponModal;
