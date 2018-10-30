import * as React from 'react';
import { Text1, Title2 } from "../../../../../common/ConsoleText"
import {ISessionCollector} from "../../../../../domain/Session/SessionCollector";
import {SessionMentorBean} from "../../../../../domain/Session/SessionMentorBean";
import CardSession from "../CardSession/CardSession";
import './SessionsMentorDetail.scss';

interface IPropsSessionsMentorDetail {
    sessions:  ISessionCollector<SessionMentorBean> | null;
    selectedDate: string;
}


class SessionsMentorDetail extends React.Component<IPropsSessionsMentorDetail, {}> {
    private selectedDate: Date;

    constructor(props: any) {
        super(props);
    }

    public render() {
        this.selectedDate = new Date(this.props.selectedDate);
        const currentDate = new Date();
        let day = '';
        if (currentDate.getDate() === this.selectedDate.getDate()) {
            day = ' hoy, ';
        } else if (currentDate.getDate() + 1  === this.selectedDate.getDate()) {
            day = 'mañana, ';
        }
        const isEmpty =
            this.props.sessions &&
            this.props.sessions.resolve_sessions.length === 0 &&
            this.props.sessions.pending_sessions.length === 0;
        return this.props.sessions && !isEmpty ? (
            <div className={"SessionsMentorDetail"}>
                <div className={"SessionsMentorDetail_title"}>
                    <Title2>Sesiones de {day}{this.props.sessions.description.topText} {this.props.sessions.description.mainText} {this.props.sessions.description.bottomText}</Title2>
                </div>
                <div className={"SessionsMentorDetail_session-container"}>
                    <div className={"SessionsMentorDetail_session-title"}>
                        <Text1>Sessiones Activas</Text1>
                    </div>
                    <div className={"SessionsMentorDetail_sessions"}>
                        {this.props.sessions.pending_sessions.map((item: SessionMentorBean) => {
                            return <CardSession item={item} key={"CardSession_" + item.session.id}/>
                        })}
                    </div>
                </div>
                <div className={"SessionsMentorDetail_session-container"}>
                    <div  className={"SessionsMentorDetail_session-title"}>
                        <Text1>Sessiones Terminadas</Text1>
                    </div>
                    <div className={"SessionsMentorDetail_sessions"}>
                        {this.props.sessions.resolve_sessions.map((item: SessionMentorBean) => {
                            return <CardSession item={item} key={"CardSession_" + item.session.id}/>
                        })}
                    </div>
                </div>
            </div>
        ) : <div><Title2>Vacío</Title2></div>;
    }

}

export default SessionsMentorDetail;