import * as moment from "moment";
import * as React from 'react';
import {SessionBean} from '../../beans/Session.bean';
import { Text } from '../../common/ConsoleText';
import { IListItem } from '../../common/FilterList/FilterList';
import Layout from '../../common/Layout/Layout';
import Loader from '../../common/Loader/Loader';
import Menu from '../../common/Menu/Menu';
import Sticky from '../../common/Sticky/Sticky';
import { IMatchParam } from '../../interfaces/MatchParam.interface';
import { IMentor } from '../../interfaces/Mentor.interface';
import { ISessionSchedule } from '../../interfaces/Session.interface';
import LocationService from "../../services/Location/Location.service";
import MentorService from '../../services/Mentor/Mentor.service';
import MentorDetail from './components/MentorDetail/MentorDetail';
import ScheduleDuration from './components/ScheduleDuration/ScheduleDuration';
import SessionDetail from './components/SessionDetail/SessionDetail';
import TitleSection from './components/TitleSection/TitleSection';
import WeekendPicker from './components/WeekendPicker/WeekendPicker';
import {
    SESSION_MAX_STUDENTS, SESSION_ROOM, SESSION_SITE, SESSION_SKILL,
    SESSION_TYPE
} from './ScheduleSession.constants';
import ScheduleSessionContext from './ScheduleSession.context';
import './ScheduleSession.scss';

interface IPropsScheduleSession {
    match: IMatchParam;
}

interface IStateScheduleSession {
    listSession: object;
    loading: boolean;
    locations: any;
    mentor?: IMentor;
    savingData: boolean;
    session: SessionBean;
}

class ScheduleSession extends React.Component<IPropsScheduleSession, IStateScheduleSession> {
    public state: IStateScheduleSession;
    private mentorId: string;
    private mentorService = new MentorService();
    private locationsService = new LocationService();

    constructor(props: IPropsScheduleSession) {
        super(props);
        this.state = {
            listSession: {},
            loading: true,
            locations: {},
            mentor: undefined,
            savingData: false,
            session: new SessionBean()
        };
        this.mentorId = this.props.match.params.id;
        this._getMentor = this._getMentor.bind(this);
        this._onChangeSessionDetail = this._onChangeSessionDetail.bind(this);
        this._onChangeWeekendPicker = this._onChangeWeekendPicker.bind(this);
        this._onChangeDuration = this._onChangeDuration.bind(this);
        this._onClickSaveBulk = this._onClickSaveBulk.bind(this);
    }

    public componentDidMount() {
        const session = {...this.state.session};
        session.mentorId = this.mentorId;
        this.setState({session: new SessionBean(session)});
        this._getMentor();
    }

    public renderMenu() {
        const textNavigation = this.state.mentor ?
            'Crear sesiones para ' + this.state.mentor.name : 'Crear sesiones';
        return (
            <React.Fragment>
                <Sticky height={90} top={80}>
                    <div className="u-LayoutMargin" style={{display: 'flex', flexDirection: 'row'}}>
                        <MentorDetail mentor={this.state.mentor}/>
                        <Menu baseText={'Mentores'}
                              url={'/admin/mentores'}
                              textNavigation={textNavigation} />
                    </div>
                </Sticky>
            </React.Fragment>
        )
    }

    public render() {
        const areaType = this.state.mentor && this.state.mentor.interestAreas && this.state.mentor.interestAreas[0].type || 'VIRTUAL';
        return (
            <ScheduleSessionContext.Provider value={{session: this.state.session, listSession: this.state.listSession}} >
                <Layout menu={this.renderMenu()}>
                    <div className="u-LayoutMargin">
                        <div className="ScheduleSession">
                            {this.state.loading &&
                            <Loader top={250} height={100}/>}
                            {!this.state.loading &&
                            <React.Fragment>
                                <Text>Ingresa los datos de la sesión que te gustaría crear</Text>
                                <TitleSection title={'Detalles de la sesión'}
                                              style={{marginTop: 32, marginBottom: 18}}/>
                                <div className='FormSession-section FormSession-section--first'>
                                    <SessionDetail
                                        skills={this.state.mentor ? this.state.mentor.skills : []}
                                        locations={this.state.locations}
                                        areaType={areaType}
                                        onChange={this._onChangeSessionDetail}/>
                                </div>
                                <hr className='FormSession-separator' />
                                <TitleSection title={'Agenda fecha y hora'} style={{marginTop: 30}}/>
                                <div className='FormSession-section' >
                                    <WeekendPicker onChange={this._onChangeWeekendPicker}/>
                                </div>
                                <TitleSection title={'¿Cada cuánto te gustaría que se repitan estas sesiones? '}
                                              main={false}/>
                                <div className='FormSession-section' style={{marginTop: 30}}>
                                    <ScheduleDuration
                                        onChangeDuration={this._onChangeDuration}
                                        startDate={moment(this.state.session.from)}
                                        endDate={moment(this.state.session.to)}/>
                                </div>
                                <div className="ScheduleSession-button_container">
                                    <button className="u-Button u-Button--white ScheduleSession-button">Cancelar</button>
                                    <button className="u-Button ScheduleSession-button"
                                            disabled={!this.state.session.isValid() || this.state.savingData}
                                            onClick={this._onClickSaveBulk}
                                            data-loading={this.state.savingData ? true : undefined}>{this.state.savingData ? '' : 'Aceptar'}</button>
                                </div>
                            </React.Fragment>
                            }
                        </div>
                    </div>
                </Layout>
                }
            </ScheduleSessionContext.Provider>
        );
    }

    private _onClickSaveBulk() {
        this.setState({savingData: true});
        const session: any = {...this.state.session};
        session.from.setHours(0,0,0, 0);
        session.to.setDate(session.to.getDate() + 1);
        session.to.setHours(0,0,0,0);
        session.from = session.from.toISOString();
        session.to = session.to.toISOString();
        this.mentorService.bulk(this.mentorId, session).then((items: any[]) => {
            if (items.length > 0 ) {
                window.location.assign('/admin');
            } else {
                alert('Hay Conflictos de Horarios')
            }
            this.setState({savingData: false});
        }, () => {
            alert('Hay Conflictos de Horarios')
            this.setState({savingData: false});
        });

    }

    private _onChangeDuration(startDate: moment.Moment, endDate: moment.Moment, action: string) {
        const session = {...this.state.session};
        const currentTime = moment();
        switch (action) {
            case '_onStartDateChange':
                startDate = startDate > currentTime ? startDate : currentTime;
                endDate = startDate > moment(this.state.session.to) ? startDate : endDate;
                break;
            case '_onPickerRangeChange':
                startDate = startDate < currentTime ? currentTime : startDate;
                break;
        }
        session.from = startDate.toDate();
        session.to = endDate.toDate();
        this.setState({session: new SessionBean(session)});
    }

    private _onChangeWeekendPicker(sessionSchedule: ISessionSchedule) {
        const { from, to, weekDay } = sessionSchedule;
        const value = `${from}@${to}@${weekDay}`;
        const listSession = {...this.state.listSession};
        if (listSession[value]) {
            delete listSession[value];
        } else {
            listSession[value] = sessionSchedule;
        }
        const session = new SessionBean(this.state.session);
        session.updateUTCSessions(Object.keys(listSession).map((schedule: string) => {
            const splitted = schedule.split('@');
            return {
                from: splitted[0],
                to: splitted[1],
                weekDay: Number(splitted[2]),
            }
        }));
        this.setState({listSession, session});

    }

    private _onChangeSessionDetail(type: string, item:IListItem) {
        const session = {...this.state.session};
        switch (type) {
            case SESSION_SKILL:
                session.skillName = item.name;
                session.skillId = item.id;
                break;
            case SESSION_TYPE:
                session.type = item.id;
                session.location = '';
                break;
            case SESSION_SITE:
                session.location = '';
                break;
            case SESSION_ROOM:
                session.location = item.id;
                break;
            case SESSION_MAX_STUDENTS:
                session.maxStudents = Number(item.name);
                break;
        }
        this.setState({session: new SessionBean(session)});
    }

    private _getMentor() {
        this.mentorService.mentor(this.mentorId).then((mentor: IMentor) => {
            this.setState({mentor});
            const idArea = mentor.interestAreas ? mentor.interestAreas[0].id : '';
            if (idArea !== '') {
                this.locationsService.list(idArea).then((locations) => {
                    this.setState({locations, loading: false})
                })
            }
        });
    }
}

export default ScheduleSession;
