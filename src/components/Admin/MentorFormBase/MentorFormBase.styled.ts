import styled from "styled-components";
import colors from "../../../common/MentorColor";

export const Separator = styled.div`
    border-top: 1px solid ${colors.MISC_COLORS.background_grey_2};
    height: 0;
    margin: 30px 0;
    width: 100%;
`;

export const FormReviewHeader = styled.div`
    display: flex;
    margin-bottom: 20px;
    h4 {
        margin-right: 6px;
    }
`;

export const ExperienceItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 13px;
`;
