import * as React from 'react';
import { Title2 } from '../../../common/ConsoleText';
import Icon from "../../../common/Icon/Icon";
import Layout from "../../../common/Layout/Layout";
import {IBoxDayDescription, ISessionCollector, SessionCollector} from "../../../domain/Session/SessionCollector";
import {SessionMentorBean} from "../../../domain/Session/SessionMentorBean";
import {IMatchParam} from "../../../interfaces/MatchParam.interface";
import DayHandlerBar from "./components/DayHandlerBar/DayHandlerBar";


export interface IRangeDay {
    status: string;
    description: IBoxDayDescription;
}
interface IPropsMentorHome {
    match: IMatchParam;
}

interface IStateMentorHome {
    currentSessions: ISessionCollector<SessionMentorBean> | null;
    rangeDays: IRangeDay[],
    selectedDay: number;
    loading: boolean;
}

class MentorHome extends React.Component<IPropsMentorHome, IStateMentorHome> {
    public state: IStateMentorHome;
    private sessionCollector: SessionCollector<SessionMentorBean>;
    constructor(props: any) {
        super(props);
        const date = new Date();
        this.state = {
            currentSessions: null,
            loading: true,
            rangeDays: [],
            selectedDay: date.getDay()
        };
        // this.mentorId = this.props.match.params.id;
        this.loadSessions = this.loadSessions.bind(this);
        this.updateDate = this.updateDate.bind(this);
    }

    public componentDidMount() {
        const from = new Date();
        this.loadSessions(from);
    }

    public render() {
        /*<ScheduleMentorDetail
            sessions={this.state.currentSessions}
            currentDate={this.state.selectedDay}/>*/
        return <Layout>
            <div>
                <div>
                    <Icon name={"calendar"}/>
                    <Title2>Tus sesiones</Title2>
                </div>
            </div>
            <DayHandlerBar
                onChangeDate={this.updateDate}
                onChangeWeek={this.loadSessions}
                selectedDate={this.state.selectedDay.toString()}
                rangeDays={this.state.rangeDays}
                loading={this.state.loading}/>
        </Layout>
    }

    private updateDate(selectedDay: number) {
        this.setState({
            currentSessions: this.sessionCollector.getSessionsFrom(selectedDay),
            selectedDay
        })
    }

    private loadSessions(from: Date) {
        this.setState({
            loading: true
        }, () => {
            // then consume service
            this.setState({
                currentSessions: this.sessionCollector.getSessionsFrom(0),
                loading: false,
                rangeDays: this.sessionCollector.getRangeDays()
            })
        });
    }
}

export default MentorHome;