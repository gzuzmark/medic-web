import * as moment from 'moment';
import * as React from 'react';
import { Text3 } from '../../../../common/ConsoleText';
import FilterList from "../../../../common/FilterList/FilterList";
import {ISessionItem, ISessionListForm} from "../../../../domain/FormSessionBaseBean";
import InputDatePicker from "../../../Reports/components/InputDatePicker/InputDatePicker";
import FormColumn from "../../../ScheduleSession/components/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../ScheduleSession/components/FormRow/FormRow";
import FormSection from "../../../ScheduleSession/components/FormSection/FormSection";
import './FormRemoveMultiple.scss';

interface ISessionLists {
    areas: ISessionListForm[];
    locations: ISessionListForm[];
    rooms: ISessionListForm[];
    skills: ISessionListForm[];
    types: ISessionListForm[];
}

interface IPropsFormRemoveMultiple {
    currentSession: ISessionItem;
    lists: ISessionLists;
    empty: boolean;
    noResults: boolean;
    onSearch(selectedSession: ISessionItem, key: string): void;
    onFilter(selectedSession: ISessionItem, key: string): void;
}

const updateSearch = (onSearch: any) => {
    return (currentSession: object) => {
        onSearch(currentSession);
    }
};

const updateFilter = (onFilter: any, key?: string) => {
    const currentKey = key || '';
    return (currentSession: object) => {
        onFilter(currentSession, currentKey);
    }
};

const isDayBlocked = (toDate: Date) => {
    return (day: moment.Moment) => {
        return day <= moment(toDate) || moment(toDate).add(1, 'year') < day;
    }
};

const FormRemoveMultiple: React.StatelessComponent<IPropsFormRemoveMultiple> = (props) => {
    let counter = 0;
    const fromDate = props.currentSession.from ? new Date(props.currentSession.from) : new Date();
    const toDate = props.currentSession.to ? new Date(props.currentSession.to) : new Date();
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return (
        <React.Fragment>
            <FormSection
                style={{marginBottom: 12, display: 'block'}}
                itemStyle={{width: 650}}>
                <FormRow style={{marginTop: 50}} columns={[
                    <FormColumn key={`FormRemoveMultiple_${++counter}`}  width={2}>
                        <Text3 style={{paddingLeft: 12, paddingBottom: 6}}>Desde el:</Text3>
                        <InputDatePicker
                            id={'from'}
                            error={props.empty}
                            date={fromDate}
                            updateState={updateSearch(props.onSearch)}
                            configDate={{"isDayBlocked": isDayBlocked(today), "isOutsideRange": () => false}}/>
                    </FormColumn>,
                    <FormColumn key={`FormRemoveMultiple_${++counter}`}  width={2}>
                        <Text3 style={{paddingLeft: 12, paddingBottom: 6}}>Hasta el:</Text3>
                        <InputDatePicker
                            id={'to'}
                            error={props.empty}
                            date={toDate}
                            updateState={updateSearch(props.onSearch)}
                            configDate={{"isDayBlocked": isDayBlocked(fromDate), "isOutsideRange": () => false}}/>
                    </FormColumn>
                ]}/>
                <FormRow style={{marginTop: 90}} columns={[
                    <FormColumn key={`FormRemoveMultiple_${++counter}`}  width={2}>
                        <Text3 style={{paddingLeft: 12, paddingBottom: 6}}>Tipo</Text3>
                        <FilterList
                            onChange={updateFilter(props.onFilter, 'area')}
                            error={!props.empty && props.noResults}
                            name={props.currentSession.area && props.currentSession.area.name || ''}
                            list={props.lists.areas}
                            defaultText='Tutorías, Taller, etc.'/>
                    </FormColumn>,
                    <FormColumn key={`FormRemoveMultiple_${++counter}`}  width={2}>
                        <Text3 style={{paddingLeft: 12, paddingBottom: 6}}>Sesión</Text3>
                        <FilterList
                            onChange={updateFilter(props.onFilter, 'skill')}
                            error={!props.empty && props.noResults}
                            name={props.currentSession.skill && props.currentSession.skill.name || ''}
                            list={props.lists.skills}
                            defaultText='Ingresa un curso'/>
                    </FormColumn>
                ]}/>
                <FormRow style={{marginTop: 90}} columns={[
                    <FormColumn key={`FormRemoveMultiple_${++counter}`}  width={2}>
                        <Text3 style={{paddingLeft: 12, paddingBottom: 6}}>Modalidad</Text3>
                        <FilterList
                            onChange={updateFilter(props.onFilter, 'type')}
                            error={!props.empty && props.noResults}
                            name={props.currentSession.type && props.currentSession.type.name || ''}
                            list={props.lists.types}
                            defaultText='Presencial, Virtual, etc'/>
                    </FormColumn>,
                    <FormColumn key={`FormRemoveMultiple_${++counter}`}  width={2} style={{position: 'relative'}}>
                        <Text3 style={{paddingLeft: 12, paddingBottom: 6}}>Sede</Text3>
                        <FilterList
                            onChange={updateFilter(props.onFilter, 'location')}
                            error={!props.empty && props.noResults}
                            name={props.currentSession.location && props.currentSession.location.name || ''}
                            list={props.lists.locations}
                            defaultText='Torre Arequipa, Torre B, etc.'/>
                        <div className={'FormRemoveMultiple_extra-field'}>
                            <Text3 style={{paddingLeft: 12, paddingBottom: 6}}>Aula</Text3>
                            <FilterList
                                onChange={updateFilter(props.onFilter, 'room')}
                                error={!props.empty && props.noResults}
                                name={props.currentSession.room && props.currentSession.room.name || ''}
                                list={props.lists.rooms}
                                defaultText='A1002'/>
                        </div>
                    </FormColumn>
                ]}/>
            </FormSection>
        </React.Fragment>
    );
};

export default FormRemoveMultiple;