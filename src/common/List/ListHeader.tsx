import * as React from 'react';
import { Small1 } from '../MentorText';

interface IPropsListHeader {
	baseClass: string;
	header: string[];
}

const ListHeader: React.FC<IPropsListHeader> = React.memo((props) => {
	return (
		<React.Fragment>
			<div className={`${props.baseClass}`}>
				<div
					className={`${props.baseClass}_header u-LayoutMargin u-${
						props.baseClass
					}_padding`}
				>
					{props.header.map((item, index) => {
						return (
							<div
								className={`${props.baseClass}_column`}
								key={'header-' + index}
							>
								<Small1 color={"#fff"}>{item}</Small1>
							</div>
						);
					})}
				</div>
			</div>
			<hr className={`${props.baseClass}_line`} />
		</React.Fragment>
	);
});

export default ListHeader;
