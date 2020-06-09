import * as React from 'react';
import emptyState from '../../../../../assets/images/empty_state.png';
import Accordion from "../../../../../common/Accordion/Accordion";
import { Text1, TextBold3, Title2 } from "../../../../../common/ConsoleText"
import Icon from "../../../../../common/Icon/Icon";
import colors, {FONTS} from "../../../../../common/MentorColor";
import { Headline1 } from "../../../../../common/MentorText"
import Utilities from "../../../../../common/Utils/Utilities";
import {ISessionCollector} from "../../../../../domain/Session/SessionCollector";
import {SessionMentorBean} from "../../../../../domain/Session/SessionMentorBean";
import CardSession from "../CardSession/CardSession";
import './SessionsMentorDetail.scss';

interface IPropsSessionsMentorDetail {
    selectedDate: string;
    sessionDetail: ISessionMentorDetail
}

export interface ISessionMentorDetail {
    sessions:  ISessionCollector<SessionMentorBean> | null;
    scrollTop: boolean;
}

export const SESSION_NEW_STATUS = {
    assignedSessions: 'ASSIGNED',
    freeSessions: 'AVAILABLE',
    pastSessions: 'FINISHED',
};

const SESSION_STATUS_COLORS = {
    blueColor: colors.MISC_COLORS.blue,
    grayColor: '#d4dce0',
    greenColor: colors.MISC_COLORS.green,
};

class  SessionsMentorDetail extends React.Component<IPropsSessionsMentorDetail, {}> {
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
        const sessions = this.props.sessionDetail.sessions;
        const isEmpty =
            sessions &&
            sessions.resolve_sessions.length === 0 &&
            sessions.pending_sessions.length === 0;
        const pendingSessions = sessions && sessions.pending_sessions;
        const sections = this.props.sessionDetail.sessions ?
            this.props.sessionDetail.sessions.description :
            {topText: '', mainText: '', bottomText: ''};
        const title = `${sections.topText.toLowerCase()} ${sections.mainText} ${sections.bottomText.toLowerCase()}`;
        const [assigned, available, finished] = Object.values(SESSION_NEW_STATUS).map(status =>
            pendingSessions && pendingSessions.filter(item => item.filterStatusSession(status))
        );
        const allFinished = Object.assign(sessions && sessions.resolve_sessions, finished);
        return this.props.sessionDetail.sessions && !isEmpty ? (
            <div className={"SessionsMentorDetail"}>
                <div className={"SessionsMentorDetail_title"}>
                    <Headline1 color={FONTS.green}>
                        Sesiones de {day}{title}</Headline1>
                </div>
                {assigned && !!assigned.length && <div className={"SessionsMentorDetail_session-container"}>
                    <Accordion
                        iconStyle={{ fill: SESSION_STATUS_COLORS.greenColor }}
                        title={
                        <div className={"SessionsMentorDetail_session-title"} style={{ borderColor: SESSION_STATUS_COLORS.greenColor }}>
                            <Text1 color="green">Próximas Sesiones</Text1>
                        </div>
                    } body={
                        <div className={"SessionsMentorDetail_sessions"}>
                            {assigned.map((item: SessionMentorBean) => {
                                const click = this.toSessionDetail(item);
                                return <CardSession
                                    item={item}
                                    key={"CardSession_" + item.session.id}
                                    link={click}
                                    style={{ borderColor: SESSION_STATUS_COLORS.greenColor }}
                                />
                            })}
                        </div>
                    }/>
                </div>}
                {available && !!available.length && <div className={"SessionsMentorDetail_session-container"}>
                    <Accordion
                        iconStyle={{ fill: SESSION_STATUS_COLORS.blueColor }}
                        title={
                        <div className={"SessionsMentorDetail_session-title"} style={{ borderColor: SESSION_STATUS_COLORS.blueColor }}>
                            <Text1 color="blueMetal">Horarios Disponibles</Text1>
                        </div>
                    } body={
                        <div className={"SessionsMentorDetail_sessions"}>
                            {available.map((item: SessionMentorBean) => {
                                const click = this.toSessionDetail(item);
                                return <CardSession
                                    item={item}
                                    key={"CardSession_" + item.session.id}
                                    link={click}
                                    style={{ borderColor: SESSION_STATUS_COLORS.blueColor }}
                                    available={true}
                                />
                            })}
                        </div>
                    }/>
                </div>}
                {allFinished && !!allFinished.length && <div className={"SessionsMentorDetail_session-container"}>
                    <Accordion
                        iconStyle={{ fill: SESSION_STATUS_COLORS.grayColor }}
                        title={
                        <div  className={"SessionsMentorDetail_session-title"}>
                            <Text1>Sesiones Terminadas</Text1>
                        </div>
                    } body={
                        <div className={"SessionsMentorDetail_sessions"}>
                            {allFinished.map((item: SessionMentorBean) => {
                                const click = this.toSessionDetail(item);
                                return <CardSession item={item} key={"CardSession_" + item.session.id} link={click}/>
                            })}
                        </div>
                    }/>
                </div>}
                {this.props.sessionDetail.scrollTop && <div>
                    <button className={"SessionsMentorDetail_scroll-top"} onClick={Utilities.scrollToTop}>
                        <Icon name="navigation-arrow" />
                        <TextBold3>Subir</TextBold3>
                    </button>
                </div>}
            </div>
        ) : (
            <div className={"SessionsMentorDetail"}>
                <div className={"SessionsMentorDetail_title"}>
                    <Title2>
                        Sesiones de {day}{title}</Title2>
                    <img
                        className={"SessionsMentorDetail_empty-state"}
                        src={emptyState}/>
                    <Text1>No tienes sesiones para este día</Text1>
                </div>
            </div>
        );
    }

    private toSessionDetail(item: SessionMentorBean) {
        return `/doctor/sesion/${item.session.id}`;
    }

}

export default SessionsMentorDetail;
