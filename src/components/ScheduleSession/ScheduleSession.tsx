import * as moment from "moment";
import * as React from 'react';
import {SessionBean} from '../../beans/Session.bean';
import Layout from '../../common/Layout/Layout';
import MenuAside from '../../common/MenuAside/MenuAside';
import Sticky from '../../common/Sticky/Sticky';
import { IMatchParam } from '../../interfaces/MatchParam.interface';
import { IMentor } from '../../interfaces/Mentor.interface';
import { ISessionSchedule } from '../../interfaces/Session.interface';
import LocationService from "../../services/Location/Location.service";
import MentorService from '../../services/Mentor/Mentor.service';
import MentorDetail from './components/MentorDetail/MentorDetail';
import ScheduleSessionForm from "./components/ScheduleSessionForm/ScheduleSessionForm";
import {
SESSION_MAX_STUDENTS, SESSION_ROOM, SESSION_SELECTED,
SESSION_SITE, SESSION_SKILL,
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
    showModal: boolean;

}

class ScheduleSession extends React.Component<IPropsScheduleSession, IStateScheduleSession> {
    public state: IStateScheduleSession;
    private mentorId: string;
    private mentorService: MentorService = new MentorService();
    private locationsService = new LocationService();

    constructor(props: IPropsScheduleSession) {
        super(props);
        this.state = {
            listSession: {},
            loading: true,
            locations: {},
            mentor: undefined,
            savingData: false,
            session: new SessionBean(),
            showModal: false
        };
        this.mentorId = this.props.match.params.id;
        this._onChangeSessionDetail = this._onChangeSessionDetail.bind(this);
        this._onChangeWeekendPicker = this._onChangeWeekendPicker.bind(this);
        this._onChangeDuration = this._onChangeDuration.bind(this);
        this._onClickSaveBulk = this._onClickSaveBulk.bind(this);
        this._onChangeWorkshop = this._onChangeWorkshop.bind(this);
        this._onRemoveWorkshop = this._onRemoveWorkshop.bind(this);
        this._onAddWorkshop = this._onAddWorkshop.bind(this);
        this._onConfirm = this._onConfirm.bind(this);
        this._onCancel = this._onCancel.bind(this);
    }

    public componentDidMount() {
        const session = {...this.state.session};
        session.mentorId = this.mentorId;
        this.setState({session: new SessionBean(session)}, () => {
            this._getMentor();
        });
    }

    public renderMenu() {
        const textNavigation = this.state.mentor ?
            'Crear sesiones para ' + this.state.mentor.user.name : 'Crear sesiones';
        return (
            <React.Fragment>
                <Sticky height={90} top={80}>
                    <div className="u-LayoutMargin" style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{
                            minWidth: 395,
                            position: 'relative',
                        }}/>
                        <MenuAside baseText={'Mentores'}
                                   url={'/admin/mentores'}
                                   textNavigation={textNavigation} />
                    </div>
                </Sticky>
            </React.Fragment>
        )
    }

    public render() {
        return (
            <ScheduleSessionContext.Provider value={{session: this.state.session, listSession: this.state.listSession}} >
                <Layout menu={this.renderMenu()}>
                    <Sticky height={0} top={80} style={{zIndex: -1}}>
                        <MentorDetail mentor={this.state.mentor}/>
                    </Sticky>
                    <div className="u-LayoutMargin">
                        <div className="ScheduleSession">
                            <ScheduleSessionForm
                                locations={this.state.locations}
                                savingData={this.state.savingData}
                                loading={this.state.loading}
                                onClickSaveBulk={this._onConfirm}
                                onChangeDuration={this._onChangeDuration}
                                mentor={this.state.mentor}
                                onChangeSessionDetail={this._onChangeSessionDetail}
                                onChangeWeekendPicker={this._onChangeWeekendPicker}
                                onChangeWorkshop={this._onChangeWorkshop}
                                onRemoveWorkshop={this._onRemoveWorkshop}
                                onAddWorkshop={this._onAddWorkshop}
                            />
                        </div>
                    </div>
                </Layout>
            </ScheduleSessionContext.Provider>
        );
    }

    private _onCancel() {
        this.setState({showModal: false})
    }

    private _onConfirm() {
        this.setState({savingData: true});
        const session : any= new SessionBean(this.state.session);
        session.from.setHours(0,0,0, 0);
        session.to.setDate(session.to.getDate() + 1);
        session.to.setHours(0,0,0,0);
        if (session.isWorkshop) {
            this.mentorService.bulkWorkshop(this.mentorId, session).then((items: any[]) => {
                if (items.length > 0 ) {
                    window.location.assign('/admin');
                } else {
                    alert('Hay Conflictos de Horarios');
                }
                this.setState({savingData: false});
            }, () => {
                alert('Hay Conflictos de Horarios');
                this.setState({savingData: false});
            });
        } else {
            session.from = session.from.toISOString();
            session.to = session.to.toISOString()
            this.mentorService.bulk(this.mentorId, session).then((items: any[]) => {
                if (items.length > 0 ) {
                    window.location.assign('/admin');
                } else {
                    alert('Hay Conflictos de Horarios');
                }
                this.setState({savingData: false});
            }, () => {
                alert('Hay Conflictos de Horarios');
                this.setState({savingData: false});
            });
        }
    }

    private _onClickSaveBulk() {
        this.setState({showModal: true});
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

    private _onChangeWorkshop(id: number, from: Date | null, to: Date | null, key: string) {
        const session = new SessionBean(this.state.session);
        session.sessions[id] = {
            from: from ? from.toISOString() : '',
            key,
            to: to ?  to.toISOString() : ''
        };
        this.setState({session, listSession: {id}});
    }

    private _onAddWorkshop(from: Date | null, to: Date | null) {
        const session = new SessionBean(this.state.session);
        const uniqueKey = Date.now().toString() + session.sessions.length;
        session.sessions.push({
            from: from ? from.toISOString() : '',
            key: uniqueKey,
            to: to ?  to.toISOString() : ''
        });
        this.setState({session});
    }

    private _onRemoveWorkshop(id: number) {
        const session = new SessionBean(this.state.session);
        session.sessions.splice(id, 1);
        this.setState({session});
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

    private _onChangeSessionDetail(type: string, item:any) {
        let session = {...this.state.session};
        switch (type) {
            case SESSION_SELECTED:
                session = new SessionBean();
                session.interestAreaId = item.id;
                session.interestAreaName = item.name;
                session.mentorId = this.mentorId;
                this.loadLocations(item.id);
                break;
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
        this.setState({session: new SessionBean(session)}, () => {
            if (SESSION_SELECTED === type) {
                this.loadLocations(item.id);
            }
        });
    }

    private _getMentor() {
        this.mentorService.mentor(this.mentorId).then((mentor: any) => {
            this.setState({mentor});
            const listAreas = mentor.interestAreas ? mentor.interestAreas : [];
            const area = listAreas.length > 0 ? listAreas[0] : {};
            if (area.id !== '') {
                const session = {...this.state.session};
                session.interestAreaId = area.id;
                session.interestAreaName = area.name;
                session.mentorId = this.mentorId;
                this.setState({session: new SessionBean(session)}, () => {
                    this.loadLocations(area.id);
                });
            }
        });
    }

    private loadLocations(idArea: string) {
        this.locationsService.list(idArea).then((locations) => {
            this.setState({locations, loading: false})
        })
    }
}

export default ScheduleSession;
