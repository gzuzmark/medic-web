import * as React from 'react';
import Avatar from '../../../../../common/Avatar/Avatar';
import {FONTS} from "../../../../../common/MentorColor";
import { Body1, Heading3 } from '../../../../../common/MentorText';
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
                <div className='MentorItem-basicInformation'>
                    <Heading3 style={{margin: '12px 0'}}  color={FONTS.medium}>{this.props.name}</Heading3>
                    <div className='MentorItem-tagWrapper'>
                        {this.props.skills && this.props.skills.map((item, index) => {
                           return (
                               <Body1 key={'mentor-item-' + index}
                                      className='MentorItem-tag'
                                      color={FONTS.medium}
                                      style={{'background': item.color}}>
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
