import * as React from 'react';
import { Text } from '../../common/ConsoleText';
import Layout from '../../common/Layout/Layout';
import Menu from '../../common/Menu/Menu';
import Sticky from '../../common/Sticky/Sticky';
import { IMatchParam } from '../../interfaces/MatchParam.interface';
import { IMentorDescription } from '../../interfaces/Mentor.interface';
import MentorService from '../../services/Mentor/Mentor.service';
import MentorDetail from './components/MentorDetail/MentorDetail';
import ScheduleDuration from "./components/ScheduleDuration/ScheduleDuration";
import SessionDetail from "./components/SessionDetail/SessionDetail";
import TitleSection from './components/TitleSection/TitleSection';
import WeekendPicker from './components/WeekendPicker/WeekendPicker';
import './ScheduleSession.scss';

interface IPropsScheduleSession {
    match: IMatchParam;
}


interface IStateScheduleSession {
    mentor?: IMentorDescription;
}


class ScheduleSession extends React.Component <IPropsScheduleSession, IStateScheduleSession> {
    public state: IStateScheduleSession;
    private idMentor: string;
    private mentorService = new MentorService();

    constructor(props: IPropsScheduleSession) {
        super(props);
        this.state = {
            mentor: undefined,
        };
        this.idMentor = this.props.match.params.id;
        this._getMentor = this._getMentor.bind(this);
    }

    public componentDidMount() {
        this._getMentor();
    }

    public renderMenu() {
        const textNavigation = this.state.mentor ?
            'Crear sesiones para ' + this.state.mentor.user.name : 'Crear sesiones';
        return (
            <React.Fragment>
                <Sticky height={90} top={80}>
                    <div className="u-LayoutMargin" style={{display: 'flex', flexDirection: 'row'}}>
                        <MentorDetail mentor={this.state.mentor}/>
                        <Menu baseText={'Mentores'}
                              url={'/admin/mentores'}
                              textNavigation={textNavigation} />
                    </div>
                </Sticky>
            </React.Fragment>
        )
    }

    public render() {
        return (
            <Layout menu={this.renderMenu()}>
                <div className="u-LayoutMargin">
                    <div className="ScheduleSession">
                        <Text>Ingresa los datos de la sesión que te gustaría crear</Text>
                        <TitleSection title={'Detalles de la sesión'} style={{marginTop: 32, marginBottom: 18}}/>
                        <div className='FormSession-section FormSession-section--first'>
                            <SessionDetail />
                        </div>
                        <hr className='FormSession-separator' />
                        <TitleSection title={'Agenda fecha y hora'} style={{marginTop: 30}}/>
                        <div className='FormSession-section' >
                            <WeekendPicker/>
                        </div>
                        <TitleSection title={'¿Cada cuánto te gustaría que se repitan estas sesiones? '} main={false}/>
                        <div className='FormSession-section' style={{marginTop: 30}}>
                            <ScheduleDuration/>
                        </div>
                        <div className="ScheduleSession-button_container">
                            <button className="u-Button u-Button--white ScheduleSession-button">Cancelar</button>
                            <button className="u-Button ScheduleSession-button">Aceptar</button>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    private _getMentor() {
        this.mentorService.mentor(this.idMentor).then((mentor: IMentorDescription) => {
            this.setState({mentor});
        });
    }
}

export default ScheduleSession;
