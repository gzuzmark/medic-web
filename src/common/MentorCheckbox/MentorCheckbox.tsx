import * as React from "react";
import styled from "styled-components";
import colors from "../MentorColor";
import {LIGHT_TEXT, Small1} from "../MentorText";

export interface IPropsMentorCheckbox {
    attr?: object;
    disabled?: boolean;
    text: string;
}

interface ICheckboxStyled {
    disabled: boolean;
}

export const CheckboxStyled = styled.span`
    background: ${(props: ICheckboxStyled) => {
        let background = 'transparent';
        if (props.disabled) {
            background = colors.BACKGROUND_COLORS.background_disabled;
        }
        return background;
    }};
    position: absolute;
    color: #BDBDBD;
    height: 16px;
    left: 0;
    margin-right: 7px;
    top: 0;
    width: 16px;
    &:after {
        content: "";
        position: absolute;
        display: none;
    }
`;


export const CheckboxContainer = styled.label`
    cursor: ${(props: ICheckboxStyled) => {
    let cursor = 'pointer';
        if (props.disabled) {
            cursor = 'default';
        }
        return cursor;
    }};
    display: block;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    align-items: center;
    justify-content: flex-end;
    padding: 16px 0 0 22px;
    input {
         position: absolute;
            opacity: 0;
            cursor: pointer;
    }
    .check {
        position: absolute;
        top: 18px;
        left: 0;
        height: 14px;
        width: 14px;
        border-radius: 2px;
        background-color: #fff;
        border: 1px solid #1ECD96;
    } 
    input:checked ~ .check {
        background-color: #1ECD96;
        border:none;
    }
    input:checked ~ .check:after {
        display: block;
    }
    
    .check:after {
        left: 4px;
        top: 1px;
        width: 6px;
        height: 9px;
        border-radius: 1px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
`;

class MentorCheckbox extends React.Component<IPropsMentorCheckbox, {}> {
    public static defaultProps = {
        disabled: false
    };

    constructor(props: IPropsMentorCheckbox) {
        super(props);
        this.state = {
            focus: false
        };
    }

    public render() {
        let properties = {};
        if (!!this.props.disabled) {
            properties = {
                disabled: ""
            };
        }
        const attr = {...properties, ...this.props.attr};
        return (
            <CheckboxContainer disabled={!!this.props.disabled}>
                <Small1 weight={LIGHT_TEXT}>{this.props.text}</Small1>
                <input type="checkbox" {...attr}/>
                <CheckboxStyled disabled={!!this.props.disabled} className="check"/>
            </CheckboxContainer>
        );
    }
}


export default MentorCheckbox;
