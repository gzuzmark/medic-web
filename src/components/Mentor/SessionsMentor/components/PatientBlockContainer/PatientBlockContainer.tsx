import * as React from 'react';
import { Body1, Headline1 } from '../../../../../common/MentorText';
import './PatientBlockContainer.scss';

interface IPropsPatientBlockContainer {
  title?: string,
  blocks: object[],
}

interface IPropsPatientBlockInfo {
  label: string,
  value: string,
}

const PatientBlockInfo: React.FC<IPropsPatientBlockInfo> = ({ label, value }) => (
  <div>
      <Body1 color="font_disabled">{label}</Body1>
      <Body1 weight="500">{value}</Body1>
  </div>
);

const PatientBlockContainer: React.FC<IPropsPatientBlockContainer> = ({ title, blocks }) => {
  return (
    <div className="PatientBlockContainer">
      {!!title && <Headline1>{title}</Headline1>}
      <div className="PatientBlockContainer_body">
        {blocks.map((block: IPropsPatientBlockInfo, i: number) => 
          <PatientBlockInfo
            key={i}
            label={block.label}
            value={block.value}
          />
        )}
      </div>
  </div>
  )
};

export default PatientBlockContainer;
