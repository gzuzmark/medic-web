import * as React from "react";
import styled from "styled-components";
import colors from "../MentorColor";
import {Headline1} from '../MentorText';

interface IPropsDonatChartStyled {
    percent: number;
}

const DonatChartStyled = styled.div`
    margin-top: 20px; 
    position: relative;
    @keyframes circleProgressAnimation {
        to {
            stroke-dashoffset: ${(props: IPropsDonatChartStyled) => {
                const MAX = 440;
                const MIN = 50;
                return (MAX - MIN) * (1 - props.percent) + MIN;
            }};
        }
    }
    ${Headline1} {
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    svg {
        transform: rotate(135deg) scaleX(-1);
    }
    .circle{
        &--progress {
            stroke-dasharray: 440;
            stroke-dashoffset: 440;
        }
        &--blank {
            stroke-dashoffset: 0;
        }
        &--animation {
            animation: circleProgressAnimation 1s ease-out forwards;
        }
    }
   
    
`;

export interface IPropsDonatChart {
    percent: number;
}

const DonatChart: React.FC<IPropsDonatChart> = (props) => {

    return (
        <DonatChartStyled percent={(props.percent/100)}>
            <Headline1>{props.percent}%</Headline1>
            <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <circle className="circle--blank" r="62" cy="80" cx="80" stroke-width="32"
                            stroke={colors.BACKGROUND_COLORS.background_disabled} fill="none" />
                    <circle className="circle--progress circle--animation" r="62" cy="80" cx="80" stroke-width="32"
                            stroke={colors.MISC_COLORS.light_purple} fill="none"/>
                </g>
            </svg>
        </DonatChartStyled>
    )
};

export default DonatChart;
