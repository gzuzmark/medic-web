import * as React from 'react';
import { buildQuestionBlocks } from '../../../../../../common/Utils/Utilities';
import {
	ITriageQuestion,
	ITriageUseCase,
} from '../../../../../../domain/Session/SessionMentorBean';
import PatientBlockContainer from '../../PatientBlockContainer/PatientBlockContainer';

interface IPropsCurrentSession {
	title: string;
	questions: ITriageQuestion[];
	useCase: ITriageUseCase;
}

const CurrentSession: React.FC<IPropsCurrentSession> = ({
	title,
	useCase,
	questions,
}) => {
	return (
		<div className='PatientClinicHistory_info'>
			<PatientBlockContainer
				title={title}
				blocks={buildQuestionBlocks(useCase, questions)}
			/>
		</div>
	);
};

export default CurrentSession;
