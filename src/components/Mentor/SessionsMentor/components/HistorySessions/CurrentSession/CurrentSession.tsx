import * as React from "react";
import { ITriageQuestion, ITriageUseCase } from "../../../../../../domain/Session/SessionMentorBean";
import PatientBlockContainer from "../../PatientBlockContainer/PatientBlockContainer";

interface IPropsCurrentSession {
  questions: ITriageQuestion[],
  useCase: ITriageUseCase,
}

const ISSUE_LEVELS = {
  moderate: 'Moderado',
  slight: 'Leve',
  strong: 'Grave',
};

const ISSUE_LEVEL_KEYWORDS = ['QUÉ', 'TAN', 'FUERTE', 'MALESTAR'];
const FOR_WHOM_KEYWORDS = ['PARA', 'QUIÉN', 'CONSULTA'];

const checkRightQuestion = (word: string, kws: string[]): boolean => kws.every(kw => word.includes(kw))

const handleQuestionObject = (questionObj: ITriageQuestion) => {
  const label = questionObj.question.toUpperCase();
  const isRightQuestion = checkRightQuestion(label, ISSUE_LEVEL_KEYWORDS);
  const value = isRightQuestion ? ISSUE_LEVELS[questionObj.answer] : questionObj.answer;
  return { label, value };
};

const buildQuestionBlocks = (useCase: ITriageUseCase, questions: ITriageQuestion[]) => {
  if (!useCase && !questions) {
    return [];
  }
  const filteredQuestions = questions.filter((q: ITriageQuestion) => !checkRightQuestion(q.question.toUpperCase(), FOR_WHOM_KEYWORDS))
  const questionBlocks = filteredQuestions.map((question: ITriageQuestion) => handleQuestionObject(question));
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
