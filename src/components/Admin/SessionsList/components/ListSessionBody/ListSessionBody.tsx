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
}

class ListSessionsBody extends React.Component <IPropsListSessionsBody, {}> {
  constructor(props: IPropsListSessionsBody) {
    super(props);
  }

  public render() {
    const { doctor, patient, id = '' } = this.props.session;
    const sessionBean = new SessionBean(this.props.session);
    const sessionURL = patient && patient.link || '';
    const handleClick = () => {
      this.props.selectSession(id);
      this.props.showCancelModal(true);
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
          <SessionItem name={`${doctor.name} ${doctor.last_name}`} />
        </div>
        <div className="ListSessions_column ListSessions_column--mentor">
          <SessionItem
            id={patient.id}
            name={`${patient.name} ${patient.last_name}`}
            email={patient.email}
          />
        </div>
        <div className="ListSessions_column">
          {!!patient.phone && (
            <Subhead1
              color={FONTS.dark}>
              {patient.phone}
            </Subhead1>
          )}
        </div>
        <div className="ListSessions_column ListSessions_separator" style={{ borderColor: colors.MISC_COLORS.background_grey_2 }}>
          {!!sessionURL && (
            <a href={sessionURL} target="blank">
              {sessionURL}
            </a>
          )}
        </div>
        <div className="ListSessions_column">
          <Icon
            name="exclamation"
            click={handleClick}
            attr={{"data-tip": "Cancelar cita"}}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </ContainerRow>
    );
  }
}

export default ListSessionsBody;
