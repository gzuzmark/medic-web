import * as React from "react";
import styled from "styled-components";
import colors from "../../../../../common/MentorColor";
import { Body1, Subhead1 } from '../../../../../common/MentorText';


interface IPropsStep {
    step: number;
    title: string;
    active: boolean;
    complete: boolean;
    animation: boolean;
    click: () => void;
}

interface IStepCircle {
    active: boolean;
    complete: boolean;
    animation: boolean;
}

const StepContainer = styled.div`
    cursor: pointer;
    position: relative;
    z-index: 3;
`;

export const StepCircle = styled.div`
    background: ${(props: IStepCircle) => {
        let color = colors.BACKGROUND_COLORS.background_white;
        if (props.complete && !props.active) {
            color = colors.BACKGROUND_COLORS.background_purple;
        }
        return color;
    }}; 
    border: 3px solid ${(props: IStepCircle) => {
        let color = colors.MISC_COLORS.background_grey_2;
        if (props.active || props.complete) {
            color = colors.BACKGROUND_COLORS.background_purple;
        }
        return color;
    }};
    border-radius: 50%;
    display: table-cell;
    height: 48px;
    text-align: center;
    transition: ${(props: IStepCircle) => {
        let transition = '';
        if (props.animation) {
            transition = 'all 0.1s ease-in 0.3s';
        }
        return transition;
    }};
    vertical-align: middle;
    width: 48px;
`;

export const StepText = styled(Body1)`
    align-items: flex-start;
    bottom: -42px;
    color:  ${(props: IStepCircle) => {
        let color = colors.MISC_COLORS.background_grey_2;
        if (props.complete && !props.active) {
            color = colors.MISC_COLORS.background_blue;
        }
        return color;
    }}; 
    height: 40px;
    display: flex;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
    transition: ${(props: IStepCircle) => {
        let transition = '';
        if (props.animation) {
            transition = 'all 0.1s ease-in 0.3s';
        }
        return transition;
    }};
    position: absolute;
`;

export const StepCircleText = styled(Subhead1)`
    color:  ${(props: IStepCircle) => {
        let color = colors.MISC_COLORS.background_grey_2;
        if (props.active) {
            color = colors.BACKGROUND_COLORS.background_purple;
        } else if (props.complete) {
            color = colors.TEXT_COLORS.font_light;
        }
        return color;
    }}; 
    transition: ${(props: IStepCircle) => {
        let transition = '';    
        if (props.animation) {
            transition = 'all 0.1s ease-in 0.3s';
        }
        return transition;
    }};
`;

const Step: React.StatelessComponent<IPropsStep> = (props) => {
    const {title, step, click, ...status} = props;
    return (
        <StepContainer onClick={click}>
            <StepCircle {...status}>
                <StepCircleText {...status}>{step}</StepCircleText>
            </StepCircle>
            <StepText {...status}>{title}</StepText>
        </StepContainer>
    )
};

export default Step;
