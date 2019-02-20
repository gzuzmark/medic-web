import * as React from "react";
import * as ReactTooltip from 'react-tooltip';
import styled from "styled-components";
import Icon from "../Icon/Icon";
import colors from "../MentorColor";
import {Body1, Small1} from '../MentorText';

export interface IPropsConsoleTable {
    label?: string;
    info?: string;
    uppercase?: boolean;
}

const LabelContainer = styled.div`
    align-items: center;
    display: flex;
    height: 24px;
    justify-content: space-between;
`;


const FormLabel: React.StatelessComponent<IPropsConsoleTable> = (props) => {
    return (
        <LabelContainer>
            {!!props.label &&
            <label>
                {!!props.uppercase ?
                    <Small1 style={{marginBottom: 3, display: 'block'}}>{props.label.toUpperCase()}</Small1> :
                    <Body1 style={{marginBottom: 3, display: 'block'}}>{props.label}</Body1>
                }
            </label>}
            {!!props.info &&
            <React.Fragment>
                <ReactTooltip effect={"solid"} place={"top"} multiline={true}/>
                <Icon name={"alert"}
                      attr={{"data-tip": props.info}}
                      style={{
                          cursor: 'pointer',
                          fill: colors.BACKGROUND_COLORS.background_purple,
                          height: 24,
                          width: 24
                      }}/>
            </React.Fragment>}
        </LabelContainer>
    );
};

export default FormLabel;
