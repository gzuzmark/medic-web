import * as moment from 'moment';
import * as React from 'react';
import { Text1, Title2 } from "../../../../../common/ConsoleText"
import {ISessionCollector} from "../../../../../domain/Session/SessionCollector";
import {SessionMentorBean} from "../../../../../domain/Session/SessionMentorBean";
import CardSession from "../CardSession/CardSession";

interface IPropsSessionsMentorDetail {
    sessions:  ISessionCollector<SessionMentorBean> | null;
    selectedDate: string;
}


class SessionsMentorDetail extends React.Component<IPropsSessionsMentorDetail, {}> {
    private selectedDate: moment.Moment;

    constructor(props: any) {
        super(props);
    }

    public render() {
        this.selectedDate = moment(this.props.selectedDate);
        const isEmpty =
            this.props.sessions &&
            this.props.sessions.resolve_sessions.length === 0 &&
            this.props.sessions.pending_sessions.length === 0;
        return this.props.sessions && !isEmpty ? (
            <div>
                <Title2>Sesiones de {this.selectedDate.format('dddd MMMM ')}</Title2>
                <div>
                    <div><Text1>Sessiones Activas</Text1></div>
                    <div>
                        {this.props.sessions.pending_sessions.map((item: SessionMentorBean) => {
                            return <CardSession item={item} key={"CardSession_" + item.session.id}/>
                        })}
                    </div>
                </div>
                <div>
                    <div><Text1>Sessiones Terminadas</Text1></div>
                    <div>
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