import * as React from 'react';
import { Text } from '../../../../common/ConsoleText';
import FilterList from '../../../../common/FilterList/FilterList';
import { IMatchParam } from '../../../../interfaces/MatchParam.interface';
import { IMentorDescription } from '../../../../interfaces/Mentor.interface';
import FormColumn from '../FormRow/components/FormColumn/FormColumn';
import FormRow from './../../components/FormRow/FormRow';
import './ScheduleDuration.scss';

interface IPropsScheduleSession {
    match?: IMatchParam;
}


interface IStateScheduleSession {
    mentor?: IMentorDescription;
}


class ScheduleDuration extends React.Component <IPropsScheduleSession, IStateScheduleSession> {
    public state: IStateScheduleSession;

    constructor(props: IPropsScheduleSession) {
        super(props);
        this.state = {
            mentor: undefined,
        };
    }

    public render() {
        return (
            <FormRow columns={[
                <FormColumn key={1} width={4}>
                    <label className="InputRadio">
                        <Text>No se repite</Text>
                        <input className="InputRadio--input" type="radio" name="repeat" value='false' />
                        <span className="InputRadio--radio">&nbsp;</span>
                    </label>
                    <label className="InputRadio">
                        <Text>Repetir semanalmente</Text>
                        <input className="InputRadio--input" type="radio" name="repeat" value='true' />
                        <span className="InputRadio--radio">&nbsp;</span>
                    </label>
                </FormColumn>,
                <FormColumn key={3} width={3}>
                    <Text>En la semana del:</Text>
                    <FilterList onChange={this._onChange} skills={[{id: '1', name: 'A1003'}, {id: '1', name: 'A1004'}]} defaultText='A1002' enableClearSearch={false}/>
                </FormColumn>,
                <FormColumn key={4} width={3}>
                    <Text>Termina la semana del:</Text>
                    <FilterList onChange={this._onChange} skills={[{id: '1', name: 'A1003'}, {id: '1', name: 'A1004'}]} defaultText='A1002' enableClearSearch={false}/>
                </FormColumn>
            ]}/>
        );
    }

    private _onChange(name: string) {
        // tslint:disable:no-console
        console.log('callback', name)
    }
}

export default ScheduleDuration;
