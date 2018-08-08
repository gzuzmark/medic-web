import * as moment from 'moment';
import * as React from 'react';
import { Text } from '../../../../common/ConsoleText';
import {IListItem} from '../../../../common/FilterList/FilterList';
import Loader from '../../../../common/Loader/Loader';
import { IMentor } from '../../../../interfaces/Mentor.interface';
import {ISessionSchedule} from '../../../../interfaces/Session.interface';
import FormSection from '../../components/FormSection/FormSection';
import ScheduleSessionContext, {IScheduleContext} from '../../ScheduleSession.context';
import ScheduleDuration from './../../components/ScheduleDuration/ScheduleDuration';
import SessionDetail from './../../components/SessionDetail/SessionDetail';
import WeekendPicker from './../../components/WeekendPicker/WeekendPicker';
import './../../ScheduleSession.scss';

interface IPropsScheduleSessionForm {
    locations: any;
    mentor?: IMentor;
    savingData: boolean;
    loading: boolean;
    onChangeSessionDetail(type: string, item:IListItem): void;
    onChangeWeekendPicker(sessionSchedule: ISessionSchedule): void;
    onChangeDuration(startDate: moment.Moment, endDate: moment.Moment, action: string): void;
    onClickSaveBulk(): void;
}

class ScheduleSessionForm extends React.Component<IPropsScheduleSessionForm, {}> {

    constructor(props: IPropsScheduleSessionForm) {
        super(props);
    }

    public render() {
        return (
            <ScheduleSessionContext.Consumer>
            {
                (scheduleSessionContext: IScheduleContext) => {
                    const session = scheduleSessionContext.session;
                    const sessionTypes = this.props.mentor && this.props.mentor.interestAreas ? this.props.mentor.interestAreas[0].sessionTypes : [];
                    return (
                        <React.Fragment>
                            {this.props.loading &&
                            <Loader top={250} height={100}/>}
                            {!this.props.loading &&
                            <React.Fragment>
                                <Text>Ingresa los datos de la sesión que te gustaría crear</Text>
                                <FormSection title={'Detalles de la sesión'} style={{marginTop: 32, marginBottom: 18}}>
                                    <SessionDetail
                                        skills={this.props.mentor ? this.props.mentor.skills : []}
                                        locations={this.props.locations}
                                        sessionTypes={sessionTypes}
                                        onChange={this.props.onChangeSessionDetail}/>
                                </FormSection>
                                <hr className='FormSession-separator' />

                                <FormSection title={'Agenda fecha y hora'} style={{marginTop: 30}}>
                                    <WeekendPicker onChange={this.props.onChangeWeekendPicker}/>
                                </FormSection>
                                <FormSection title={'¿Cada cuánto te gustaría que se repitan estas sesiones? '} main={false}>
                                    <ScheduleDuration
                                        onChangeDuration={this.props.onChangeDuration}
                                        startDate={moment(session.from)}
                                        endDate={moment(session.to)}/>
                                </FormSection>
                                <div className="ScheduleSession-button_container">
                                    <button className="u-Button u-Button--white ScheduleSession-button">Cancelar</button>
                                    <button className="u-Button ScheduleSession-button"
                                            disabled={!session.isValid() || this.props.savingData}
                                            onClick={this.props.onClickSaveBulk}
                                            data-loading={this.props.savingData ? true : undefined}>{this.props.savingData ? '' : 'Aceptar'}</button>
                                </div>
                            </React.Fragment>
                            }
                        </React.Fragment>
                    )
                }
            }
            </ScheduleSessionContext.Consumer>
        );
    }
}

export default ScheduleSessionForm;
