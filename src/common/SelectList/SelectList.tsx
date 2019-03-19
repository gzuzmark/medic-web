import * as React from 'react';
import styled from "styled-components";
import {IFilerListItem} from "../FilterList/FilterList";
import Icon from "../Icon/Icon";
import colors from "../MentorColor";
import {LIGHT_TEXT, Subhead1} from '../MentorText';
import './SelectList.scss';


interface IPropsSelectList {
    list: IFilerListItem[];
    onChange: (item: IFilerListItem) => void;
    removeFilters?: () => void;
    style?: React.CSSProperties;
}

const iconStyles: React.CSSProperties = {
    fill: colors.TEXT_COLORS.font_dark,
    height: 32,
    marginLeft: 5,
    marginRight: 5,
    paddingRight: 2,
    width: 32
};

const ItemMenu = styled.li`
    align-items: center;
    display: flex;
    list-style-type: none;
    padding: 12px 10px;
    &:hover {
      background: #eef2f6;
    }
    &:focus, &:active {
      background: ${colors.BACKGROUND_COLORS.background_purple};
      ${Subhead1}, span {
        color: ${colors.TEXT_COLORS.font_light};
      }
      svg {
        fill: ${colors.TEXT_COLORS.font_light}!important;
      }
    }
`;

const click = (item: IFilerListItem, callback: (item: IFilerListItem) => void) => {
    return () => {
        callback(item);
    }
};

const SelectList: React.FC<IPropsSelectList> = (props) => {
    return (
        <ul className="SelectList" style={{...props.style}}>
            {props.list.map((item, index) => {
                return (
                    <ItemMenu key={'select-list-' + index}
                        onClick={click(item, props.onChange)}>
                        {item.icon && <Icon name={item.icon} style={iconStyles}/>}
                        {typeof(item.name) === "string" ?
                            (<Subhead1 weight={LIGHT_TEXT}>{item.name}</Subhead1>) :
                            item.name
                        }
                    </ItemMenu>
                );
            })}
            {!!props.removeFilters &&
            <ItemMenu onClick={props.removeFilters}>
                <Subhead1>Mostrar todo</Subhead1>
            </ItemMenu>}
        </ul>
    );
};

export default SelectList;
