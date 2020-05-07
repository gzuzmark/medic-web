import * as moment from "moment";
import * as React from 'react';
import Layout from '../../../common/Layout/Layout';
import MentorDetail from '../../../common/MentorDetail/MentorDetail';
import MenuLeft from "../../../common/MenuLeft/MenuLeft";
import Sticky from '../../../common/Sticky/Sticky';
import {FactorySessionBean, IFactorySession} from '../../../domain/FactorySession/FactorySessionBean';
import {FormLocationDependency} from "../../../domain/FormSession/FormLocationDependency";
import {IMentorBase} from "../../../domain/Mentor/MentorBase";
import { IMatchParam } from '../../../interfaces/MatchParam.interface';
import { ISessionSchedule } from '../../../interfaces/Session.interface';
import {SESSION_PHYSICAL, SESSION_VIRTUAL} from "../../../repository/SessionTypeConstants";
import LocationService from "../../../services/Location/Location.service";
import MentorService from '../../../services/Mentor/Mentor.service';
import ScheduleSessionForm from "./components/ScheduleSessionForm/ScheduleSessionForm";
import {
    SESSION_BLOCK,
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
    mentor?: IMentorBase;
    savingData: boolean;
    session: IFactorySession;
    showModal: boolean;

}

class ScheduleSession extends React.Component<IPropsScheduleSession, IStateScheduleSession> {
    public state: IStateScheduleSession;
    private mentorId: string;
    private mentorService: MentorService = new MentorService();
    private locationsService = new LocationService();
    private factory = new FactorySessionBean();
    private locations = new FormLocationDependency();

    constructor(props: IPropsScheduleSession) {
        super(props);
        this.state = {
            listSession: {},
            loading: true,
            locations: {},
            mentor: undefined,
            savingData: false,
            session: this.factory.getFormSession,
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
        this._return = this._return.bind(this);
    }

    public componentDidMount() {
        this.factory.getFormSession.mentorId = this.mentorId;
        this.setState({session: this.factory.getFormSession}, () => {
            this._getMentor();
        });
    }

    public renderMenu() {
        const textNavigation = this.state.mentor ?
            `Crear sesiones para ${this.state.mentor.user.name} ${this.state.mentor.user.lastname}` : 'Crear sesiones';
        return (
            <MenuLeft
                baseText={'Doctores'}
                url={'/admin/doctores'}
                textNavigation={textNavigation} />
        )
    }

    public render() {
        return (
            <ScheduleSessionContext.Provider
                value={{session: this.factory, listSession: this.state.listSession, locations: this.locations}} >
                <Layout menu={this.renderMenu()}>
                    <Sticky height={30} top={80} style={{zIndex: -1}}>
                        <MentorDetail mentor={this.state.mentor}/>
                    </Sticky>
                    <div className="u-LayoutMargin">
                        <div className="ScheduleSession">
                            <ScheduleSessionForm
                                savingData={this.state.savingData}
                                loading={this.state.loading}
                                mentor={this.state.mentor}
                                callbacks={{
                                    onAddWorkshop: this._onAddWorkshop,
                                    onCancel: this._return,
                                    onChangeDuration: this._onChangeDuration,
                                    onChangeSessionDetail: this._onChangeSessionDetail,
                                    onChangeWeekendPicker: this._onChangeWeekendPicker,
                                    onChangeWorkshop: this._onChangeWorkshop,
                                    onClickSaveBulk: this._onConfirm,
                                    onRemoveWorkshop: this._onRemoveWorkshop
                                }}
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

    private _return() {
        window.history.back();
    }

    private _onConfirm() {
        this.setState({savingData: true});
        const session : any= new FactorySessionBean(this.factory.getFormSession);
        const dateFrom = new Date(session.factorySession.from);
        const dateTo = new Date(session.factorySession.to);
        dateFrom.setHours(0,0,0, 0);
        dateTo.setDate(dateTo.getDate() + 1);
        dateTo.setHours(0,0,0,0);
        session.factorySession.from = dateFrom.toISOString();
        session.factorySession.to = dateTo.toISOString();
        this.mentorService.bulk(this.mentorId, session.requestSaveSessions(session.isWorkshop)).then((items: any[]) => {
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

    private _onClickSaveBulk() {
        this.setState({showModal: true});
    }

    private _onChangeDuration(startDate: moment.Moment, endDate: moment.Moment, action: string) {
        const currentTime = moment();
        switch (action) {
            case '_onStartDateChange':
                startDate = startDate > currentTime ? startDate : currentTime;
                endDate = startDate > moment(this.factory.factorySession.to) ? startDate : endDate;
                break;
            case '_onPickerRangeChange':
                startDate = startDate < currentTime ? currentTime : startDate;
                break;
        }
        this.factory.factorySession.from = startDate.toISOString();
        this.factory.factorySession.to = endDate.toISOString();
        this.setState({session: this.factory.getFormSession});
    }

    private _onChangeWorkshop(id: number, from: Date | null, to: Date | null, key: string) {
        const session = this.factory;
        session.factorySession.sessions[id] = {
            from: from ? from.toISOString() : '',
            key,
            to: to ?  to.toISOString() : ''
        };
        this.setState({session: this.factory.getFormSession, listSession: {id}});
    }

    private _onAddWorkshop(from: Date | null, to: Date | null) {
        const session = this.factory;
        const uniqueKey = Date.now().toString() + session.factorySession.sessions.length;
        session.factorySession.sessions.push({
            from: from ? from.toISOString() : '',
            key: uniqueKey,
            to: to ?  to.toISOString() : ''
        });
        this.setState({session: this.factory.getFormSession});
    }

    private _onRemoveWorkshop(id: number) {
        this.factory.factorySession.sessions.splice(id, 1);
        this.setState({session: this.factory.getFormSession});
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
        this.factory.updateUTCSessions(Object.keys(listSession).map((schedule: string) => {
            const splitted = schedule.split('@');
            return {
                from: splitted[0],
                to: splitted[1],
                weekDay: Number(splitted[2]),
            }
        }));
        this.setState({listSession, session: this.factory.getFormSession});
    }

    private _onChangeSessionDetail(type: string, item:any) {
        const session = this.factory;
        switch (type) {
            case SESSION_SELECTED:
                session.setSessionSelected(item.id, item.name, this.mentorId);
                break;
            case SESSION_SKILL:
                session.setSkill(item.id, item.name);
                break;
            case SESSION_TYPE:
                session.setSessionType(item.id);
                if (session.isVirtual) {
                    session.setMaxStudents(this.locations.getVirtualMaxStudents().toString());
                } else {
                    session.setMaxStudents('1');
                }
                break;
            case SESSION_SITE:
                session.setSelectedSite(item.id);
                session.setLocation('');
                if (!session.isVirtual) {
                    session.setMaxStudents('1');
                }
                break;
            case SESSION_BLOCK:
                session.setSelectedBlock(item.id);
                session.setLocation('');
                if (!session.isVirtual) {
                    session.setMaxStudents('1');
                }
                break;
            case SESSION_ROOM:
                session.setLocation(item.id);
                break;
            case SESSION_MAX_STUDENTS:
                session.setMaxStudents(item.name);
                break;
        }
        this.setState({session: session.getFormSession}, () => {
            if (SESSION_SELECTED === type) {
                this.setState({loading: true});
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
                const session = this.factory;
                session.factorySession.interestAreaId = area.id;
                session.factorySession.interestAreaName = area.name;
                session.factorySession.mentorId = this.mentorId;
                this.setState({session: this.factory.getFormSession}, () => {
                    this.loadLocations(area.id);
                });
            }
        });
    }

    private loadLocations(idArea: string) {
        this.locationsService.list(idArea, this.mentorId).then((locations) => {
            this.locations.setLocationPhysical(locations[SESSION_PHYSICAL]);
            this.locations.setLocationVirtual(locations[SESSION_VIRTUAL]);
            this.setState({loading: false});
        })
    }
}

export default ScheduleSession;
