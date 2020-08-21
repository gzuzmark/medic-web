import * as React from 'react';
import ConsoleColor from '../../../../../common/ConsoleColor';
import ConsoleModal from '../../../../../common/ConsoleModal/ConsoleModal';

import './UploadPrescriptionModal.scss';

interface IPropsUploadPrescriptionModal {
	show: boolean;
	uploadURL: string;
	onClose(): void;
}

const DEFAULT_IFRAME_WIDTH = '100%';
const DEFAULT_IFRAME_HEIGHT = '450px';

const UploadPrescriptionModal: React.FC<IPropsUploadPrescriptionModal> = ({
	show,
	onClose,
	uploadURL,
}) => {
	return (
		<ConsoleModal
			show={show}
			styles={{
				backgroundColor: ConsoleColor.TEXT_COLORS.white,
				position: 'relative',
			}}
			onCloseModal={close}
		>
			<div className='UploadPrescriptionModal ConsoleModalConfirm_body'>
				<iframe
					src={uploadURL}
					width={DEFAULT_IFRAME_WIDTH}
					height={DEFAULT_IFRAME_HEIGHT}
					title='Recipe Preview'
				/>
				<div style={{ textAlign: 'right' }}>
					<button className='u-Button u-Button--white' onClick={onClose}>
						Cerrar
					</button>
				</div>
			</div>
		</ConsoleModal>
	);
};

export default UploadPrescriptionModal;
