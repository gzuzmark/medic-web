import * as React from 'react';
import styled from "styled-components";
import Avatar from '../../../../../common/Avatar/Avatar';
import Icon from "../../../../../common/Icon/Icon";
import {default as colors, FONTS} from "../../../../../common/MentorColor";
import {Body1, LIGHT_TEXT, Subhead1} from '../../../../../common/MentorText';
import {ISkill} from "../../../../../domain/Skill/Skill";
import './MentorItem.scss';

export interface IPropsMentorSession {
    name: string;
    skills?: ISkill[];
    image: string;
    disabled: boolean;
}

const EditOption = styled.div`
    align-items: center;
    background: ${colors.BACKGROUND_COLORS.background_purple};
    border-radius: 50%;
    bottom: 12px;
    cursor: pointer;
    display: flex;
    height: 24px;
    justify-content: center;
    position: absolute;
    right: -9px;
    transition: background 0.3s ease-in-out;
    width: 24px;
    &:hover {
        background: ${colors.MISC_COLORS.light_purple};
    }
    svg.icon.icon-pencil {
        fill: ${colors.BACKGROUND_COLORS.background_white}!important;
        width: 19px;
    }
`;

class MentorItem extends React.Component<IPropsMentorSession, {}> {
    constructor(props: IPropsMentorSession) {
        super(props);
    }

    public render() {
        const color = this.props.disabled ? FONTS.disabled : FONTS.dark;
        const background = this.props.disabled ? colors.BACKGROUND_COLORS.background_white : colors.BACKGROUND_COLORS.background_disabled;
        return (
            <div className="MentorItem">
                <div style={{position: 'relative'}}>
                    <Avatar size={48} source={this.props.image} style={{marginTop: 16}}/>
                    <EditOption><Icon name={"pencil"} /></EditOption>
                </div>
                <div className='MentorItem_basicInformation'>
                    <Subhead1 style={{margin: '12px 0 7px 0'}}  color={color}>{this.props.name}</Subhead1>
                    <div className='MentorItem_tagWrapper'>
                        {this.props.skills && this.props.skills.map((item, index) => {
                           return (
                               <Body1 key={'mentor-item-' + index}
                                      className='MentorItem_tag'
                                      weight={LIGHT_TEXT}
                                      color={color}
                                      style={{'background': background, border: `1px solid ${colors.BACKGROUND_COLORS.background_disabled}`}}>
                                   {item.name}
                               </Body1>
                           )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default MentorItem;
