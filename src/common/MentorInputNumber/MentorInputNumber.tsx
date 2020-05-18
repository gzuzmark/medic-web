import * as React from 'react';
import * as NumericInput from "react-numeric-input";
import styled from "styled-components";
import FormLabel from "../FormLabel/FormLabel";
import colors from "../MentorColor";
import {InputContainer} from '../MentorInput/MentorInput';
import {LIGHT_TEXT, Small1} from "../MentorText";

export interface IPropsMentorInputNumber {
    max: number;
    min?: number;
    value?: string;
    onChange: (n: number) => void
    onBlur?: (n: any) => void
    label?: string;
    info?: string;
    error?: string;
    styleContainer?: React.CSSProperties;
}

const getValidNumber = (numericValue: number, max: number) => {
    let value = numericValue.toString();
    if (numericValue > max) {
        value = value.substr(1);
    }
    if (numericValue < 1) {
        value = '1';
    }
    if (Number(value) === 0 || Number(value) > max) {
        value = max.toString();
    }
    return value;
}

interface IFieldContainer {
    min: number;
    max: number;
    value: number;
}
const FieldContainer = styled.div`
    .react-numeric-input{
        b {
            background: ${colors.BACKGROUND_COLORS.background_white}!important;
            border-color: ${colors.BACKGROUND_COLORS.background_white}!important;
            box-shadow: none!important;
            cursor: pointer!important;
            transition: background ease-in-out 0.5s;
            
            &:hover {
                background: ${colors.BACKGROUND_COLORS.background_white}!important;
            }
            i {
                border: solid ${colors.BACKGROUND_COLORS.background_green}!important;
                border-width: 0 1px 1px 0!important;
                display: inline-block!important;
                padding: 3px!important;
            }
            &:nth-child(3) {
                bottom: 1px!important;
                i {
                    border-color: ${(props: IFieldContainer) => {
                        let color = colors.BACKGROUND_COLORS.background_green;
                        if (props.min === props.value) {
                            color = colors.MISC_COLORS.background_grey_2;
                        }
                        return `transparent ${color} ${color}!important`
                    }}
                    margin: -0.75ex 0px 0px -0.50ex!important;
                    transform: rotate(45deg);
                }
            }
            &:nth-child(2) {
                top: 1px!important;
                i {
                    border-color: ${(props: IFieldContainer) => {
                        let color = colors.BACKGROUND_COLORS.background_green;
                        if (props.max === props.value) {
                            color = colors.MISC_COLORS.background_grey_2;
                        }
                        return `transparent ${color} ${color}!important;`    
                    }}
                    margin: -0.25ex 0px 0px -0.50ex!important;
                    transform: rotate(-135deg);
                }
            }
        }
        input {
            border-radius: 4px!important;
            padding: 0 30px 0 16px!important;
            &[disabled] {
                border: solid 1px ${colors.BACKGROUND_COLORS.background_disabled}!important;
                color: ${colors.TEXT_COLORS.font_disabled}!important;
                &::-webkit-input-placeholder {color: ${colors.BACKGROUND_COLORS.background_disabled}!important;transition: color 0.2s ease-in!important;}
                &:-moz-placeholder           {color: ${colors.BACKGROUND_COLORS.background_disabled}: color 0.2s ease-in!important;}
                &::-moz-placeholder          {color: ${colors.BACKGROUND_COLORS.background_disabled}: color 0.2s ease-in!important;}
                &:-ms-input-placeholder      {color: ${colors.BACKGROUND_COLORS.background_disabled}: color 0.2s ease-in!important;}
            }
            &::-webkit-input-placeholder {color: ${colors.TEXT_COLORS.font_blue_grey}!important;transition: color 0.2s ease-in!important;}
            &:-moz-placeholder           {color: ${colors.TEXT_COLORS.font_blue_grey}!important;transition: color 0.2s ease-in!important;}
            &::-moz-placeholder          {color: ${colors.TEXT_COLORS.font_blue_grey}!important;transition: color 0.2s ease-in!important;}
            &:-ms-input-placeholder      {color: ${colors.TEXT_COLORS.font_blue_grey}!important;transition: color 0.2s ease-in!important;}
            
            &:focus {
                border: solid 1px ${colors.TEXT_COLORS.font_dark}!important;
                &::-webkit-input-placeholder {color: ${colors.TEXT_COLORS.font_dark}!important;transition: color 0.2s ease-in!important;}
                &:-moz-placeholder           {color: ${colors.TEXT_COLORS.font_dark}!important;transition: color 0.2s ease-in!important;}
                &::-moz-placeholder          {color: ${colors.TEXT_COLORS.font_dark}!important;transition: color 0.2s ease-in!important;}
                &:-ms-input-placeholder      {color: ${colors.TEXT_COLORS.font_dark}!important;transition: color 0.2s ease-in!important;}
            }
        }
    }
    
`;


const MentorInputNumber: React.FC<IPropsMentorInputNumber> = (props) => {
    let timer = 0 as any;
    const min = typeof(props.min) === "undefined" ? 1 : props.min;
    const onChange = (numericValue: number) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (numericValue) {
                const value = getValidNumber(numericValue, props.max);
                props.onChange(Number(value));
            } else {
                props.onChange(min);
            }
        }, 400)
    };

    const onBlur = (e: any) => {
        props.onChange(e.target.value);
    };

    return (
        <FieldContainer style={{...props.styleContainer}}
                        max={props.max} min={min}
                        value={!!Number(props.value) ? Number(props.value) : min}>
            {props.label && <FormLabel label={props.label} info={props.info} uppercase={true}/>}
            <InputContainer>
                <NumericInput
                    min={min}
                    max={props.max}
                    value={props.value}
                    onBlur={onBlur}
                    onChange={onChange}/>
                {!!props.error &&
                <div className={'MentorInput_message'}><Small1 weight={LIGHT_TEXT}>{props.error}</Small1></div>}
            </InputContainer>
        </FieldContainer>
    )
}

export default MentorInputNumber;
