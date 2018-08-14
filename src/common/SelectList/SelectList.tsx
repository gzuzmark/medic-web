// TODO: Hola Carlos del futuro esto quizas te sirva para mejorar el buscador de la lista => https://react-select.com/home#async

import * as React from 'react';
import { Text } from '../ConsoleText';
import {IListItem} from "../FilterList/FilterList";
import Icon from "../Icon/Icon";
import './SelectList.scss';


interface IPropsSelectList {
    list: IListItem[];
    onChange: (item: IListItem) => void;
    removeFilters?: () => void;
    style?: React.CSSProperties;
}

const SelectList: React.StatelessComponent<IPropsSelectList> = (props) => {
    return (
        <ul className="SelectList" style={{...props.style}}>
            {props.list.map((item, index) => {
                const click = () => {
                    props.onChange(item);
                };
                return (
                    <li key={'select-list-' + index}
                        className="SelectList-item"
                        onClick={click}>
                        {item.icon && <Icon name={item.icon} style={{paddingRight: 5}}/>}
                        <Text className="SelectList-item_text">{item.name}</Text>
                    </li>
                );
            })}
            {!!props.removeFilters &&
            <li className="SelectList-item" onClick={props.removeFilters}>
                <Text className="SelectList-item_text">Mostrar todo</Text>
            </li>}
        </ul>
    );
};

export default SelectList;