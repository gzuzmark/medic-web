import * as React from "react";
import { ISessionTriage } from "../../../../../domain/Session/SessionMentorBean";
import CurrentSession from "./CurrentSession/CurrentSession";
import CurrentSessionForm from "./CurrentSessionForm/CurrentSessionForm";
import './HistorySessions.scss'

interface IPropsHistorySessions {
  triage: ISessionTriage;
}

const HistorySessions: React.FC<IPropsHistorySessions> = (props) => {
  return (
    <div className="HistorySessions">
      <CurrentSession useCase={props.triage.useCase} questions={props.triage.questions} />
      <CurrentSessionForm />
    </div>
  );
};

export default HistorySessions;
