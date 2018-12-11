import * as moment from 'moment';
import * as React from 'react';
import { Text3 } from '../../../../../common/ConsoleText';
import FilterList from "../../../../../common/FilterList/FilterList";
import {ISessionItem, ISessionListForm} from "../../../../../domain/FormSession/FormSessionBaseBean";
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
    disabled: boolean;
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

const isDayBlocked = (date: Date, force: boolean) => {
    return (day: moment.Moment) => {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        day.hours(0).minutes(0).seconds(0);
        const initRange = force ? day <= moment(date) : day < moment(date);

        return initRange || moment(date).add(1, 'year') < day;
    }
};

const FormRemoveMultiple: React.StatelessComponent<IPropsFormRemoveMultiple> = (props) => {
    let counter = 0;
    const fromDate = props.currentSession.from ? new Date(props.currentSession.from) : new Date();
    const toDate = props.currentSession.to ? new Date(props.currentSession.to) : new Date();
    const today = new Date();
    today.setDate(today.getDate() - 1);
    let lists = props.lists;
    let currentSession = props.currentSession;
    if (props.empty) {
        lists = {
            areas: [],
            locations: [],
            rooms: [],
            skills: [],
            types: []
        };
        currentSession = {
            area: undefined,
            location: undefined,
            room: undefined,
            skill: undefined,
            type: undefined
        };
    }
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
                            configDate={{"isDayBlocked": isDayBlocked(today, true), "isOutsideRange": () => false}}/>
                    </FormColumn>,
                    <FormColumn key={`FormRemoveMultiple_${++counter}`}  width={2}>
                        <Text3 style={{paddingLeft: 12, paddingBottom: 6}}>Hasta el:</Text3>
                        <InputDatePicker
                            id={'to'}
                            error={props.empty}
                            date={toDate}
                            updateState={updateSearch(props.onSearch)}
                            configDate={{"isDayBlocked": isDayBlocked(fromDate, false), "isOutsideRange": () => false}}/>
                    </FormColumn>
                ]}/>
                <FormRow style={{marginTop: 90}} columns={[
                    <FormColumn key={`FormRemoveMultiple_${++counter}`}  width={2}>
                        <Text3 style={{paddingLeft: 12, paddingBottom: 6}}>Tipo</Text3>
                        <FilterList
                            onChange={updateFilter(props.onFilter, 'area')}
                            error={!props.empty && props.noResults}
                            name={currentSession.area && currentSession.area.name || ''}
                            list={lists.areas}
                            removeFilters={true}
                            disabled={lists.areas.length <= 1 || props.disabled}
                            defaultText='Tutorías, Taller, etc.'/>
                    </FormColumn>,
                    <FormColumn key={`FormRemoveMultiple_${++counter}`}  width={2}>
                        <Text3 style={{paddingLeft: 12, paddingBottom: 6}}>Sesión</Text3>
                        <FilterList
                            onChange={updateFilter(props.onFilter, 'skill')}
                            error={!props.empty && props.noResults}
                            name={currentSession.skill && currentSession.skill.name || ''}
                            list={lists.skills}
                            removeFilters={true}
                            disabled={lists.skills.length <= 1  || props.disabled}
                            defaultText='Ingresa un curso'/>
                    </FormColumn>
                ]}/>
                <FormRow style={{marginTop: 90}} columns={[
                    <FormColumn key={`FormRemoveMultiple_${++counter}`}  width={2}>
                        <Text3 style={{paddingLeft: 12, paddingBottom: 6}}>Modalidad</Text3>
                        <FilterList
                            onChange={updateFilter(props.onFilter, 'type')}
                            error={!props.empty && props.noResults}
                            name={currentSession.type && currentSession.type.name || ''}
                            list={lists.types}
                            disabled={lists.types.length <= 1  || props.disabled}
                            removeFilters={true}
                            defaultText='Presencial, Virtual, etc'/>
                    </FormColumn>,
                    <FormColumn key={`FormRemoveMultiple_${++counter}`}  width={2} style={{position: 'relative'}}>
                        <Text3 style={{paddingLeft: 12, paddingBottom: 6}}>Sede</Text3>
                        <FilterList
                            onChange={updateFilter(props.onFilter, 'location')}
                            error={!props.empty && props.noResults}
                            name={currentSession.location && currentSession.location.name || ''}
                            list={lists.locations}
                            removeFilters={true}
                            disabled={lists.locations.length <= 1  || props.disabled}
                            defaultText='Torre Arequipa, Torre B, etc.'/>
                    </FormColumn>
                ]}/>
                <FormRow style={{marginTop: 90}} columns={[
                    <FormColumn key={`FormRemoveMultiple_${++counter}`}  width={1}>
                        <Text3 style={{paddingLeft: 12, paddingBottom: 6}}>Dirección</Text3>
                        <FilterList
                            onChange={updateFilter(props.onFilter, 'block')}
                            error={!props.empty && props.noResults}
                            name={currentSession.type && currentSession.type.name || ''}
                            list={lists.types}
                            disabled={lists.types.length <= 1 || props.disabled}
                            removeFilters={true}
                            defaultText='Pacífico, Avenida Arequipa #660'/>
                    </FormColumn>
                ]}/>
                <FormRow style={{marginTop: 90}} columns={[
                    <FormColumn key={`FormRemoveMultiple_${++counter}`}  width={3} style={{position: 'relative'}}>
                        <Text3 style={{paddingLeft: 12, paddingBottom: 6}}>Aula</Text3>
                        <FilterList
                            onChange={updateFilter(props.onFilter, 'room')}
                            error={!props.empty && props.noResults}
                            name={currentSession.room && currentSession.room.name || ''}
                            list={lists.rooms}
                            removeFilters={true}
                            disabled={lists.rooms.length <= 1 || props.disabled}
                            defaultText='A1002'/>
                    </FormColumn>
                ]}/>
            </FormSection>
        </React.Fragment>
    );
};

export default FormRemoveMultiple;
