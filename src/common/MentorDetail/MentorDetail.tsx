import * as React from 'react';
import { IMentor } from '../../interfaces/Mentor.interface';
import Avatar from '../Avatar/Avatar';
import { Heading2, Text } from '../ConsoleText';
import { getTime } from '../ConsoleUtils';
import './MentorDetail.scss';


interface IPropsMentorDetail {
    mentor?: IMentor;
}


class MentorDetail extends React.Component <IPropsMentorDetail, {}> {

    constructor(props: IPropsMentorDetail) {
        super(props);
    }

    public render() {
        const profile = this.props.mentor ? this.props.mentor.user.photo : '';
        return (
            <div className="MentorDetail u-LayoutMargin">
                <div className="MentorDetail-container">
                    <div className="MentorDetail-profile">
                        <Avatar size={94} source={profile} style={{marginBottom: 24}}/>
                        <Heading2 color="textLight" className="MentorDetail-name">{this.props.mentor? this.props.mentor.user.name : ''}</Heading2>
                        {this.props.mentor &&
                            <React.Fragment>
                                <Text color="textLight" style={{margin: "auto 0 0 0"}}>Horas semanales agendadas</Text>
                                <div className="MentorDetail-hours">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="white">
                                        <path id="a" d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm0-2a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm1-15v5.586l2.707 2.707a1 1 0 0 1-1.414 1.414l-3-3A1 1 0 0 1 11 12V6a1 1 0 0 1 2 0z"/>
                                    </svg>
                                    <Text color="textLight" style={{paddingLeft: 7}}>
                                        {getTime(this.props.mentor.sessions.totalMinutes)}
                                    </Text>
                                </div>
                            </React.Fragment>
                        }
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
