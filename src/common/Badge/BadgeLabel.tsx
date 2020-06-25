import * as React from 'react';
import './BadgeLabel.scss';

interface IPropsBadgeLabel {
	color: string;
}

const BadgeLabel: React.FC<IPropsBadgeLabel> = (props) => {
	return (
		<span className={`BadgeLabel BadgeLabel-${props.color}`}>
			{props.children}
		</span>
	);
};
export default BadgeLabel;
