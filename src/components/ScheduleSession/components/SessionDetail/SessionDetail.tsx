import * as React from 'react';
import * as NumericInput from "react-numeric-input";
import { Text } from '../../../../common/ConsoleText';
import FilterList from '../../../../common/FilterList/FilterList';
import { IMatchParam } from '../../../../interfaces/MatchParam.interface';
import { IMentorDescription } from '../../../../interfaces/Mentor.interface';
import FormColumn from '../FormRow/components/FormColumn/FormColumn';
import FormRow from './../../components/FormRow/FormRow';
import './SessionDetail.scss';

interface IPropsSessionDetail {
    match?: IMatchParam;
}


interface IStateSessionDetail {
    mentor?: IMentorDescription;
}


class SessionDetail extends React.Component <IPropsSessionDetail, IStateSessionDetail> {
    public state: IStateSessionDetail;

    constructor(props: IPropsSessionDetail) {
        super(props);
        this.state = {
            mentor: undefined,
        };
    }

    public render() {
        return (
            <React.Fragment>
                <FormRow columns={[
                    <FormColumn key={1}  width={2}>
                        <Text className='FormSession-label'>Sesión</Text>
                        <FilterList onChange={this._onChange} skills={[{id: '1', name: 'Estidística'}]} defaultText='Química, Física, etc' enableClearSearch={false}/>
                    </FormColumn>,
                    <FormColumn key={2}  width={2}>
                        <Text className='FormSession-label'>Tipo</Text>
                        <FilterList onChange={this._onChange} skills={[{id: '1', name: 'Taller'}]} defaultText='Taller, tutoría, etc.' enableClearSearch={false}/>
                    </FormColumn>,
                ]} style={{marginBottom: 70}}/>

                <FormRow columns={[
                    <FormColumn key={1}  width={2}>
                        <Text className='FormSession-label'>Campus</Text>
                        <FilterList onChange={this._onChange} skills={[{id: '1', name: 'Torre B'}]} defaultText='Torre Arequipa, Torre B, etc.' enableClearSearch={false}/>
                    </FormColumn>,
                    <FormColumn key={1}  width={2}>
                        <FormRow key={5} columns={[
                            <FormColumn key={3}  width={2}>
                                <Text className='FormSession-label'>Aula</Text>
                                <FilterList onChange={this._onChange} skills={[{id: '1', name: 'A1003'}, {id: '1', name: 'A1004'}]} defaultText='A1002' enableClearSearch={false}/>
                            </FormColumn>,
                            <FormColumn key={4} width={2} style={{flexBasis: 90}}>
                                <Text>Capacidad</Text>
                                <NumericInput className="FormSession-input--range" min={1}/>
                            </FormColumn>,
                        ]}/>
                    </FormColumn>
                ]}/>
            </React.Fragment>
        );
    }

    private _onChange(name: string) {
        // tslint:disable:no-console
        console.log('callback', name)
    }
}

export default SessionDetail;
