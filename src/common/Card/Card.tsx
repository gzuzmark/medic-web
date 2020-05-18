import * as React from 'react';
import styled from "styled-components";
import {CARD_STATUS} from "../../domain/Card";

export interface IPropsCard {
    status: string;
    main?: boolean;
    className?: string;
    click?: (e: any) => void;
}

export interface IPropsCardStyles {
    status: string;
    main: boolean;
}

const CardStyles = styled.div`
    align-items: center;
    background: ${(props: IPropsCardStyles) => {
        let color = 'white';
        if (props.status === CARD_STATUS.ACTIVE) {
            color = '#f9fbff';
        }
        return color;
    }};
    border: ${(props: IPropsCardStyles) => {
        let style = '#d4dce0 1px solid';
        if (props.status === CARD_STATUS.ACTIVE) {
            style = '#A7D49B 2px solid';
        }
        return style;
    }};
    border-radius: 5px;
    cursor: ${(props: IPropsCardStyles) => {
        return props.status !== CARD_STATUS.DISABLED ? 'pointer' : '';
    }};
    display: flex;
    flex-direction: column;
    height: 132px;
    justify-content: center;
    position: relative;
    width: 132px;
    &:before {
        background: ${(props: IPropsCardStyles) => {
            let color = '#1ECD96';
            if (props.status === CARD_STATUS.DISABLED) {
                color = '#d4dce0';
            }
            return color;
        }};
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        content: '';
        display: ${(props: IPropsCardStyles) => props.main ? 'block' : 'none'};
        height: 8px;
        left: 50%;
        position: absolute;
        top: -1px;
        transform: translateX(-50%);
        width: 81px;
    }
    span, h3, h4 {
        ${(props: IPropsCardStyles) => {
            let styles = '';
            if(props.status === CARD_STATUS.DISABLED) {
                styles = 'color: #d4dce0!important;';
            }
            return styles;
        }}
    }
    
    &:hover {
        ${(props: IPropsCardStyles) => {
            let styles =  `
                background: white;
                border: #1ecd96 2px solid;
                box-shadow: 4px 4px 16px -2px rgba(74, 74, 74, 0.32);
            `;
            if(props.status === CARD_STATUS.DISABLED) {
                styles = '';
            }
            return styles;
        }}
    }
    &:active {
        ${(props: IPropsCardStyles) => {
            let styles =  `
                background: #f9fbff;
                border: #1ecd96 2px solid;
                box-shadow: 0 0 0 0;
            `;
            if(props.status === CARD_STATUS.DISABLED) {
                styles = '';
            }
            return styles;
        }}
    }
`;


const Card: React.FC<IPropsCard> = (props) => (
    <CardStyles className={props.className || ''}
                main={!!props.main}
                status={props.status}
                onClick={props.click && props.click}>{props.children}</CardStyles>
);


export default Card;
