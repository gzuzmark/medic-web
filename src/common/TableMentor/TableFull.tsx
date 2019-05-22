import styled from "styled-components";
import colors from "../MentorColor";

export const TableFull = styled.div`
    grid-column: 1/span 4;
    margin-top: 4px;
    padding: 32px 0;
    ${(props: {message?: boolean}) => {
    return !!props.message ? `
            align-items: center;
            background: ${colors.BACKGROUND_COLORS.background_blue};
            display: flex;
            justify-content: center;
        ` : ''
}}
`;
