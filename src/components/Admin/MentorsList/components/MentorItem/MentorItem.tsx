import * as React from 'react';
import Avatar from '../../../../../common/Avatar/Avatar';
import {default as colors, FONTS} from "../../../../../common/MentorColor";
import {Body1, LIGHT_TEXT, Subhead1} from '../../../../../common/MentorText';
import {ISkill} from "../../../../../domain/Skill/Skill";
import './MentorItem.scss';

export interface IPropsMentorSession {
    name: string;
    skills?: ISkill[];
    image: string;
}

class MentorItem extends React.Component<IPropsMentorSession, {}> {
    constructor(props: IPropsMentorSession) {
        super(props);
    }

    public render() {
        return (
            <div className="MentorItem">
                <Avatar size={48} source={this.props.image} style={{marginTop: 16}}/>
                <div className='MentorItem_basicInformation'>
                    <Subhead1 style={{margin: '12px 0 7px 0'}}  color={FONTS.medium}>{this.props.name}</Subhead1>
                    <div className='MentorItem_tagWrapper'>
                        {this.props.skills && this.props.skills.map((item, index) => {
                           return (
                               <Body1 key={'mentor-item-' + index}
                                      className='MentorItem_tag'
                                      weight={LIGHT_TEXT}
                                      style={{'background': colors.BACKGROUND_COLORS.background_disabled}}>
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
