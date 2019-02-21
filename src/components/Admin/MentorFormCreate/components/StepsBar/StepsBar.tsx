import * as React from "react";
import styled from "styled-components";
import colors from "../../../../../common/MentorColor";
import Step from "../Step/Step";

export interface IStepsBar {
    title: string;
    active: boolean;
    complete: boolean;
    animation: boolean;
}

interface IPropsStepsBar {
    steps: IStepsBar[];
    click: (step: IStepsBar, counter: number) => void;
}

interface IStepsBarContainer {
    progress: number;
}
export const StepsBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    position: relative;
    width: 615px;
    &:before, &:after {
        content: '';
        height: 3px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    &:before {
        background: ${colors.MISC_COLORS.background_grey_2};
        width: 100%;
        z-index: 1;
    }
    &:after {
        background: ${colors.BACKGROUND_COLORS.background_purple};
        transition: width 0.4s ease-in;
        width: ${(props: IStepsBarContainer) => `${100*props.progress}%`};
        z-index: 2
    }
`;

const StepsBar: React.StatelessComponent<IPropsStepsBar> = (props) => {
    let progress = props.steps.filter((step) => step.complete).length / (props.steps.length - 1);
    progress = progress > 1 ? 1 : progress;
    return (
        <StepsBarContainer progress={progress}>
            {props.steps.map((step, index) => {
                const counter = index + 1;
                const click = () => {
                    props.click(step, counter);
                };
                return <Step step={counter} key={`StepsBar_${index}`} {...step} click={click}/>
            })}
        </StepsBarContainer>
    )
};

export default StepsBar;


