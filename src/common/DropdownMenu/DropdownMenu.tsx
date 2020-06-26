import * as React from 'react';
import './DropdownMenu.scss';

interface IPropsDropdownMenu {
	open: boolean;
	position?: string;
}

const DropdownMenu: React.FC<IPropsDropdownMenu> = (props) => {
	if (!props.open) {
		return null;
	}
	const position = props.position || 'left';
	return (
		<div className={`DropdownMenu DropdownMenu-${position}`}>
			{props.children}
		</div>
	);
};

export default DropdownMenu;
