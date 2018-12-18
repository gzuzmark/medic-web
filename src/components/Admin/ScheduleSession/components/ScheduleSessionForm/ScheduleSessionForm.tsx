import * as moment from 'moment';
import * as React from 'react';
import { HighlightText, Text } from '../../../../../common/ConsoleText';
import {default as FilterList, IListItem} from '../../../../../common/FilterList/FilterList';
import Loader from '../../../../../common/Loader/Loader';
import {FactorySessionBean} from "../../../../../domain/FactorySession/FactorySessionBean";
import {IArea, IMentor} from '../../../../../interfaces/Mentor.interface';
import {ISessionSchedule} from '../../../../../interfaces/Session.interface';
import FormSection from '../../components/FormSection/FormSection';
import { SESSION_SELECTED } from "../../ScheduleSession.constants";
import ScheduleSessionContext, {IScheduleContext} from '../../ScheduleSession.context';
import FormColumn from '../FormRow/components/FormColumn/FormColumn';
import FormRow from './../../components/FormRow/FormRow';
import './../../ScheduleSession.scss';
import ScheduleDuration from './components/ScheduleDuration/ScheduleDuration';
import SessionDetail from './components/SessionDetail/SessionDetail';
import TimeRangePicker from "./components/TimeRangePicker/TimeRangePicker";
import WeekendPicker from './components/WeekendPicker/WeekendPicker';
import './ScheduleSessionForm.scss'

export interface IFormCallbacks {
    onChangeSessionDetail(type: string, item:IListItem): void;
    onChangeWeekendPicker(sessionSchedule: ISessionSchedule): void;
    onChangeDuration(startDate: moment.Moment, endDate: moment.Moment, action: string): void;
    onChangeWorkshop(id: number, from: Date | null, to: Date | null, key: string): void;
    onClickSaveBulk(): void;
    onCancel(): void;
    onRemoveWorkshop(id: number): void;
    onAddWorkshop(from: Date | null, to: Date | null): void;
}

interface IPropsScheduleSessionForm {
    mentor?: IMentor;
    savingData: boolean;
    loading: boolean;
    callbacks: IFormCallbacks;
}

class ScheduleSessionForm extends React.Component<IPropsScheduleSessionForm, {}> {
    private sessionDetailRef: React.RefObject<SessionDetail>;
    constructor(props: IPropsScheduleSessionForm) {
        super(props);
        this._onChangeSession = this._onChangeSession.bind(this);
        this.sessionDetailRef = React.createRef();
    }

    public render() {
        let areas: IListItem[] = [];
        if (this.props.mentor && this.props.mentor.interestAreas) {
            areas = this.props.mentor.interestAreas
                .map((area: IArea): IListItem => {
                return  {
                    extra: {
                        skills: area.skills,
                        types: area.sessionTypes
                    },
                    id: area.id,
                    name: area.name,
                } as IListItem
            });
        }

        return (
            <ScheduleSessionContext.Consumer>
            {
                (scheduleSessionContext: IScheduleContext) => {
                    const session = scheduleSessionContext.session;
                    const currentArea = this.props.mentor ? this.props.mentor.interestAreas.find((area: IArea) => area.id === session.factorySession.interestAreaId) : false;
                    const sessionTypes = currentArea ? currentArea.sessionTypes : [];
                    return (
                        <div className={"ScheduleSessionForm"}>
                            {this.props.loading &&
                            <div className={"ScheduleSessionForm--loading"}><Loader top={310} height={100} style={{left: -80}}/></div>}
                            {!!this.props.mentor && currentArea &&
                            <React.Fragment>
                                <HighlightText color="purpleDark" style={{marginBottom: 35}}>Ingresa los datos de la sesión que te gustaría crear</HighlightText>
                                <FormSection>
                                    <div style={{width: '80%'}}>
                                        <FormRow columns={[
                                            <FormColumn width={2} key={'FormColumn-Session'}>
                                                <Text className='FormSession-label'>Tipo</Text>
                                                <FilterList
                                                    onChange={this._onChangeSession}
                                                    name={session.factorySession.interestAreaName}
                                                    list={areas}
                                                    defaultText='Taller, tutoría, etc.'/>
                                            </FormColumn>,
                                        ]}/>
                                    </div>
                                </FormSection>
                                <FormSection title={'Detalles de la sesión'} style={{marginTop: 32, marginBottom: 18}}>
                                    <SessionDetail
                                        ref={this.sessionDetailRef}
                                        skills={this.getSkills(session)}
                                        sessionTypes={sessionTypes}
                                        onChange={this.props.callbacks.onChangeSessionDetail}/>
                                </FormSection>
                                {session.isWorkshop ?
                                    <React.Fragment>
                                        <hr className='u-Separator' />
                                        <FormSection title={'Agenda fecha y hora'} style={{marginTop: 30, marginBottom: 2}}>
                                            <Text>Elige la fecha y hora de la sesión</Text>
                                            {session.factorySession.sessions.map((item: ISessionSchedule, index: number) => {
                                                return (
                                                    <TimeRangePicker
                                                        onChange={this.props.callbacks.onChangeWorkshop}
                                                        onRemoveWorkshop={this.props.callbacks.onRemoveWorkshop}
                                                        onAddWorkshop={this.props.callbacks.onAddWorkshop}
                                                        id={index}
                                                        total={session.factorySession.sessions.length}
                                                        uniqueKey={item.key ? item.key : index.toString()}
                                                        key={`FormSection-${item.key}`}/>
                                                )
                                            })}
                                        </FormSection>
                                        <div className="ScheduleSession-button_container">
                                            <button className="u-Button u-Button--white ScheduleSession-button"
                                                    onClick={this.props.callbacks.onCancel}>Cancelar</button>
                                            <button className="u-Button ScheduleSession-button"
                                                    disabled={!session.isWorkShopValid() || this.props.savingData}
                                                    onClick={this.props.callbacks.onClickSaveBulk}
                                                    data-loading={this.props.savingData ? true : undefined}>{this.props.savingData ? '' : 'Aceptar'}</button>
                                        </div>
                                    </React.Fragment> :
                                    <React.Fragment>
                                        <hr className='u-Separator' />
                                        <FormSection title={'Agenda fecha y hora'} style={{marginTop: 30}}>
                                            <WeekendPicker onChange={this.props.callbacks.onChangeWeekendPicker}/>
                                        </FormSection>
                                        <FormSection title={'¿Cada cuánto te gustaría que se repitan estas sesiones? '} main={false}>
                                            <ScheduleDuration
                                                onChangeDuration={this.props.callbacks.onChangeDuration}
                                                startDate={moment(session.factorySession.from)}
                                                endDate={moment(session.factorySession.to)}/>
                                        </FormSection>
                                        <div className="ScheduleSession-button_container">
                                            <button className="u-Button u-Button--white ScheduleSession-button"
                                                    onClick={this.props.callbacks.onCancel}
                                                    >Cancelar</button>
                                            <button className="u-Button ScheduleSession-button"
                                                    disabled={!session.isSessionValid() || this.props.savingData}
                                                    onClick={this.props.callbacks.onClickSaveBulk}
                                                    data-loading={this.props.savingData ? true : undefined}>{this.props.savingData ? '' : 'Aceptar'}</button>
                                        </div>
                                    </React.Fragment>
                                }
                            </React.Fragment>
                            }
                        </div>
                    )
                }
            }
            </ScheduleSessionContext.Consumer>
        );
    }

    private _onChangeSession(item: IListItem) {
        if (this.sessionDetailRef.current) {
            this.sessionDetailRef.current.reset();
        }
        this.props.callbacks.onChangeSessionDetail(SESSION_SELECTED, item)
    }

    private getSkills(session: FactorySessionBean) {
        let items: any[] = [];
        if (this.props.mentor) {
            const currentArea = this.props.mentor.interestAreas.filter((area: IArea) => area.id === session.factorySession.interestAreaId)[0];
            if (currentArea) {
                items = this.props.mentor.skills.filter((skill) => currentArea.skills.indexOf(skill.id) !== -1);
            }
        }
        return items;
    }
}

export default ScheduleSessionForm;
