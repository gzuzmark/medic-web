import * as moment from "moment";
import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import { SessionRequestBean } from 'src/beans/SessionRequest.bean';
import Layout from 'src/common/Layout/Layout';
import Loader from 'src/common/Loader/Loader';
import ContentModal from "../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../common/ConsoleModal/MentorModalBase";
import { Text } from '../../../common/ConsoleText';
import FormColumn from "../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../common/FormRow/FormRow";
import MenuAside from "../../../common/Layout/components/MenuAside/MenuAside";
import {default as colors, FONTS} from "../../../common/MentorColor";
import { Headline1 } from '../../../common/MentorText';
import Sticky from '../../../common/Sticky/Sticky';
import { ISessionBody, ISessionPaginated } from '../../../domain/Session/SessionBean';
import SessionService from '../../../services/Session/Session.service';
import InputDatePicker from "../Reports/components/InputDatePicker/InputDatePicker";
import FormSection from "../ScheduleSession/components/FormSection/FormSection";
import CancelSessionModal from './components/CancelSessionModal/CancelSessionModal';
import ListSessionsBody from './components/ListSessionBody/ListSessionBody';
import ListSessionsHeader from './components/ListSessionHeader/ListSessionHeader';
import RescheduleSessionModal from "./components/RescheduleSessionModal/RescheduleSessionModal";
import './SessionsList.scss';

interface IStateListSession {
  sessions: ISessionBody[];
  loading: boolean;
  hasMore: boolean;
  newSessions: ISessionBody[];
  initialLoad: boolean;
  showCancelModal: boolean;
  showRescheduleModal: boolean;
  selectedSessionId: string;
  sessionRequest: SessionRequestBean;
  modalSuccess: boolean;
}

const PAGE_SIZE = 30;
const DEFAULT_STICKY_HEIGHT = 244;
const DEFAULT_STICKY_TOP = 80;
const TABLE_HEADER_TEXTS = [
  'DIA Y HORA',
  'NOMBRE DEL DOCTOR',
  'NOMBRE DEL PACIENTE',
  'DNI O CE',
  'TELÉFONO',
  'URL DE LA CITA',
  'CANCELAR',
  'REAGENDAR',
];

class SessionsList extends React.Component <{}, IStateListSession> {
  public state: IStateListSession;
  private sessionService: SessionService;
  private counter: number;
  private scroller: any;
  constructor(props: any) {
    super(props);
    this.sessionService = new SessionService();
    this.state = {
      hasMore: true,
      initialLoad: true,
      loading: false,
      modalSuccess: false,
      newSessions: [],
      selectedSessionId: '',
      sessionRequest: new SessionRequestBean(),
      sessions: [],
      showCancelModal: false,
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
  }

  public componentWillUnmount() {
      window.scrollTo(0, 0);
  }

  public renderTopMenu() {
    return (
      <Sticky height={DEFAULT_STICKY_HEIGHT} top={DEFAULT_STICKY_TOP} style={{background: 'white'}}>
        <MenuAside
          icon={'calendar'}
          items={[{text: 'Citas', url: '/sessions'}]}
        />
        <div className='u-LayoutMargin u-ListSessions_padding ListSessions_sticky'>
          <FormSection style={{display: 'block'}} itemStyle={{width: 650}}>
            <FormRow columns={[
              <FormColumn key="startDate" width={2}>
                <Text style={{paddingLeft: 12, paddingBottom: 6}}>Desde el:</Text>
                <InputDatePicker
                  id={'startDate'}
                  date={this.state.sessionRequest.startDate}
                  updateState={this.updateFilterDate}
                  configDate={{"isOutsideRange": () => false}}/>
              </FormColumn>,
              <FormColumn key="endDate" width={2}>
                <Text style={{paddingLeft: 12, paddingBottom: 6}}>Hasta el:</Text>
                <InputDatePicker
                  id={'endDate'}
                  date={this.state.sessionRequest.endDate}
                  updateState={this.updateFilterDate}
                  configDate={{"isDayBlocked": this.isDayBlocked, "isOutsideRange": () => false}}/>
              </FormColumn>
            ]}/>
          </FormSection>
        </div>
        <ListSessionsHeader header={TABLE_HEADER_TEXTS}/>
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

  private showRescheduleModal(show: boolean) {
    this.setState({ showRescheduleModal: show });
    if (!show) {
      this.setState({ selectedSessionId: '' });
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
        });
        this.toggleSuccessModal(true);
      }).catch(() => {
        this.setState({ loading: false, selectedSessionId: '' });
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
                  showRescheduleModal={this.showRescheduleModal}
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
