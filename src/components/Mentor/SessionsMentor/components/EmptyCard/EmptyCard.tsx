import * as React from 'react';
import { Title2 } from '../../../../../common/ConsoleText';
import Icon from "../../../../../common/Icon/Icon";
import './EmptyCard.scss';

const EmptyCard: React.StatelessComponent<{}> = () => {
    return (
        <div className={`EmptyCard`}>
            <div className={"EmptyCard_item"}>
                <Icon name={"add-circle"}/>
            </div>
            <div className={"EmptyCard_item"}>
                <Title2>No tienes alumnos inscritos. Puedes agregar alumnos a esta sesión.</Title2>
            </div>
        </div>
    );
};

export default EmptyCard;
