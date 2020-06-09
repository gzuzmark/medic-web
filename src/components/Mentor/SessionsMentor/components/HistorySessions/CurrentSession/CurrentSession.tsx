import * as React from "react";
import { ITriageQuestion, ITriageUseCase } from "../../../../../../domain/Session/SessionMentorBean";
import PatientBlockContainer from "../../PatientBlockContainer/PatientBlockContainer";

interface IPropsCurrentSession {
  questions: ITriageQuestion[],
  useCase: ITriageUseCase,
}

const buildQuestionBlocks = (useCase: ITriageUseCase, questions: ITriageQuestion[]) => {
  if (!useCase && !questions) {
    return [];
  }
  const questionBlocks = questions.map((question: ITriageQuestion) => ({ label: question.question.toUpperCase(), value: question.answer }))
  return [
    { label: 'CASO:', value: useCase.title || '' },
    { label: 'DESCRIPCIÓN DEL CASO:', value: useCase.description || '' },
    ...questionBlocks,
  ];
};

const CurrentSession: React.FC<IPropsCurrentSession> = (props) => {

  return (
    <div className="PatientClinicHistory_info">
      <PatientBlockContainer title={'Caso del paciente'} blocks={buildQuestionBlocks(props.useCase, props.questions)} />
    </div>
  );
};

export default CurrentSession;
