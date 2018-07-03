import * as React from 'react';
import Avatar from '../../../../common/Avatar/Avatar';
import { BoldText, Text } from '../../../../common/ConsoleText';
import { ISkill } from '../../../../interfaces/MentorSession.interface';
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
        // tslint:disable-next-line:no-console
        console.log(this.props.skills);
        return (
            <div className="MentorItem">
                <Avatar size={50} source={this.props.image}/>
                <div className='MentorItem-basicInformation'>
                    <BoldText className='MentorItem-text'>{this.props.name}</BoldText>
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
