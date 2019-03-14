import * as React from "react";
import styled from "styled-components";
import blankStar from '../../../../assets/images/rated/blank-star.png';
import fullStar from '../../../../assets/images/rated/full-star.png';
import { FONTS } from "../../../../common/MentorColor";
import { Body1 } from '../../../../common/MentorText';

const RatingSpriteContainer = styled.div`
    display: flex;
    margin-top: 20px;
    & > div {
        background: url(${blankStar}) repeat-x;
        background-size: 17px;
        font-size: 0;
        height: 17px;
        line-height: 0;
        margin-right: 6px;
        overflow: hidden;
        text-indent: -999em;
        width: 85px;
    }
}}
`;

const RatingSpriteTotal =  styled.span`
    background: url(${fullStar}) repeat-x;
    background-position: 0 0;
    background-size: 17px;
    display:block;
    float: left;
    height: 17px;
    width: ${(props: {width: number}) => {
        return `${props.width}%`
    }}
`;
export interface IPropsMentorRating {
    average?: number;
    count: number;
}


const MentorRating: React.FC<IPropsMentorRating> = (props) => {
    const average = props.average || 0;
    const percent = (props.count > 0 ? average : 0) * 20;
    return (
        <RatingSpriteContainer>
            <div>
                <RatingSpriteTotal width={percent}/>
            </div>
            <Body1 color={FONTS.blue_grey}>{props.count > 0 ? `${average}` : 'Sin calificación'}</Body1>
        </RatingSpriteContainer>
    );
};

export default MentorRating;
