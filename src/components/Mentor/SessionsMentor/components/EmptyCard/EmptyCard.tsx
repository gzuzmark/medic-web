import * as React from 'react';
import { SubTitle2, Title2 } from '../../../../../common/ConsoleText';
import Icon from "../../../../../common/Icon/Icon";
import './EmptyCard.scss';

interface IPropsEmptyCard {
    addEnabled: boolean;
}

const EmptyCard: React.StatelessComponent<IPropsEmptyCard> = (props) => {
    return (
        <div className={`EmptyCard ${!props.addEnabled && 'EmptyCard--inline'}`}>
            <div className={"EmptyCard_item"}>
                {props.addEnabled ? <Icon name={"add-circle"}/> : <Icon name={"users"}/>}
            </div>
            <div className={"EmptyCard_item"}>
                {props.addEnabled ?
                    <Title2>No tienes alumnos inscritos. Puedes agregar alumnos a esta sesión.</Title2> :
                    <SubTitle2>No tienes alumnos inscritos.</SubTitle2>}
            </div>
        </div>
    );
};

export default EmptyCard;
