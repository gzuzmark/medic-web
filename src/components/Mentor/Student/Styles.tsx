import styled from "styled-components";
import colors from "../../../common/MentorColor";

export const ProfileStudent = styled.div`
    align-items: center;
    display: flex;
    flex-basis: 300px;
    flex-direction: column;
    margin: 0 auto 50px auto;
    padding: 0px 35px;
    text-align: center;
    width: 300px;
`;

export const StatisticCard = styled.div`
    align-items: center;
    border-width: ${(props: {border?: string}) => {
    let border = '0';
    if (props.border === 'right') {
        border = '0 1px 0 0';
    } else if (props.border === 'left') {
        border = '0 0 0 1px';
    }
    return border
}};
    border-style: solid;
    border-color: ${colors.MISC_COLORS.background_grey_2};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const StatisticTextContainer = styled.div`
    position: relative;
    text-align: center;
    top: ${(props: {top: number}) => `${props.top}px`};
`;


export const StatisticCardsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 55px 0 75px 0;
`;

// tabla

export const TableContainer = styled.div`
    display: grid;
    grid-template-columns: 20% 40% 20% 20%;
    & > div {
        padding-left: 16px;
    }
`;

export const TableBody =  styled.div`
    align-items: center;
    border-left: 1px solid ${colors.BACKGROUND_COLORS.background_disabled};
    border-top: 1px solid ${colors.BACKGROUND_COLORS.background_disabled};
    display: flex;
    justify-content: ${(props: {center?: boolean}) => props.center ? 'center' : 'flex-start'};
    min-height: 72px;
    padding: 9px 16px;
    text-align: ${(props: {center?: boolean}) => props.center ? 'center' : 'left'};
    &:nth-child(4n) {
        border-right: 1px solid ${colors.BACKGROUND_COLORS.background_disabled};
    }
    &:nth-last-child(-n+4) {
        border-bottom: 1px solid ${colors.BACKGROUND_COLORS.background_disabled};
    }
    span {
        word-break: break-word;
    }
`;
