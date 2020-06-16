import * as moment from "moment";
import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import { SessionRequestBean } from 'src/beans/SessionRequest.bean';
import Layout from 'src/common/Layout/Layout';
import Loader from 'src/common/Loader/Loader';
import { ButtonNormal } from "../../../common/Buttons/Buttons";
import ContentModal from "../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../common/ConsoleModal/MentorModalBase";
import { Text } from '../../../common/ConsoleText';
import FormColumn from "../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../common/FormRow/FormRow";
import MenuAside from "../../../common/Layout/components/MenuAside/MenuAside";
import ListHeader from "../../../common/List/ListHeader";
import {default as colors, FONTS} from "../../../common/MentorColor";
import MentorDropDown, { IPropsMentorOptionsDropDown } from "../../../common/MentorDropDown/MentorDropDown";
import MentorInput from "../../../common/MentorInput/MentorInput";
import { Headline1 } from '../../../common/MentorText';
import Sticky from '../../../common/Sticky/Sticky';
import { ISessionBody, ISessionPaginated } from '../../../domain/Session/SessionBean';
import { ISessionDoctor } from "../../../domain/Session/SessionMentorBean";
import MentorService from "../../../services/Mentor/Mentor.service";
import SessionService from '../../../services/Session/Session.service';
import InputDatePicker from "../Reports/components/InputDatePicker/InputDatePicker";
import CancelSessionModal from './components/CancelSessionModal/CancelSessionModal';
import FollowupSessionModal from "./components/FollowupSessionModal/FollowupSessionModal";
import ListSessionsBody from './components/ListSessionBody/ListSessionBody';
import RescheduleSessionModal from "./components/RescheduleSessionModal/RescheduleSessionModal";
import './SessionsList.scss';

interface IStateListSession {
  sessions: ISessionBody[];
  loading: boolean;
  loadingDoctors: boolean;
  hasMore: boolean;
  newSessions: ISessionBody[];
  initialLoad: boolean;
  showCancelModal: boolean;
  showRescheduleModal: boolean;
  showFollowupModal: boolean;
  selectedSessionId: string;
  sessionRequest: SessionRequestBean;
  modalSuccess: boolean;
  doctors: IPropsMentorOptionsDropDown[];
  selectedDoctorId: string;
}

export const MAX_RETRIEVED_SESSIONS = 50;
const PAGE_SIZE = 30;
const DEFAULT_STICKY_HEIGHT = 244;
const DEFAULT_STICKY_TOP = 80;
const TABLE_HEADER_TEXTS = [
  'DIA Y HORA',
  'ASISTENCIA',
  'RESERVA',
  'NOMBRE DEL DOCTOR',
  'NOMBRE DEL PACIENTE',
  'DNI O CE',
  'TELÉFONO',
  'URL DE LA CITA',
  '',
  'ACCIONES',
  '',
];

const compareDropdownObject = (obj1: IPropsMentorOptionsDropDown, obj2: IPropsMentorOptionsDropDown) => {
  const str1 = obj1.label.toUpperCase();
  const str2 = obj2.label.toUpperCase();

  if (str1 > str2) {
    return 1;
  } else if (str1 < str2) {
    return -1;
  }
  return 0;
};

class SessionsList extends React.Component <{}, IStateListSession> {
  public state: IStateListSession;
  private sessionService: SessionService;
  private mentorService: MentorService;
  private counter: number;
  private scroller: any;
  constructor(props: any) {
    super(props);
    this.sessionService = new SessionService();
    this.mentorService = new MentorService();
    this.state = {
      doctors: [],
      hasMore: true,
      initialLoad: true,
      loading: false,
      loadingDoctors: false,
      modalSuccess: false,
      newSessions: [],
      selectedDoctorId: '',
      selectedSessionId: '',
      sessionRequest: new SessionRequestBean(),
      sessions: [],
      showCancelModal: false,
      showFollowupModal: false,
      showRescheduleModal: false,
    };
    this.counter = 0;
    this.scroller = React.createRef();
    this.loadNextPage = this.loadNextPage.bind(this);
    this.listSessions = this.listSessions.bind(this);
    this.getNewSessions = this.getNewSessions.bind(this);
    this.showCancelModal = this.showCancelModal.bind(this);
    this.cancelSession = this.cancelSession.bind(this);
    this.setCurrentSessionId = this.setCurrentSessionId.bind(this);
    this.updateFilterDate = this.updateFilterDate.bind(this);
    this.searchResults = this.searchResults.bind(this);
    this.isDayBlocked = this.isDayBlocked.bind(this);
    this.showRescheduleModal = this.showRescheduleModal.bind(this);
    this.rescheduleSession = this.rescheduleSession.bind(this);
    this.toggleSuccessModal = this.toggleSuccessModal.bind(this);
    this.handleDoctorChange = this.handleDoctorChange.bind(this);
    this.handleDocumentChange = this.handleDocumentChange.bind(this);
    this.searchSessionsByPatientDocument = this.searchSessionsByPatientDocument.bind(this);
    this.setCurrentDoctorId = this.setCurrentDoctorId.bind(this);
    this.showFollowupModal = this.showFollowupModal.bind(this);
    this.followupSession = this.followupSession.bind(this);
  }

  public componentWillUnmount() {
      window.scrollTo(0, 0);
  }

  public componentDidMount() {
    this.setState({ loadingDoctors: true });
    this.mentorService.doctors().then((items: ISessionDoctor[]) => {
      const doctors = items.map(item => {
        const { id, cmp = '', last_name = '', name = '' } = item;
        const label = `${name} ${last_name} ${cmp ? `CMP: ${cmp}` : ''}`;
        return {
          label,
          value: id,
        };
      }).sort(compareDropdownObject);
      doctors.unshift({
        label: 'Todos',
        value: '',
      });
      this.setState({ doctors, loadingDoctors: false });
    }).catch(() => {
      this.setState({ loadingDoctors: false });
    });
  }

  public renderTopMenu() {
    return (
      <Sticky height={DEFAULT_STICKY_HEIGHT} top={DEFAULT_STICKY_TOP} style={{background: 'white'}}>
        <MenuAside
          icon={'calendar'}
          items={[{text: 'Citas', url: '/sessions'}]}
        />
        <div className='u-LayoutMargin u-ListSessions_padding ListSessions_sticky'>
          <FormRow style={{ width: '100%' }} columns={[
            <FormColumn key="startDate" width={4}>
              <Text style={{paddingLeft: 12, paddingBottom: 6}}>Desde el:</Text>
              <InputDatePicker
                id={'startDate'}
                date={this.state.sessionRequest.startDate}
                updateState={this.updateFilterDate}
                configDate={{"isOutsideRange": () => false}}/>
            </FormColumn>,
            <FormColumn key="endDate" width={4}>
              <Text style={{paddingLeft: 12, paddingBottom: 6}}>Hasta el:</Text>
              <InputDatePicker
                id={'endDate'}
                date={this.state.sessionRequest.endDate}
                updateState={this.updateFilterDate}
                configDate={{"isDayBlocked": this.isDayBlocked, "isOutsideRange": () => false}}/>
            </FormColumn>,
            <FormColumn key="doctors" width={4}>
              <Text>Doctor:</Text>
              {this.state.loadingDoctors && (
                <div>
                  <Loader />
                </div>
              )}
              {!this.state.loadingDoctors && (
                <MentorDropDown
                  value={this.state.sessionRequest.doctorId}
                  name="doctorId"
                  triggerChange={this.handleDoctorChange}
                  placeholder="Seleccione un doctor"
                  options={this.state.doctors}
                />
              )}
            </FormColumn>,
            <FormColumn key="documentNumber" width={4}>
              <Text>DNI o CE del Paciente:</Text>
              <div className="ListSessions_inputFilter">
                <MentorInput
                  attrs={{
                    maxLength: 11,
                    name: "documentNumber",
                    onChange: this.handleDocumentChange,
                    placeholder: "Ingrese el DNI o CE",
                    value: this.state.sessionRequest.documentNumber}}/>
                <ButtonNormal
                  text="Buscar"
                  attrs={{onClick: this.searchSessionsByPatientDocument}}
                />
              </div>
            </FormColumn>
          ]}/>
        </div>
        <ListHeader header={TABLE_HEADER_TEXTS} baseClass="ListSessions" />
      </Sticky>
    )
  }

  public render() {
    return (
      <Layout menu={this.renderTopMenu()}>
        <div className="ListSessions">
          <InfiniteScroll
            pageStart={0}
            initialLoad={true}
            ref={scroller => this.scroller = scroller}
            loadMore={this.loadNextPage}
            hasMore={this.state.hasMore}
            loader={
              <div className="ListSessions_row ListSessions_row--center">
                <Loader />
              </div>}>
            {this.listSessions()}
          </InfiniteScroll>
        </div>
      </Layout>
    )
  }

  private updateFilterDate(params: object) {
      const sessionRequest = {...this.state.sessionRequest};
      const newSessionRequest = Object.assign(sessionRequest, params);
      this.setState({sessionRequest:  new SessionRequestBean(newSessionRequest)}, () => {
          if (this.state.sessionRequest.isValid()) {
              this.searchResults(this.state.sessionRequest);
          }
      });
  }

  private handleDoctorChange(name: any, option: any) {
    const value = option.value;
    const sessionRequest = {...this.state.sessionRequest};
    const newSessionRequest = Object.assign(sessionRequest, { [name]: value });
    if (value !== this.state.sessionRequest.doctorId) {
      const sessionRequestInstance = new SessionRequestBean(newSessionRequest);
      this.setState({sessionRequest: sessionRequestInstance });
      if (this.state.sessionRequest.isValid()) {
        this.searchResults(sessionRequestInstance);
      }
    }
  }

  private handleDocumentChange(e: any) {
    const sessionRequest = {...this.state.sessionRequest};
    const newSessionRequest = Object.assign(sessionRequest, { [e.target.name]: e.target.value });
    this.setState({sessionRequest:  new SessionRequestBean(newSessionRequest)});
  }

  private searchSessionsByPatientDocument() {
    if (this.state.sessionRequest.isValid()) {
      this.searchResults(this.state.sessionRequest);
    }
  }

  private async searchResults(session: SessionRequestBean) {
    const params = session.toParams();
    this.setState({loading: true, initialLoad: true, hasMore: true });
    try {
      const data = await this.sessionService.list(params) as ISessionPaginated;
      if (data) {
        const sessions = data && data.items ? data.items : [];
        this.setState({
          hasMore: false,
          initialLoad: false,
          loading: false,
          sessions,
        });
      }
    } catch (e) {
      this.setState({loading: false});
    }
  }

  private setCurrentSessionId(sessionId: string) {
    this.setState({ selectedSessionId: sessionId });
  }

  private setCurrentDoctorId(doctorId: string) {
    this.setState({ selectedDoctorId: doctorId });
  }

  private showRescheduleModal(show: boolean) {
    this.setState({ showRescheduleModal: show });
    if (!show) {
      this.setState({ selectedSessionId: '' });
    }
  }

  private showFollowupModal(show: boolean) {
    this.setState({ showFollowupModal: show });
    if (!show) {
      this.setState({ selectedSessionId: '', selectedDoctorId: '' });
    }
  }

  private rescheduleSession(newSession: string) {
    const oldSession = this.state.selectedSessionId;
    if (oldSession) {
      this.setState({ loading: true, showRescheduleModal: false });
      this.sessionService.rescheduleSession(oldSession, newSession).then(() => {
        const currentSessions = !this.state.sessions ? [] : this.state.sessions;
        const newSessions = currentSessions.filter((session: ISessionBody) => session.id !== oldSession);
        this.setState({
          loading: false,
          selectedSessionId: '',
          sessions: newSessions,
          showRescheduleModal: false,
        });
        this.toggleSuccessModal(true);
      }).catch(() => {
        this.setState({
          loading: false,
          selectedSessionId: '',
          showRescheduleModal: false,
        });
      });
    }
  }

  private followupSession(newSession: string) {
    const oldSession = this.state.selectedSessionId;
    if (oldSession) {
      this.setState({ loading: true, showRescheduleModal: false });
      this.sessionService.followupSession(oldSession, newSession).then(() => {
        this.setState({
          loading: false,
          selectedDoctorId: '',
          selectedSessionId: '',
          showFollowupModal: false,
        });
        this.toggleSuccessModal(true);
      }).catch(() => {
        this.setState({
          loading: false,
          selectedDoctorId: '',
          selectedSessionId: '',
          showFollowupModal: false
        });
      });
    }
  }

  private showCancelModal(show: boolean) {
    this.setState({ showCancelModal: show });
    if (!show) {
      this.setState({ selectedSessionId: '' });
    }
  }

  private cancelSession() {
    const sessionId = this.state.selectedSessionId;
    if (sessionId) {
      this.setState({ loading: true, showCancelModal: false }, () => {
        this.sessionService.cancelSession(sessionId)
        .then(() => {
          const currentSessions = !this.state.sessions ? [] : this.state.sessions;
          const newSessions = currentSessions.filter((session: ISessionBody) => session.id !== sessionId);
          this.setState({
            loading: false,
            selectedSessionId: '',
            sessions: newSessions,            
          })
        }).catch(() => {
          this.setState({ loading: false, selectedSessionId: '' });
        });
      });
    }
  }

  private getNewSessions() {
    return this.state.newSessions.map(m => m.id);
  }

  private listSessions() {
    const noResults = !this.state.initialLoad && this.state.sessions.length === 0;
    const renderNoResults = () => (
      <div className="ListSessions_row ListSessions_row--center">
          <Headline1 color={FONTS.medium}>No hay resultados</Headline1>
      </div>
    );
    const renderLoader = () => (
      <div className="ListSessions_row ListSessions_row--center">
        <Loader />
      </div>
    );

    return (
      <div className="ListSessions_body u-LayoutMargin">
          {!this.state.loading && noResults && renderNoResults()}
          {this.state.loading && noResults && renderLoader()}
          {!this.state.initialLoad && this.state.sessions.map(item => {
            const newMentorStyle =  this.getNewSessions().indexOf(item.id) !== -1 ? {order: --this.counter, background: colors.MISC_COLORS.background_grey_1} : {};
            const withRowStyle = {borderBottom: `1px solid ${colors.MISC_COLORS.background_grey_2}`};
            return (
              <div
                key={'list-mentor-row' + item.id}
                className={`ListSessions_row ListSessions_row--border u-ListSessions_padding`}
                style={{ ...newMentorStyle, ...withRowStyle }}>
                <ListSessionsBody
                  session={item}
                  showCancelModal={this.showCancelModal}
                  selectSession={this.setCurrentSessionId}
                  selectDoctor={this.setCurrentDoctorId}
                  showRescheduleModal={this.showRescheduleModal}
                  showFollowupModal={this.showFollowupModal}
                />
              </div>);
          })}
          <CancelSessionModal
            show={this.state.showCancelModal}
            toggleModal={this.showCancelModal}
            confirm={this.cancelSession}
          />
          <MentorModalBase show={this.state.modalSuccess} onCloseModal={this.toggleSuccessModal} hideClose={true}>
              <ContentModal.Success description={"Cita reasignada con éxito"} />
          </MentorModalBase>
          {!!this.state.selectedSessionId && (
            <RescheduleSessionModal
              show={this.state.showRescheduleModal}
              toggleModal={this.showRescheduleModal}
              confirm={this.rescheduleSession}
              sessionId={this.state.selectedSessionId}
            />
          )}
          {!!this.state.selectedSessionId && !!this.state.selectedDoctorId && (
            <FollowupSessionModal
              show={this.state.showFollowupModal}
              toggleModal={this.showFollowupModal}
              confirm={this.followupSession}
              sessionId={this.state.selectedSessionId}
              doctorId={this.state.selectedDoctorId}
            />
          )}
      </div>
    );
  }

  private toggleSuccessModal(modalSuccess: boolean = false) {
    this.setState({ modalSuccess });
    if (modalSuccess) {
      setTimeout(() => {
        this.setState({ modalSuccess: false });
      }, 1500);
    }
  }

  private async loadNextPage(page: number) {    
    if (!this.state.loading) {
      this.setState({ loading: true });
      const params = this.state.sessionRequest.toParams();
      const response = await this.sessionService.list(params) as ISessionPaginated;
      const sessions = response && response.items;
      if (sessions) {
        const currentSessions = !this.state.sessions ? [] : this.state.sessions;
        const newSessions = [...currentSessions, ...sessions];
        const hasMore = page * PAGE_SIZE < response.totalItems;
        this.scroller.pageLoaded = page;
        this.setState({
            hasMore,
            initialLoad: false,
            loading: false,
            sessions: newSessions.filter((item) => !!item),
        });
      } else {
        this.setState({hasMore: false});
      }
    }
  }

  private isDayBlocked(day: moment.Moment) {
    const startDate = new Date(this.state.sessionRequest.startDate);
    return day < moment(startDate) || moment(startDate).add(1, 'year') < day;
}
}

export default SessionsList;
