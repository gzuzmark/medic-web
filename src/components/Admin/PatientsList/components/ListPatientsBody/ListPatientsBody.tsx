import * as React from 'react';
import styled from 'styled-components';
import colors, { FONTS } from '../../../../../common/MentorColor';
import { Subhead1 } from '../../../../../common/MentorText';
import { ISessionPatient } from '../../../../../domain/Session/SessionMentorBean';

const ContainerRow = styled.div`
	align-items: center;
	display: flex;
	width: 100%;
	.icon-exclamation {
		fill: ${colors.BACKGROUND_COLORS.background_green};
		&:hover {
			fill: ${colors.BACKGROUND_COLORS.background_dark_green};
		}
		&:focus {
			fill: ${colors.BACKGROUND_COLORS.background_dark_green};
		}
	}
`;

interface IPropsListPatientsBody {
	patient: ISessionPatient;
}

const ListPatientsBody: React.FC<IPropsListPatientsBody> = ({ patient }) => {
	const {
		document_number = '',
		name = '',
		full_last_name = '',
		phone = '',
		email = '',
	} = patient || {};
	return (
		<ContainerRow>
			<div className="ListPatients_column ListPatients_column--cell">
				<Subhead1>{document_number || ''}</Subhead1>
			</div>

			<div className="ListPatients_column ListPatients_column--cell">
				{name && <Subhead1 color={FONTS.dark}>{name}</Subhead1>}
			</div>
			<div className="ListPatients_column ListPatients_column--cell">
				{full_last_name && (
					<Subhead1 color={FONTS.dark}>{full_last_name}</Subhead1>
				)}
			</div>
			<div className="ListPatients_column ListPatients_column--cell">
				{phone && <Subhead1 color={FONTS.dark}>{phone}</Subhead1>}
			</div>
			<div className="ListPatients_column ListPatients_column--cell">
				{email && <Subhead1 color={FONTS.dark}>{email}</Subhead1>}
			</div>
		</ContainerRow>
	);
};

export default ListPatientsBody;
