import * as React from 'react';
import { Text } from '../../../../common/ConsoleText';
import './LegendSessions.scss';

interface IPropsLegendSessions {
    legend: Array<{
        color: string;
        name: string;
    }>
}

class LegendSessions extends React.Component<IPropsLegendSessions, {}> {

    constructor(props: IPropsLegendSessions) {
        super(props);
    }

    public render() {
        return (
            <ul className="LegendSessions">
                {this.props.legend.map((item, index) => {
                    return (
                        <li className="LegendSessions-item" key={'LegendSessions_' + index}>
                            <div className='LegendSessions-item--before'
                                 style={{background: item.color}}>&nbsp;</div>
                            <Text>{item.name}</Text>
                        </li>
                    )
                })}
            </ul>
        );
    }
}

export default LegendSessions;
