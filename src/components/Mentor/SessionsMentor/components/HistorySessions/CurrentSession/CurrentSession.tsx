import * as React from "react";
import { buildQuestionBlocks } from "../../../../../../common/Utils/Utilities";
import { ITriageQuestion, ITriageUseCase } from "../../../../../../domain/Session/SessionMentorBean";
import PatientBlockContainer from "../../PatientBlockContainer/PatientBlockContainer";

interface IPropsCurrentSession {
  questions: ITriageQuestion[],
  useCase: ITriageUseCase,
}

const CurrentSession: React.FC<IPropsCurrentSession> = ({ useCase, questions }) => {
  const title = !!useCase && !!questions && questions.length > 0 && 'Caso del paciente' || '';
  return (
    <div className="PatientClinicHistory_info">
      <PatientBlockContainer
        title={title}
        blocks={buildQuestionBlocks(useCase, questions)}
      />
    </div>
  );
};

export default CurrentSession;
