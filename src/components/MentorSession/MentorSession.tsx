import * as moment from 'moment';
import 'moment/locale/es'
import * as React from 'react';
import BigCalendar from 'react-big-calendar';
import { Link } from 'react-router-dom';
import ConsoleColor from '../../common/ConsoleColor';
import Layout from '../../common/Layout/Layout';
import Loader from '../../common/Loader/Loader';
import Menu from '../../common/Menu/Menu';
import Sticky from '../../common/Sticky/Sticky';
import { IMatchParam } from '../../interfaces/MatchParam.interface';
import {IMentorDescription, IMentorSession} from '../../interfaces/Mentor.interface';
import { ISession } from '../../interfaces/Session.interface';
import MentorService from '../../services/Mentor/Mentor.service';
import './BigCalendar.scss';
import { messages } from './BigCalendarSettings';
import agendaEvent from './components/event/agendaEvent';
import dayEvent from './components/event/dayEvent';
import defaultEvent from './components/event/defaultEvent';
import weekEvent from './components/event/weekEvent';
import LegendSessions from "./components/LegendSessions/LegendSessions";
import './MentorSession.scss';

BigCalendar.momentLocalizer(moment);

interface IStateMentorSession {
    loading: boolean;
    sessions: ISession[];
    mentor?: IMentorDescription;
}

interface IPropsMentorSession {
    match: IMatchParam;
}

class MentorSession extends React.Component<IPropsMentorSession, IStateMentorSession> {
    public state: IStateMentorSession;
    private idMentor: string;
    private mentorService = new MentorService();
    private legendSession = [
        {
            color: this._getBackground('PHYSICAL'),
            name: 'Tutoría presencial',
        },
        {
            color: this._getBackground('VIRTUAL'),
            name: 'Tutoría virtual',
        },
        {
            color: this._getBackground('TALLER'),
            name: 'Taller',
        },
        {
            color: this._getBackground('UNDEFINED'),
            name: 'Indefinido',
        },

    ];
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
            'Calendario de sesiones de ' + this.state.mentor.user.name : 'Calendario de sesiones';
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

    private _eventStyleGetter(event: ISession) {
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
            case 'UNDEFINED':
                background = ConsoleColor.TEXT_COLORS.orangeDark;
                break;
            case 'PHYSICAL':
                background = ConsoleColor.TEXT_COLORS.purpleDark;
                break;
            case 'VIRTUAL':
                background = ConsoleColor.TEXT_COLORS.blueMetal;
                break;
            case 'TALLER':
                background = ConsoleColor.TEXT_COLORS.purpleLight;
                break;
        }
        return background;
    }

    private _getSessions(month: number) {
        this.mentorService.mentor(this.idMentor).then((mentor: IMentorDescription) => {
            this.setState({mentor});
        });
        this.mentorService.sessions(month, this.idMentor).then((mentorSessions: IMentorSession[]) => {
            if (mentorSessions.length > 0) {
                const sessions: ISession[] = mentorSessions.map(
                    (mentorSession: IMentorSession): ISession => {
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
