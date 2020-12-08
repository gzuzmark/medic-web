import styled from 'styled-components';
import colors from '../../../common/MentorColor';
import { TableHeader } from '../../../common/TableMentor';

export const ToolBar = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 48px;
	& > div {
		flex-basis: 380px;
	}
`;

export const TableBody = styled.div`
	align-items: center;
	border-bottom: 1px solid ${colors.BACKGROUND_COLORS.background_disabled};
	display: flex;
	justify-content: ${(props: { center?: boolean }) =>
		props.center ? 'center' : 'flex-start'};
	height: 72px;
`;

export const TableContainer = styled.div`
	display: grid;
	grid-template-columns: 20% 20% 20% 40%;
	${TableHeader},
	${TableBody} {
		padding-left: 16px;
	}
`;

export const TableContainerExtraLarge = styled.div`
	& > div {
		display: flex;
		& > div:nth-child(1) {
			width: 20%;
		}
		& > div:nth-child(2) {
			width: 20%;
		}
		& > div:nth-child(3) {
			width: 20%;
		}
		& > div:nth-child(4) {
			width: 40%;
		}
	}
`;
