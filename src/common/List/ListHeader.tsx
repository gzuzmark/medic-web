import * as React from 'react';
import { Small2 } from '../MentorText';

interface IPropsListHeader {
	baseClass: string;
	header: string[];
}

const ListHeader: React.FC<IPropsListHeader> = React.memo((props) => {
	return (
		<React.Fragment>
			<div className={`${props.baseClass}`}>
				<div
					className={`${props.baseClass}_header ${
						props.baseClass
					}_margin`}
				>
					{props.header.map((item, index) => {
						return (
							<div
								className={`${props.baseClass}_column`}
								key={'header-' + index}
							>
								<Small2 color={"#fff"}>{item}</Small2>
							</div>
						);
					})}
				</div>
			</div>
		</React.Fragment>
	);
});

export default ListHeader;
