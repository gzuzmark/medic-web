import * as React from 'react';
import { Title2 } from '../../../common/ConsoleText';
import Icon from "../../../common/Icon/Icon";
import Layout from "../../../common/Layout/Layout";
import Loader from "../../../common/Loader/Loader";
import Utilities from "../../../common/Utilities";
import {IBoxDayDescription, ISessionCollector, SessionCollector} from "../../../domain/Session/SessionCollector";
import {ISessionMentor, SessionMentorBean} from "../../../domain/Session/SessionMentorBean";
import {IMatchParam} from "../../../interfaces/MatchParam.interface";
import SessionService from "../../../services/Session/Session.service";
import DayHandlerBar from "./components/DayHandlerBar/DayHandlerBar";
import SessionsMentorDetail from "./components/SessionsMentorDetail/SessionsMentorDetail";
import './MentorHome.scss';

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
    scrollTop: boolean;
}

class MentorHome extends React.Component<IPropsMentorHome, IStateMentorHome> {
    public state: IStateMentorHome;
    private sessionCollector: SessionCollector<SessionMentorBean> =  new SessionCollector<SessionMentorBean>(
        [], this.getMonday(new Date()).toISOString(), 1);
    private sessionService = new SessionService();
    private mentorId: string;
    constructor(props: any) {
        super(props);
        this.state = {
            counter: 0,
            currentSessions: null,
            loading: true,
            rangeDays: this.sessionCollector.getRangeDays(),
            scrollTop: false,
            selectedDate: (new Date()).toISOString(),
            weekDate: this.getMonday(new Date()).toISOString()
        };
        this.mentorId = this.props.match.params.id;
        this.loadSessions = this.loadSessions.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.updateScrollTop = this.updateScrollTop.bind(this);
    }

    public componentDidMount() {
        const date = this.getMonday(new Date());
        date.setSeconds(0);
        date.setMinutes(0);
        date.setHours(0);
        this.loadSessions(date.toISOString(), 0);
    }

    public render() {
        return <Layout title={"Tutores"}>
            <div className="MentorHome u-LayoutMentorMargin">
                <div className={"MentorHome_title"}>
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
                {!this.state.loading ?
                <SessionsMentorDetail
                    sessions={this.state.currentSessions}
                    selectedDate={this.state.selectedDate}
                    scrollTop={this.state.scrollTop}/> :
                <Loader top={10} height={50}/>}
            </div>
        </Layout>
    }

    private updateDate(selectedDate: string) {
        const date = new Date(selectedDate);
        this.setState({
            currentSessions: this.sessionCollector.getSessionsFrom(date.getDay()),
            selectedDate
        }, () => {
            this.updateScrollTop();
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
            this.sessionService.listMentorSessions(from.toISOString(), to.toISOString(), this.mentorId)
                .then((sessions: ISessionMentor[]) => {
                    const newCounter = currentCounter + counter;
                    const mentorSessions = sessions.map((item) => new SessionMentorBean(item));
                    this.sessionCollector = new SessionCollector<SessionMentorBean>(mentorSessions, date, 1);
                    const selectedDate = this.sessionCollector.getFirstDate(newCounter === 0);
                    this.setState({
                        counter: newCounter,
                        currentSessions: this.sessionCollector.getSessionsFrom(selectedDate.getDay()),
                        loading: false,
                        rangeDays: this.sessionCollector.getRangeDays(),
                        selectedDate: selectedDate.toISOString(),
                        weekDate: this.sessionCollector.selectedDate
                    }, () => {
                        this.updateScrollTop();
                    })
                }, () => {
                    // handle error
                    this.setState({
                        loading: false
                    })
                })
        });
    }

    private updateScrollTop() {
        const extraSpace = 150;
        const show = window.innerHeight + extraSpace < Utilities.getDocumentHeight();
        this.setState({
            scrollTop: show
        })
    }

    private getMonday(date: Date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate()  - day + (day === 0 ? - 6 : 1);
        return new Date(d.setDate(diff));
    }
}

export default MentorHome;