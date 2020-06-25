import * as React from 'react';
import './DropdownMenu.scss';

interface IPropsDropdownMenu {
	open: boolean;
}

const DropdownMenu: React.FC<IPropsDropdownMenu> = (props) => {
	if (!props.open) {
		return null;
	}
	return <div className='DropdownMenu'>{props.children}</div>;
};

export default DropdownMenu;
