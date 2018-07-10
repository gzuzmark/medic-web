import * as React from 'react';
import Avatar from '../../../../common/Avatar/Avatar';
import { Heading2, Text } from '../../../../common/ConsoleText';
import { IMentorDescription } from '../../../../interfaces/Mentor.interface';
import './MentorDetail.scss';


interface IPropsMentorDetail {
    mentor?: IMentorDescription;
}


class MentorDetail extends React.Component <IPropsMentorDetail, {}> {

    constructor(props: IPropsMentorDetail) {
        super(props);
    }

    public render() {
        const profile = this.props.mentor ? this.props.mentor.company : '';
        return (
            <div className="MentorDetail">
                <div className="MentorDetail-container" style={{height: 'calc(100vh - 60px)'}}>
                    <div className="MentorDetail-profile">
                        <Avatar size={94} source={profile} style={{marginBottom: 24}}/>
                        <Heading2 color="textLight" className="MentorDetail-name">{this.props.mentor? this.props.mentor.user.name : ''}</Heading2>
                        <Text color="textLight" style={{margin: "auto 0 0 0"}}>99 hrs. agendadas</Text>
                    </div>
                    <div className="MentorDetail-sessions">
                        &nbsp;
                    </div>
                </div>
            </div>
        );
    }
}

export default MentorDetail;
