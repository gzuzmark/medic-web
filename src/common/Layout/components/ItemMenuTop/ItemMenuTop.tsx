import * as React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import Icon from "../../../Icon/Icon";
import colors from "../../../MentorColor";
import {Subhead1} from "../../../MentorText";

interface IPropsItemMenuTop {
    haveSubmenu: boolean;
    url?: string;
}


const ItemTextStyled = styled.div`
    align-items: center;
    cursor: pointer;
    display: flex;
    list-style-type: none;
    padding: 8px 16px;
    position: relative;
    width: 100%;
    &:hover {
        background: ${colors.MISC_COLORS.background_grey_1};
        & > div {
            display: flex;
        }
    }
    &:focus, &:active {
      background: ${colors.BACKGROUND_COLORS.background_purple};
      & > ${Subhead1}, & > span {
        color: ${colors.TEXT_COLORS.font_light};
      }
      & > svg {
        fill: ${colors.TEXT_COLORS.font_light}!important;
      }
    }
`;

const IconArrow = styled(Icon)`
    height: 16px;
    margin: 3px 0 0 auto;
    transform: rotate(180deg);
    width: 16px;
`;

const ItemMenuTop: React.FC<IPropsItemMenuTop> = (props) => {
    return (
        !!props.url ?
            <Link to={props.url}>
                <ItemTextStyled>
                    {props.children}{props.haveSubmenu && <IconArrow name={"navigation-arrow"}/>}
                </ItemTextStyled>
            </Link> :
            <ItemTextStyled>
                {props.children}{props.haveSubmenu && <IconArrow name={"navigation-arrow"}/>}
            </ItemTextStyled>)
};

export default ItemMenuTop;
