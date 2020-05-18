import * as React from 'react';
import { SubTitle2 } from '../../../../../common/ConsoleText';
import Icon from "../../../../../common/Icon/Icon";
import './EmptyCard.scss';

export interface IPropsEmptyCard {
    addEnabled: boolean;
}

const EmptyCard: React.FC<IPropsEmptyCard> = (props) => {
    return (
        <div className={`EmptyCard EmptyCard--inline`}>
            <div className={"EmptyCard_item"}>
                {props.addEnabled ? <Icon name={"add-circle"}/> : <Icon name={"users"}/>}
            </div>
            <div className={"EmptyCard_item EmptyCard_item--text"}>
                {props.addEnabled ?
                    <SubTitle2>No tienes pacientes inscritos. Puedes agregar pacientes a esta sesión.</SubTitle2> :
                    <SubTitle2>No tienes pacientes inscritos.</SubTitle2>}
            </div>
        </div>
    );
};

export default EmptyCard;
