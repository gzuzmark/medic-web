import * as React from "react";
import styled from "styled-components";
import colors from "../MentorColor";
import {Body1, LIGHT_TEXT} from "../MentorText";

interface IPropsMentorCheckbox {
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
    border: 1px solid ${colors.MISC_COLORS.background_grey_2};
    height: 16px;
    left: 0;
    margin-right: 7px;
    position: relative;
    top: 0;
    width: 16px;
    &:after {
        border: solid ${colors.MISC_COLORS.dark};
        border-width: 0 1px 1px 0;
        content: "";
        display: none;
        left: 5px;
        height: 7px;
        position: absolute;
        top: 2px;
        transform: rotate(45deg);
        width: 3px;
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
    display: flex;
    position: relative;
    user-select: none;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: flex-end;
    padding: 9px 0;
    input {
        height: 0;     
        opacity: 0;
        position: absolute;
        width: 0;
    }
    input:checked ~ ${CheckboxStyled} {
        background: ${colors.BACKGROUND_COLORS.background_white};
    }
    input:checked ~ ${CheckboxStyled}:after {
        display: block;
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
                disabled: "true"
            };
        }
        return (
            <CheckboxContainer disabled={!!this.props.disabled}>
                <Body1 weight={LIGHT_TEXT}>{this.props.text}</Body1>
                <input type="checkbox" {...properties}/>
                <CheckboxStyled disabled={!!this.props.disabled}/>
            </CheckboxContainer>
        );
    }
}


export default MentorCheckbox;
