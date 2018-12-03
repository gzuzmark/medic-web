import * as React from 'react';
import Avatar from '../../../../../common/Avatar/Avatar';
import { Heading2, Text } from '../../../../../common/ConsoleText';
import { ISkill } from '../../../../../interfaces/Mentor.interface';
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
                    <Heading2 className='MentorItem-text'>{this.props.name}</Heading2>
                    <div className='MentorItem-tagWrapper'>
                        {this.props.skills && this.props.skills.map((item, index) => {
                           return (
                               <Text key={'mentor-item-' + index}
                                     className='MentorItem-tag'
                                     style={{'background': item.color}}>
                                   {item.name}
                               </Text>
                           )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default MentorItem;
