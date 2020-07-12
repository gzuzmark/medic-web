import * as React from 'react';
import Loader from '../Loader/Loader';
import './DropdownMenu.scss';

interface IPropsDropdownMenu {
	open: boolean;
	position?: string;
	loading?: boolean;
}

const DropdownMenu: React.FC<IPropsDropdownMenu> = (props) => {
	if (!props.open) {
		return null;
	}
	const loading = props.loading || false;
	const position = props.position || 'left';
	return (
		<div className={`DropdownMenu DropdownMenu-${position}`}>
			{loading && <Loader size={10} />}
			{!loading && props.children}
		</div>
	);
};

export default DropdownMenu;
