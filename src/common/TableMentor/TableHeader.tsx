import styled from "styled-components";
import colors from "../MentorColor";
import {Small1} from "../MentorText";

export const TableHeader = styled.div`
    background: ${colors.BACKGROUND_COLORS.background_blue};
    height: 48px;
    line-height: 48px;
    text-align: ${(props: {center?: boolean}) => props.center ? 'center' : 'left'};
    ${Small1} {
        text-transform: uppercase;
    }
`;

