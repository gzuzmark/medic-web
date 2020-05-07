import * as moment from 'moment';
import 'moment/locale/es'
import * as React from 'react';
import BigCalendar from 'react-big-calendar';
import { Link } from 'react-router-dom';
import ConsoleColor from '../../../common/ConsoleColor';
import MenuAside from '../../../common/Layout/components/MenuAside/MenuAside';
import Layout from '../../../common/Layout/Layout';
import Loader from '../../../common/Loader/Loader';
import Sticky from '../../../common/Sticky/Sticky';
import {IListItem} from "../../../domain/Lists";
import {IMentorBase} from "../../../domain/Mentor/MentorBase";
import { IEvent } from '../../../interfaces/Event.interface';
import { IMatchParam } from '../../../interfaces/MatchParam.interface';
import { IMentorSession } from '../../../interfaces/Mentor.interface';
import {
    SESSION_PHYSICAL,
    SESSION_TYPES_TUTORIES,
    SESSION_UNDEFINED,
    SESSION_VIRTUAL,
    SESSION_WORKSHOP,
} from "../../../repository/SessionTypeConstants";
import MentorService from '../../../services/Mentor/Mentor.service';
import './BigCalendar.scss';
import { messages } from './BigCalendarSettings';
import agendaEvent from './components/event/agendaEvent';
import dayEvent from './components/event/dayEvent';
import defaultEvent from './components/event/defaultEvent';
import weekEvent from './components/event/weekEvent';
import LegendSessions from './components/LegendSessions/LegendSessions';
import ModalSessionHandler from "./components/ModalHandleSession/ModalSessionHandler";
import './MentorSession.scss';

BigCalendar.momentLocalizer(moment);

interface IStateMentorSession {
    activeModal: boolean;
    loading: boolean;
    sessions: IEvent[];
    selectedEvent?: IEvent;
    mentor?: IMentorBase;
}

interface IPropsMentorSession {
    match: IMatchParam;
}

class MentorSession extends React.Component<IPropsMentorSession, IStateMentorSession> {
    public state: IStateMentorSession;
    private idMentor: string;
    private mentorService = new MentorService();
    private legendSession = SESSION_TYPES_TUTORIES.map((item: IListItem) => {
        return {
            color: this._getBackground(item.id),
            name: item.name
        }
    });

    constructor(props: IPropsMentorSession) {
        super(props);
        this.state = {
            activeModal: false,
            loading: true,
            mentor: undefined,
            sessions: [],
        };
        this.idMentor = this.props.match.params.id;
        this._eventStyleGetter = this._eventStyleGetter.bind(this);
        this._eventShowSession = this._eventShowSession.bind(this);
    }

    public renderMenu() {
        const textNavigation = this.state.mentor ?
            `Calendario de sesiones de ${this.state.mentor.user.name} ${this.state.mentor.user.lastname}` : 'Calendario de sesiones';
        return (
            <Sticky height={120} top={80}>
                <MenuAside icon={'book'}
                           items={[{text: 'Doctores', url: '/admin/doctores'}, {text: textNavigation}]} />
            </Sticky>
        )
    }

    public componentDidMount() {
        this._getSessions(6 );
    }

    public render() {
        return (
            <React.Fragment>
                { this.state.selectedEvent &&
                <ModalSessionHandler title={this.state.selectedEvent.title} show={this.state.activeModal} _onCancel={this.renderMenu}/>}
                <Layout menu={this.renderMenu()}>
                    <div className="u-LayoutMargin">
                        <div className="MentorSession">
                            <LegendSessions legend={this.legendSession}/>
                            <div className={"MentorSession_options"}>
                                <Link to={'/admin/doctores/' + this.idMentor + '/sesiones/eliminar'} className="u-Button MentorSession_button">
                                    Eliminar varias sesiones
                                </Link>
                                <Link to={'/admin/doctores/' + this.idMentor + '/sesiones/agendar'} className="u-Button MentorSession_button">
                                    Crear varias sesiones
                                </Link>
                            </div>
                        </div>
                        {
                            this.state.loading ?
                                <Loader style={{marginTop: 100}} /> :
                                <BigCalendar
                                    components={{
                                        agenda: {
                                            event: agendaEvent,
                                        },
                                        day: {
                                            event: dayEvent,
                                        },
                                        month: {
                                            event: defaultEvent
                                        },
                                        week: {
                                            event: weekEvent,
                                        },
                                    }}
                                    culture='es'
                                    eventPropGetter={(this._eventStyleGetter)}
                                    onSelectEvent={this._eventShowSession}
                                    events={this.state.sessions}
                                    messages={messages}
                                />
                        }
                    </div>
                </Layout>
            </React.Fragment>
        );
    }

    private _eventStyleGetter(event: IEvent) {
        const background = this._getBackground(event.type);
        const style = {
            backgroundColor: background,
            border: '0px',
            borderRadius: '5px',
            color: 'white',
            display: 'block',
            padding: '6px 4px'
        };
        return {
            style
        };
    }

    private _eventShowSession(event: IEvent) {
        this.setState({
            activeModal: false,
            selectedEvent: event
        });
    }

    private _getBackground(type: string): string {
        let background: string = '';
        switch (type) {
            case SESSION_UNDEFINED:
                background = ConsoleColor.TEXT_COLORS.orangeDark;
                break;
            case SESSION_PHYSICAL:
                background = ConsoleColor.TEXT_COLORS.purpleDark;
                break;
            case SESSION_VIRTUAL:
                background = ConsoleColor.TEXT_COLORS.blueMetal;
                break;
            case SESSION_WORKSHOP:
                background = ConsoleColor.TEXT_COLORS.purpleLight;
                break;
        }
        return background;
    }

    private _getSessions(month: number) {
        this.mentorService.mentor(this.idMentor).then((mentor: IMentorBase) => {
            this.setState({mentor});
        });
        this.mentorService.sessions(month, this.idMentor).then((mentorSessions: IMentorSession[]) => {
            if (mentorSessions.length > 0) {
                const sessions: IEvent[] = mentorSessions.map(
                    (mentorSession: IMentorSession): IEvent => {
                        const title = `${mentorSession.skill} ${mentorSession.bookedStudents}/${mentorSession.maxStudents} inscritos`;
                        const location = `${mentorSession.type === 'VIRTUAL' ? 'Videoconferencia' : mentorSession.location}`;
                        const block = `${mentorSession.type === 'VIRTUAL' ? 'Videoconferencia' : mentorSession.block}`;
                        return {
                            block,
                            end  : new Date(mentorSession.to),
                            id: mentorSession.id,
                            location,
                            start: new Date(mentorSession.from),
                            title,
                            type: mentorSession.type
                        };
                    }
                );
                this.setState({sessions, loading: false});

            } else {
                this.setState({sessions: [], loading: false});
            }
        }).catch(() => {
            this.setState({sessions: [], loading: false});
        });
    }
}

export default MentorSession;
