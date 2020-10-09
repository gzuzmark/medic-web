import * as React from 'react';
import ConsoleColor from '../../../../../../../common/ConsoleColor';
import ConsoleModal from '../../../../../../../common/ConsoleModal/ConsoleModal';

import './PatientPhotoModal.scss';

interface IPropsPatientPhotoModal {
	show: boolean;
	style?: React.CSSProperties;
	photo: string;
	onClose(): void;
}

const buttonStyle = {
	height: '55px',
	marginRight: '5px',
	paddingBottom: '10px',
	paddingLeft: '5px',
	paddingTop: '10px',
};

const PatientPhotoModal: React.FC<IPropsPatientPhotoModal> = ({
	show,
	onClose,
	photo,
}) => {
	const [isZoomed, setIsZoomed] = React.useState(false);
	const onZoomIn = () => setIsZoomed(true);
	const onZoomOut = () => setIsZoomed(false);

	const imageClass = `PatientPhotoModal_${isZoomed ? 'zoomed' : 'normal'}`;
	const onClickImage = isZoomed ? onZoomOut : onZoomIn;
	return (
		<ConsoleModal
			show={show}
			styles={{
				backgroundColor: ConsoleColor.TEXT_COLORS.white,
				maxWidth: '100%',
				position: 'relative',
				width: '900px',
			}}
			onCloseModal={onClose}
		>
			<div className='ConsoleModalConfirm_header PatientPhotoModal_header'>
				<button
					className='u-Button u-Button--white PatientPhotoModal_close'
					onClick={onClose}
					style={buttonStyle}
				>
					x
				</button>
			</div>
			<div className='PatientPhotoModal ConsoleModalConfirm_body'>
				<img className={imageClass} src={photo} alt='' onClick={onClickImage} />
			</div>
			<div className='PatientPhotoModal_buttons' />
		</ConsoleModal>
	);
};

export default PatientPhotoModal;
