import * as React from 'react';
import {Link} from "react-router-dom";
import * as ReactTooltip from 'react-tooltip';
import styled from "styled-components";
import Avatar from '../../../../../common/Avatar/Avatar';
import Icon from "../../../../../common/Icon/Icon";
import {default as colors, FONTS} from "../../../../../common/MentorColor";
import {Body1, LIGHT_TEXT, Subhead1} from '../../../../../common/MentorText';
import {MENTOR_STATUS} from "../../../../../domain/Mentor/MentorBase";
import {ISkill} from "../../../../../domain/Skill/Skill";
import './MentorItem.scss';

export interface IPropsMentorSession {
    name: string;
    skills?: ISkill[];
    image: string;
    id?: string;
    status: string;
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

const NameMentorContainer = styled.div`
    display: flex;
    margin: 12px 0 6px 0;
`;
class MentorItem extends React.Component<IPropsMentorSession, {}> {
    constructor(props: IPropsMentorSession) {
        super(props);
    }

    public render() {
        const disabled = this.props.status === MENTOR_STATUS.DISABLED;
        const incomplete = this.props.status === MENTOR_STATUS.INCOMPLETE;
        const color = disabled ? FONTS.disabled : FONTS.dark;
        const background = disabled ? colors.BACKGROUND_COLORS.background_white : colors.BACKGROUND_COLORS.background_disabled;
        return (
            <div className="MentorItem">
                <ReactTooltip id="ListMentor_MentorItem" effect={"solid"} place={"bottom"} />
                <div style={{position: 'relative', height: 80}}>
                    <Link to={`/admin/editar-mentor/${this.props.id}`}>
                        <Avatar size={48} source={this.props.image} style={{marginTop: 16}}/>
                        <EditOption data-tip={"Editar mentor"} data-for={"ListMentor_MentorItem"}><Icon name={"pencil"} /></EditOption>
                    </Link>
                </div>
                <div className='MentorItem_basicInformation'>
                    <NameMentorContainer>
                        <Subhead1 color={color}>{this.props.name}</Subhead1>
                        {incomplete && <Subhead1 style={{marginLeft: 8}} color={FONTS.error}>(Perfil pendiente)</Subhead1>}
                    </NameMentorContainer>
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
