import * as React from 'react';
import styled from "styled-components";
import { TextBold1 } from '../../../../../common/ConsoleText';
import DropdownItem from '../../../../../common/DropdownItem/DropdownItem';
import DropdownMenu from '../../../../../common/DropdownMenu/DropdownMenu';
import Icon from "../../../../../common/Icon/Icon";
import colors, { FONTS } from "../../../../../common/MentorColor";
import { Heading3, LIGHT_TEXT, Subhead1 } from '../../../../../common/MentorText';
import { formatStrNumber } from '../../../../../common/Utils/Utilities';
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
  selectDoctor: (doctorId: string) => void;
  selectSession: (sessionId: string) => void;
  showRescheduleModal: (shouldShow: boolean) => void;
  showFollowupModal: (shouldShow: boolean) => void;
}

interface IStateListSessionsBody {
  openMenu: boolean;
}

class ListSessionsBody extends React.Component <IPropsListSessionsBody, IStateListSessionsBody> {
  constructor(props: IPropsListSessionsBody) {
    super(props);
    this.state = {
      openMenu: false,
    }
    this.toggleOpenMenu = this.toggleOpenMenu.bind(this);
  }

  public render() {
    const {
      doctor,
      patient,
      id = '',
      patient_link = '',
      paid = '',
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
    
    const patientPaid = formatStrNumber(paid);
  
    const handleCancelClick = () => {
      this.props.selectSession(id);
      this.props.showCancelModal(true);
      this.toggleOpenMenu();
    };
    const handleRescheduleClick = () => {
      this.props.selectSession(id);
      this.props.showRescheduleModal(true);
      this.toggleOpenMenu();
    };
    const handleFollowupClick = () => {
      this.props.selectSession(id);
      this.props.selectDoctor(doctorId);
      this.props.showFollowupModal(true);
      this.toggleOpenMenu();
    };
    const renderAssistance = () => {
      const assistance = sessionBean.getAssistance();
      if (!assistance) {
        return null;
      }
      const colorClass = assistance === 'Confirmada' ? 'green' : assistance === "No Asistió" ? 'red' : 'default';
      return (
        <span className={`ListSessions_badge ListSessions_badge-${colorClass}`}>
          {assistance}
        </span>
      );
    }
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
        <div className="ListSessions_column">
          {renderAssistance()}
        </div>
        <div className="ListSessions_column ListSessions_column--date">
          <Heading3
            weight={LIGHT_TEXT}
            color={FONTS.dark}>
            {sessionBean.getReservationDate(new MomentDateParser())}
          </Heading3>
          <TextBold1>{sessionBean.getReservationTime(new MomentDateParser())}</TextBold1>
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
        <div className="ListSessions_column ListSessions_numbers">
          {patientPaid && (
            <Subhead1
              color={FONTS.dark}>
              S/. {patientPaid}
            </Subhead1>
          )}
        </div>
        <div className="ListSessions_column ListSessions_numbers">
          {patientDoc && (
            <Subhead1
              color={FONTS.dark}>
              {patientDoc}
            </Subhead1>
          )}
        </div>
        <div className="ListSessions_column ListSessions_numbers">
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
        <div title="Acciones" className="ListSessions_column ListSessions_dropdownContainer">
          <Icon
            name="calendar-check"
            click={this.toggleOpenMenu}
            attr={{"data-tip": "Acciones" }}
            style={{ cursor: 'pointer', fill: '#1ECD96' }}
            
          />
          <DropdownMenu open={this.state.openMenu}>
            <DropdownItem onClick={handleCancelClick}>Cancelar Cita</DropdownItem>
            <DropdownItem onClick={handleRescheduleClick}>Reagendar Cita</DropdownItem>
            <DropdownItem onClick={handleFollowupClick}>Agendar Cita</DropdownItem>
          </DropdownMenu>
        </div>
      </ContainerRow>
    );
  }

  private toggleOpenMenu() {
    this.setState(prevState => ({openMenu: !prevState.openMenu }));
  }
}

export default ListSessionsBody;
