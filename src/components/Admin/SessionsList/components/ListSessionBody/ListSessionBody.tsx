import * as React from 'react';
import styled from "styled-components";
import { TextBold1 } from '../../../../../common/ConsoleText';
import Icon from "../../../../../common/Icon/Icon";
import colors, { FONTS } from "../../../../../common/MentorColor";
import { Heading3, LIGHT_TEXT, Subhead1 } from '../../../../../common/MentorText';
import {MomentDateParser} from "../../../../../domain/DateManager/MomentDateParser";
import {ISessionBody, SessionBean} from "../../../../../domain/Session/SessionBean";
import SessionItem from '../SessionItem/SessionItem';

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

interface IPropsListSessionsBody {
  session: ISessionBody;
  showCancelModal: (shouldShow: boolean) => void;
  selectSession: (sessionId: string) => void;
  showRescheduleModal: (shouldShow: boolean) => void;
}

class ListSessionsBody extends React.Component <IPropsListSessionsBody, {}> {
  constructor(props: IPropsListSessionsBody) {
    super(props);
  }

  public render() {
    const {
      doctor,
      patient,
      id = '',
      patient_link = '',
    } = this.props.session;
    const sessionBean = new SessionBean(this.props.session);

    const doctorId = doctor && doctor.id || '';
    const doctorName = doctor && doctor.name || '';
    const doctorLN = doctor && doctor.last_name || '';

    const sessionURL = patient_link;
    const patientURL = sessionURL && id && `${sessionURL}/${doctorId}`;
    const patientDoc = patient && patient.document_number;

    const patientId = patient && patient.id || '';
    const patientName = patient && patient.name || '';
    const patientLN = patient && patient.last_name || '';
    // const handleCancelClick = () => {
    //   this.props.selectSession(id);
    //   this.props.showCancelModal(true);
    // };
    const handleRescheduleClick = () => {
      this.props.selectSession(id);
      this.props.showRescheduleModal(true);
    };
    return (
      <ContainerRow>
        <div className="ListSessions_column ListSessions_column--date">
          <Heading3
            weight={LIGHT_TEXT}
            color={FONTS.dark}>
            {sessionBean.getShorterDay(new MomentDateParser())}
          </Heading3>
          <TextBold1>{sessionBean.getFromTime(new MomentDateParser())}</TextBold1>
        </div>
        <div className="ListSessions_column ListSessions_column--mentor">
          <SessionItem name={`${doctorName} ${doctorLN}`} />
        </div>
        <div className="ListSessions_column ListSessions_column--mentor">
          <SessionItem
            id={patientId}
            name={`${patientName} ${patientLN}`}
            email={patient && patient.email}
          />
        </div>
        <div className="ListSessions_column">
          {patientDoc && (
            <Subhead1
              color={FONTS.dark}>
              {patientDoc}
            </Subhead1>
          )}
        </div>
        <div className="ListSessions_column">
          {patient && !!patient.phone && (
            <Subhead1
              color={FONTS.dark}>
              {patient && patient.phone}
            </Subhead1>
          )}
        </div>
        <div className="ListSessions_column ListSessions_separator" style={{ borderColor: colors.MISC_COLORS.background_grey_2 }}>
          {!!sessionURL && (
            <a href={sessionURL} target="blank">
              Paciente
            </a>
          )}
          {!!sessionURL && !!patientURL && (
            <div className="ListSessions_linkseparator" />
          )}
          {!!patientURL && (
            <a href={patientURL} target="blank">
              Doctor
            </a>
          )}
        </div>
        <div className="ListSessions_column">
        </div>
        <div className="ListSessions_column">
          <Icon
            name="calendar-check"
            click={handleRescheduleClick}
            attr={{"data-tip": "Reagendar"}}
            style={{ cursor: 'pointer', fill: '#1ECD96' }}
          />
        </div>
      </ContainerRow>
    );
  }
}

export default ListSessionsBody;
