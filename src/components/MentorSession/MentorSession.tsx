import * as moment from 'moment';
import 'moment/locale/es'
import * as React from 'react';
import BigCalendar from 'react-big-calendar';
import ConsoleColor from "../../common/ConsoleColor";
import { Text } from '../../common/ConsoleText';
import Layout from '../../common/Layout/Layout';
import Loader from '../../common/Loader/Loader';
import Menu from '../../common/Menu/Menu';
import Sticky from '../../common/Sticky/Sticky';
import { IMatchParam } from '../../interfaces/MatchParam.interface';
import { IMentorSession } from '../../interfaces/Mentor.interface';
import { ISession } from '../../interfaces/Session.interface';
import UserRepository from '../../repository/UserRepository';
import MentorService from '../../services/Mentor/Mentor.service';
import './BigCalendar.scss';
import { messages } from './BigCalendarSettings';
import agendaEvent from './components/agendaEvent/agendaEvent';
import dayEvent from './components/dayEvent/dayEvent';
import defaultEvent from "./components/defaultEvent/defaultEvent";
import weekEvent from './components/weekEvent/weekEvent';
import './MentorSession.scss';

BigCalendar.momentLocalizer(moment);

interface IStateMentorSession {
    loading: boolean;
    sessions: ISession[];
}

interface IPropsMentorSession {
    match: IMatchParam;
}

class MentorSession extends React.Component<IPropsMentorSession, IStateMentorSession> {
    public state: IStateMentorSession;
    private idMentor: string;
    private mentorService = new MentorService();
    constructor(props: IPropsMentorSession) {
        super(props);
        this.state = {
            loading: true,
            sessions: []
        };
        this.idMentor = this.props.match.params.id;
        this._eventStyleGetter = this._eventStyleGetter.bind(this);
    }

    public renderMenu() {
        return (
            <Sticky height={60} top={60}>
                <Menu baseText={'Mentores'}
                      url={'/admin/mentores'}
                      textNavigation={'Calendario de sesiones de ' + UserRepository.getUser().name}/>
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
                        <ul className="MentorSession-list">
                            <li className="MentorSession-list_item">
                                <div className='MentorSession-list_item--before'
                                     style={{background: this._getBackground('PHYSICAL')}}>&nbsp;</div>
                                <Text>Tutoría presencial</Text>
                            </li>
                            <li className="MentorSession-list_item">
                                <div className='MentorSession-list_item--before'
                                     style={{background: this._getBackground('VIRTUAL')}}>&nbsp;</div>
                                <Text>Tutoría virtual</Text>
                            </li>
                            <li className="MentorSession-list_item">
                                <div className='MentorSession-list_item--before'
                                     style={{background: this._getBackground('TALLER')}}>&nbsp;</div>
                                <Text>Taller</Text>
                            </li>
                            <li className="MentorSession-list_item">
                                <div className='MentorSession-list_item--before'
                                     style={{background: this._getBackground('UNDEFINED')}}>&nbsp;</div>
                                <Text>Indefinido</Text>
                            </li>
                        </ul>
                        <button className="u-Button MentorSession-button">
                            Agregar sessiones
                        </button>
                    </div>
                    {
                        this.state.loading ?
                        <Loader top={50} height={100}/> :
                        <BigCalendar
                            culture='es'
                            events={this.state.sessions}
                            messages={messages}
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
                            eventPropGetter={(this._eventStyleGetter)}
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

    private _getBackground(type: string) {
        let background;
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
        this.mentorService.sessions(month, this.idMentor).then((mentorSessions: IMentorSession[]) => {
            if (mentorSessions.length > 0) {
                const sessions: ISession[] = mentorSessions.map(
                    (mentorSession: IMentorSession): ISession => {
                        const title = `${mentorSession.skill} ${mentorSession.bookedStudents}/${mentorSession.maxStudents}`;
                        const location = `${mentorSession.type === 'VIRTUAL' ? 'Virtual' : mentorSession.location}`;
                        const site = `${mentorSession.type === 'VIRTUAL' ? 'Virtual' : mentorSession.site}`;
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
