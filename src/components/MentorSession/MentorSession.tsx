import * as moment from 'moment';
import 'moment/locale/es'
import * as React from 'react';
import BigCalendar from 'react-big-calendar';
import { Link } from 'react-router-dom';
import ConsoleColor from '../../common/ConsoleColor';
import { IListItem } from '../../common/FilterList/FilterList';
import Layout from '../../common/Layout/Layout';
import Loader from '../../common/Loader/Loader';
import Menu from '../../common/Menu/Menu';
import Sticky from '../../common/Sticky/Sticky';
import { IEvent } from '../../interfaces/Event.interface';
import { IMatchParam } from '../../interfaces/MatchParam.interface';
import { IMentor, IMentorSession } from '../../interfaces/Mentor.interface';
import {
    SESSION_PHYSICAL,
    SESSION_TYPES_TUTORIES,
    SESSION_UNDEFINED,
    SESSION_VIRTUAL,
    SESSION_WORKSHOP,
} from "../../repository/SessionTypeConstants";
import MentorService from '../../services/Mentor/Mentor.service';
import './BigCalendar.scss';
import { messages } from './BigCalendarSettings';
import agendaEvent from './components/event/agendaEvent';
import dayEvent from './components/event/dayEvent';
import defaultEvent from './components/event/defaultEvent';
import weekEvent from './components/event/weekEvent';
import LegendSessions from './components/LegendSessions/LegendSessions';
import './MentorSession.scss';

BigCalendar.momentLocalizer(moment);

interface IStateMentorSession {
    loading: boolean;
    sessions: IEvent[];
    mentor?: IMentor;
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
            loading: true,
            mentor: undefined,
            sessions: [],
        };
        this.idMentor = this.props.match.params.id;
        this._eventStyleGetter = this._eventStyleGetter.bind(this);
    }

    public renderMenu() {
        const textNavigation = this.state.mentor ?
            'Calendario de sesiones de ' + this.state.mentor.name : 'Calendario de sesiones';
        return (
            <Sticky height={90} top={80}>
                <Menu baseText={'Mentores'}
                      url={'/admin/mentores'}
                      textNavigation={textNavigation}/>
            </Sticky>
        )
    }

    public componentDidMount() {
        this._getSessions(6 );
    }

    public render() {
        return (
            <Layout menu={this.renderMenu()}>
                <div className="u-LayoutMargin">
                    <div className="MentorSession">
                        <LegendSessions legend={this.legendSession}/>
                        <Link to={'sesiones/agendar'} className="u-Button MentorSession-button">
                            Agregar sesiones
                        </Link>
                    </div>
                    {
                        this.state.loading ?
                        <Loader top={50} height={100}/> :
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
                            events={this.state.sessions}
                            messages={messages}
                        />
                    }

                </div>
            </Layout>
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
        this.mentorService.mentor(this.idMentor).then((mentor: IMentor) => {
            this.setState({mentor});
        });
        this.mentorService.sessions(month, this.idMentor).then((mentorSessions: IMentorSession[]) => {
            if (mentorSessions.length > 0) {
                const sessions: IEvent[] = mentorSessions.map(
                    (mentorSession: IMentorSession): IEvent => {
                        const title = `${mentorSession.skill} ${mentorSession.bookedStudents}/${mentorSession.maxStudents} inscritos`;
                        const location = `${mentorSession.type === 'VIRTUAL' ? 'Videoconferencia' : mentorSession.location}`;
                        const site = `${mentorSession.type === 'VIRTUAL' ? 'Videoconferencia' : mentorSession.site}`;
                        return {
                            end  : new Date(mentorSession.to),
                            id: mentorSession.id,
                            location,
                            site,
                            start: new Date(mentorSession.from),
                            title,
                            type: mentorSession.type
                        };
                    }
                );
                this.setState({sessions, loading: false});

            } else {
                this.setState({sessions: []});
            }
        }).catch(() => {
            this.setState({sessions: []});
        })
    }
}

export default MentorSession;
