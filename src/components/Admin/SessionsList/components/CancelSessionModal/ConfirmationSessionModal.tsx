import * as React from 'react';
import ConsoleModalConfirm from '../../../../../common/ConsoleModal/ConsoleModalConfirm';
import './ConfirmationSessionModal.scss';

interface IConfirmationCancelSessionModal {
	title: string;
	show: boolean;
	style?: React.CSSProperties;
	toggleModal(show: boolean): void;
	confirm(): void;
}

const ConfirmationSessionModal: React.FC<IConfirmationCancelSessionModal> = (
	props,
) => {
	const cancel = () => props.toggleModal(false);

	return (
		<ConsoleModalConfirm
			show={props.show}
			onCloseModal={cancel}
			title={props.title}
		>
			<div>
				<div className='ConfirmationSessionModal_buttons'>
					<button className='u-Button u-Button--white' onClick={cancel}>
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

export default ConfirmationSessionModal;
