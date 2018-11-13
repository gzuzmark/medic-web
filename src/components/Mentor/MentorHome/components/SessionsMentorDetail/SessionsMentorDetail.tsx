import * as React from 'react';
import emptyState from '../../../../../assets/images/empty-state.png';
import Accordion from "../../../../../common/Accordion/Accordion";
import { Text1, TextBold3, Title2 } from "../../../../../common/ConsoleText"
import Icon from "../../../../../common/Icon/Icon";
import Utilities from "../../../../../common/Utilities";
import {ISessionCollector} from "../../../../../domain/Session/SessionCollector";
import {SessionMentorBean} from "../../../../../domain/Session/SessionMentorBean";
import CardSession from "../CardSession/CardSession";
import './SessionsMentorDetail.scss';

interface IPropsSessionsMentorDetail {
    sessions:  ISessionCollector<SessionMentorBean>;
    selectedDate: string;
    scrollTop: boolean;
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
                    <Title2>
                        Sesiones de {day}{this.props.sessions.description.topText.toLowerCase()} {this.props.sessions.description.mainText} {this.props.sessions.description.bottomText.toLowerCase()}</Title2>
                </div>
                {!!this.props.sessions.pending_sessions.length && <div className={"SessionsMentorDetail_session-container"}>
                    <Accordion title={
                        <div className={"SessionsMentorDetail_session-title"}>
                            <Text1>Sesiones Activas</Text1>
                        </div>
                    } body={
                        <div className={"SessionsMentorDetail_sessions"}>
                        {this.props.sessions.pending_sessions.map((item: SessionMentorBean) => {
                            const click = this.toSessionDetail(item);
                            return <CardSession item={item} key={"CardSession_" + item.session.id} click={click}/>
                        })}
                        </div>
                    }/>
                </div>}
                {!!this.props.sessions.resolve_sessions.length && <div className={"SessionsMentorDetail_session-container"}>
                    <Accordion title={
                        <div  className={"SessionsMentorDetail_session-title"}>
                            <Text1>Sesiones Terminadas</Text1>
                        </div>
                    } body={
                        <div className={"SessionsMentorDetail_sessions"}>
                            {this.props.sessions.resolve_sessions.map((item: SessionMentorBean) => {
                                const click = this.toSessionDetail(item);
                                return <CardSession item={item} key={"CardSession_" + item.session.id} click={click}/>
                            })}
                        </div>
                    }/>
                </div>}
                {this.props.scrollTop && <div>
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
                        Sesiones de {day}{this.props.sessions.description.topText.toLowerCase()} {this.props.sessions.description.mainText} {this.props.sessions.description.bottomText.toLowerCase()}</Title2>

                    <img
                        className={"SessionsMentorDetail_empty-state"}
                        src={emptyState}/>
                    <Text1>No tienes sesiones para este día</Text1>
                </div>
            </div>
        );
    }

    private toSessionDetail(item: SessionMentorBean) {
        return () => {
            window.location.assign(`/mentor/sesion/${item.session.id}`);
        }
    }

}

export default SessionsMentorDetail;
