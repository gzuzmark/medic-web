import * as React from 'react';
import ConsoleColor from '../../../../../common/ConsoleColor';
import ConsoleModal from '../../../../../common/ConsoleModal/ConsoleModal';
import { Title2 } from '../../../../../common/ConsoleText';

import './PatientPhotosModal.scss';

interface IPropsPatientPhotosModal {
	show: boolean;
	style?: React.CSSProperties;
	photos: string[] | null;
	onClose(): void;
}

const buttonStyle = {
	height: '55px',
	marginRight: '5px',
	paddingBottom: '10px',
	paddingLeft: '5px',
	paddingTop: '10px',
};

const PatientPhotosModal: React.FC<IPropsPatientPhotosModal> = ({
	show,
	onClose,
	photos,
}) => {
	return (
		<ConsoleModal
			show={show}
			styles={{
				backgroundColor: ConsoleColor.TEXT_COLORS.white,
				maxWidth: '100%',
				position: 'relative',
				width: '1400px',
			}}
			onCloseModal={onClose}
		>
			<div className='ConsoleModalConfirm_header'>
				<Title2>Fotos del Paciente</Title2>
				<small>(Haz click en la imagen para abrirla en otra pestaña)</small>
			</div>
			<div className='PatientPhotosModal ConsoleModalConfirm_body'>
				{!!photos && (
					<div className='PatientPhotosModal_images'>
						{photos.map((p, i) => (
							<div className='PatientPhotosModal_image' key={`photo_${i}`}>
								<a className='PatientPhotosModal_src' href={p} target='_blank'>
									<img src={p} alt='' />
								</a>
							</div>
						))}
					</div>
				)}
				{!photos && (
					<div>
						<h2>El paciente no tiene fotos adjuntadas</h2>
					</div>
				)}
			</div>
			<div className='PatientPhotosModal_buttons'>
				<button
					className='u-Button u-Button--white'
					onClick={onClose}
					style={buttonStyle}
				>
					Cerrar
				</button>
			</div>
		</ConsoleModal>
	);
};

export default PatientPhotosModal;
