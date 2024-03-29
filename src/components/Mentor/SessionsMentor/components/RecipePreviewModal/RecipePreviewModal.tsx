import * as React from 'react';
import ConsoleColor from '../../../../../common/ConsoleColor';
import ConsoleModal from '../../../../../common/ConsoleModal/ConsoleModal';
import { Title2 } from '../../../../../common/ConsoleText';
import Icon from '../../../../../common/Icon/Icon';

import './RecipePreviewModal.scss';

interface IPropsRecipePreviewModal {
	loading: boolean;
	show: boolean;
	style?: React.CSSProperties;
	recipeURL: string;
	uploadURL: string;
	onClose(): void;
	onDownloadRecipe(): void;
	onUploadRecipe(): void;
}

const DEFAULT_IFRAME_WIDTH = '100%';
const DEFAULT_IFRAME_HEIGHT = 900;

const buttonStyle = {
	height: '55px',
	marginRight: '5px',
	paddingBottom: '10px',
	paddingLeft: '5px',
	paddingTop: '10px',
};

const RecipePreviewModal: React.FC<IPropsRecipePreviewModal> = ({
	loading,
	show,
	onClose,
	recipeURL,
	uploadURL,
	onDownloadRecipe,
	onUploadRecipe,
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
			onCloseModal={close}
		>
			<div className='ConsoleModalConfirm_header'>
				<Title2>Receta Médica Electrónica</Title2>
			</div>
			<div className='RecipePreviewModal ConsoleModalConfirm_body'>
				<iframe
					src={recipeURL}
					width={DEFAULT_IFRAME_WIDTH}
					height={DEFAULT_IFRAME_HEIGHT}
					title='Recipe Preview'
				/>
			</div>
			<div>
				<div className='RecipePreviewModal_messages'>
					<div>
						<b>Reevisa que todos los datos sean correctos</b>
					</div>
					<div>Descarga la receta para aplicar tu firma digital</div>
				</div>
				<div className='RecipePreviewModal_buttons'>
					<button
						className='u-Button u-Button--white'
						onClick={onClose}
						style={buttonStyle}
					>
						Editar Tratamiento
					</button>
					<button
						disabled={loading}
						onClick={onDownloadRecipe}
						className='u-Button'
						style={buttonStyle}
					>
						<Icon style={{ height: '40px', width: '50px' }} name={'download'} />{' '}
						{loading ? 'Descargando Receta ' : 'Confirma y descarga para firmar '}
					</button>
					<button
						onClick={onUploadRecipe}
						className='u-Button'
						disabled={!uploadURL}
						style={buttonStyle}
					>
						<Icon
							style={{ height: '80px', width: '50px', fill: '#fff' }}
							name={'upload'}
						/>
						Sube la receta firmada
					</button>
				</div>
			</div>
		</ConsoleModal>
	);
};

export default RecipePreviewModal;
