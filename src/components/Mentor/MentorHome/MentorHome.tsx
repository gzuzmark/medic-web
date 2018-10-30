import * as React from 'react';
import { Title2 } from '../../../common/ConsoleText';
import Icon from "../../../common/Icon/Icon";
import Layout from "../../../common/Layout/Layout";
import {IBoxDayDescription, ISessionCollector, SessionCollector} from "../../../domain/Session/SessionCollector";
import {ISessionMentor, SessionMentorBean} from "../../../domain/Session/SessionMentorBean";
import {IMatchParam} from "../../../interfaces/MatchParam.interface";
import SessionService from "../../../services/Session/Session.service";
import DayHandlerBar from "./components/DayHandlerBar/DayHandlerBar";
import SessionsMentorDetail from "./components/SessionsMentorDetail/SessionsMentorDetail";


export interface IRangeDay {
    status: string;
    description: IBoxDayDescription;
    date: string;
}
interface IPropsMentorHome {
    match: IMatchParam;
}

interface IStateMentorHome {
    counter: number;
    currentSessions: ISessionCollector<SessionMentorBean> | null;
    rangeDays: IRangeDay[],
    selectedDate: string;
    weekDate: string;
    loading: boolean;
}

class MentorHome extends React.Component<IPropsMentorHome, IStateMentorHome> {
    public state: IStateMentorHome;
    private sessionCollector: SessionCollector<SessionMentorBean>;
    private sessionService = new SessionService();
    constructor(props: any) {
        super(props);
        this.state = {
            counter: 0,
            currentSessions: null,
            loading: true,
            rangeDays: [],
            selectedDate: (new Date()).toISOString(),
            weekDate: this.getSunday(new Date()).toISOString()
        };
        // this.mentorId = this.props.match.params.id;
        this.loadSessions = this.loadSessions.bind(this);
        this.updateDate = this.updateDate.bind(this);
    }

    public componentDidMount() {
        const date = this.getSunday(new Date());
        date.setSeconds(0);
        date.setMinutes(0);
        date.setHours(0);
        this.loadSessions(date.toISOString(), 0);
    }

    public render() {
        return <Layout>
            <div className="u-LayoutMentorMargin">
                <div>
                    <Icon name={"calendar"}/>
                    <Title2>Tus sesiones</Title2>
                </div>
                <DayHandlerBar
                    onChangeDate={this.updateDate}
                    onChangeWeek={this.loadSessions}
                    selectedDate={this.state.selectedDate}
                    weekDate={this.state.weekDate}
                    rangeDays={this.state.rangeDays}
                    counter={this.state.counter}
                    loading={this.state.loading} />
                <SessionsMentorDetail
                    sessions={this.state.currentSessions}
                    selectedDate={this.state.selectedDate}/>
            </div>
        </Layout>
    }

    private updateDate(selectedDate: string) {
        const date = new Date(selectedDate);
        this.setState({
            currentSessions: this.sessionCollector.getSessionsFrom(date.getDay()),
            selectedDate
        })
    }

    private loadSessions(date: string, counter: number) {
        const from = new Date(date);
        const to = new Date(date);
        const currentCounter = this.state.counter;
        to.setDate(to.getDate() + 7);
        this.setState({
            loading: true
        }, () => {
            this.sessionService.listMentorSessions(from.toISOString(), to.toISOString())
                .then((sessions: ISessionMentor[]) => {
                    const mentorSessions = sessions.map((item) => new SessionMentorBean(item));
                    this.sessionCollector = new SessionCollector<SessionMentorBean>(mentorSessions, date);
                    const selectedDate = new Date(this.sessionCollector.firstEnableDate);
                    this.setState({
                        counter: currentCounter + counter,
                        currentSessions: this.sessionCollector.getSessionsFrom(selectedDate.getDay()),
                        loading: false,
                        rangeDays: this.sessionCollector.getRangeDays(),
                        selectedDate: selectedDate.toISOString(),
                        weekDate: this.sessionCollector.selectedDate
                    })
                }, () => {
                    // handle error
                    this.setState({
                        loading: false
                    })
                })
        });
    }

    private getSunday(date: Date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day;
        return new Date(d.setDate(diff));
    }
}

export default MentorHome;