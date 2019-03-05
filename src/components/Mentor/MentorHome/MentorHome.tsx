import * as React from 'react';
import Icon from "../../../common/Icon/Icon";
import Layout from "../../../common/Layout/Layout";
import Loader from "../../../common/Loader/Loader";
import { Headline1 } from '../../../common/MentorText';
import Utilities from "../../../common/Utils/Utilities";
import {MomentDateParser} from "../../../domain/DateManager/MomentDateParser";
import {ListenerFirebase} from "../../../domain/Listener/ListenerFirebase";
import {IBoxDayDescription, SessionCollector} from "../../../domain/Session/SessionCollector";
import {ISessionMentor, SessionMentorBean} from "../../../domain/Session/SessionMentorBean";
import UserRepository from "../../../repository/UserRepository";
import SessionService from "../../../services/Session/Session.service";
import DayHandlerBar, {IDayHandlerBar} from "./components/DayHandlerBar/DayHandlerBar";
import SessionsMentorDetail, {ISessionMentorDetail} from "./components/SessionsMentorDetail/SessionsMentorDetail";
import './MentorHome.scss';

export interface IRangeDay {
    status: string;
    description: IBoxDayDescription;
    date: string;
}

interface IStateMentorHome {
    daysBar: IDayHandlerBar;
    loading: boolean;
    selectedDate: string;
    sessionDetail: ISessionMentorDetail;
}

class MentorHome extends React.Component<{}, IStateMentorHome> {
    public state: IStateMentorHome;
    private sessionCollector: SessionCollector<SessionMentorBean> =  new SessionCollector<SessionMentorBean>(
        [], Utilities.getMonday().toISOString(), 1);
    private sessionService = new SessionService();
    private mentorId: string;
    private listenerFirebase: ListenerFirebase;
    private mdp: MomentDateParser;
    private interval: any = 0;
    constructor(props: any) {
        super(props);
        this.state = {
            daysBar: this.updateDaysBar(0),
            loading: true,
            selectedDate: (Utilities.todayDate()).toISOString(),
            sessionDetail: {
                scrollTop: false,
                sessions: null,
            }
        };
        this.getNewSessions = this.getNewSessions.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.loadSessions = this.loadSessions.bind(this);
        this.updateScrollTop = this.updateScrollTop.bind(this);
        this.buildRefURL = this.buildRefURL.bind(this);
        this.updateSessionDetail = this.updateSessionDetail.bind(this);
        this.updateDaysBar = this.updateDaysBar.bind(this);
        this.firstLoad = this.firstLoad.bind(this);
        this.mdp = new MomentDateParser();
    }

    public componentDidMount() {
        if (UserRepository.getToken() && UserRepository.getUser()) {
            this.mentorId = UserRepository.getUser().rolId;
            this.firstLoad();
        }
    }

    public firstLoad() {
        const date = Utilities.getMonday();
        const ref = this.buildRefURL(date);
        this.listenerFirebase = new ListenerFirebase(ref);
        this.listenerFirebase.setCallback(() => {
            const { from, to } = this.getRangeDates(date.toISOString());
            this.loadSessions(from, to, 0, true);
        });

        this.setState({
            loading: true
        }, () => {
            this.getNewSessions(date.toISOString(), 0);
            this.listenerFirebase.startListener();
        });
    }

    public componentWillUnmount() {
        this.listenerFirebase.stopListener();
    }

    public render() {
        return <Layout title={"Tutores"}>
            <div className="MentorHome u-LayoutMentorMargin">
                <div className={"MentorHome_title"}>
                    <Icon name={"calendar"}/>
                    <Headline1>Tus sesiones</Headline1>
                </div>
                <DayHandlerBar
                    onChangeDate={this.updateDate}
                    onChangeWeek={this.getNewSessions}
                    selectedDate={this.state.selectedDate}
                    loading={this.state.loading}
                    daysBar={this.state.daysBar} />
                {this.state.sessionDetail.sessions ?
                <SessionsMentorDetail
                    sessionDetail={this.state.sessionDetail}
                    selectedDate={this.state.selectedDate} /> :
                <Loader style={{marginTop: 150}}/>}
            </div>
        </Layout>
    }

    private buildRefURL(date: Date): string {
        const listenerDate = date.toISOString().replace('.', '_');
        return `mentors/${this.mentorId}/sessions/week-changes/on-start/${listenerDate}`;
    }

    private updateDate(selectedDate: string) {
        const date = new Date(selectedDate);
        this.setState({
            selectedDate,
            sessionDetail: this.updateSessionDetail(date)
        }, () => {
            const monday = Utilities.getMonday(date);
            const ref = this.buildRefURL(monday);
            this.listenerFirebase.setCallback(() => {
                const { from, to } = this.getRangeDates(monday.toISOString());
                this.loadSessions(from, to, 0, true);
            });
            this.listenerFirebase.updateRef(ref);
            this.updateScrollTop();
        })
    }

    private getNewSessions(date: string, counter: number) {
        const { from, to } = this.getRangeDates(date);
        const currentCounter = this.state.daysBar.counter + counter;
        this.setState({
            loading: true
        }, () => {
            this.loadSessions(from, to, currentCounter);
        });
    }

    private getRangeDates(date: string) {
        const from = new Date(date);
        const to = new Date(date);
        to.setDate(to.getDate() + 7);
        return { from, to }
    }

    private loadSessions(from: Date, to: Date, counter: number, forceRefresh?: boolean) {
        this.sessionService.listMentorSessions(from.toISOString(), to.toISOString())
            .then((sessions: ISessionMentor[]) => {
                let newState = {};
                const mentorSessions = sessions.map((item) => new SessionMentorBean(item));
                const sessionCollector = new SessionCollector<SessionMentorBean>(mentorSessions, from.toISOString(), 1);
                const isSameWeek = this.mdp.isSameWeek(from.toISOString(), this.sessionCollector.selectedDate);
                if (!this.state.sessionDetail.sessions || !!forceRefresh) {
                    const selectedDate = new Date(this.state.selectedDate);
                    newState = {
                        selectedDate: selectedDate.toISOString(),
                        sessionDetail: this.updateSessionDetail(selectedDate, sessionCollector)
                    }
                }
                if (isSameWeek || !forceRefresh) {
                    this.sessionCollector = sessionCollector;
                    this.setState({
                        daysBar: this.updateDaysBar(counter),
                        loading: false,
                        ...newState
                    }, () => {
                        this.updateScrollTop();
                    })
                } else {
                    this.setState(newState, () => this.updateScrollTop())
                }
            }, () => {
                this.setState({
                    loading: false
                })
            })
    }

    private updateScrollTop() {
        const extraSpace = 150;
        const show = window.innerHeight + extraSpace < Utilities.getDocumentHeight();
        const sessionDetail = {
            ...this.state.sessionDetail,
            scrollTop: show
        };
        this.setState({
            sessionDetail
        })
    }

    private updateDaysBar(counter: number, sessionCollector?: SessionCollector<SessionMentorBean>) {
        if (!sessionCollector) {
            sessionCollector = this.sessionCollector;
        }
        return {
            counter,
            rangeDays: sessionCollector.getRangeDays(),
            weekDate: sessionCollector.selectedDate
        }
    }

    private updateSessionDetail(date: Date, sessionCollector?: SessionCollector<SessionMentorBean>) {
        const collector = sessionCollector || this.sessionCollector;
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            collector.updateCollector();
            this.setState({
                sessionDetail: {
                    ...this.state.sessionDetail,
                    sessions: collector.getSessionsFrom(date.getDay())
                }
            });
        }, 1100);
        return {
            ...this.state.sessionDetail,
            sessions: collector.getSessionsFrom(date.getDay())
        }
    }
}

export default MentorHome;
