import * as React from "react";
import { buildQuestionBlocks } from "../../../../../../common/Utils/Utilities";
import { ITriageQuestion, ITriageUseCase } from "../../../../../../domain/Session/SessionMentorBean";
import PatientBlockContainer from "../../PatientBlockContainer/PatientBlockContainer";

interface IPropsCurrentSession {
  questions: ITriageQuestion[],
  useCase: ITriageUseCase,
}

const CurrentSession: React.FC<IPropsCurrentSession> = (props) => {
  return (
    <div className="PatientClinicHistory_info">
      <PatientBlockContainer
        title={'Caso del paciente'}
        blocks={buildQuestionBlocks(props.useCase, props.questions)}
      />
    </div>
  );
};

export default CurrentSession;
