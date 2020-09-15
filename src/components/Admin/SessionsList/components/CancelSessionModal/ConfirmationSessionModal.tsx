import * as React from 'react';
import ConsoleModalConfirm from '../../../../../common/ConsoleModal/ConsoleModalConfirm';
import MentorTextArea from '../../../../../common/MentorTextArea/MentorTextArea';
import './ConfirmationSessionModal.scss';

interface IConfirmationCancelSessionModal {
	title: string;
	show: boolean;
	style?: React.CSSProperties;
	toggleModal(show: boolean): void;
	confirm(notes: string): void;
	haveReason?: boolean;
}

const ConfirmationSessionModal: React.FC<IConfirmationCancelSessionModal> = (
	props,
) => {
	const [notes, setNotes] = React.useState<string>('');
	const cancel = () => {
		setNotes('');
		props.toggleModal(false);
	};
	const handleConfirm = () => {
		props.confirm(notes);
		setNotes('');
	};
	const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setNotes(e.target.value);
	return (
		<ConsoleModalConfirm
			show={props.show}
			onCloseModal={cancel}
			title={props.title}
		>
			<div>
				{!!props.haveReason && (
					<div className='ConfirmationSessionModal_notesblock'>
						<MentorTextArea
							label='Motivo:'
							attrs={{
								onChange: handleNotesChange,
								rows: 5,
								style: { height: 'auto' },
								value: notes,
							}}
						/>
					</div>
				)}
				<div className='ConfirmationSessionModal_buttons'>
					<button className='u-Button u-Button--white' onClick={cancel}>
						Cancelar
					</button>
					<button className='u-Button' onClick={handleConfirm}>
						Aceptar
					</button>
				</div>
			</div>
		</ConsoleModalConfirm>
	);
};

export default ConfirmationSessionModal;
