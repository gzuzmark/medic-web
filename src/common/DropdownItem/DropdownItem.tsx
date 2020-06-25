import * as React from 'react';
import './DropdownItem.scss';

interface IPropsDropdownItem {
	onClick?: () => void;
}

const DropdownItem: React.FC<IPropsDropdownItem> = (props) => {
	return (
		<span className='DropdownItem' onClick={props.onClick}>
			{props.children}
		</span>
	);
};

export default DropdownItem;
