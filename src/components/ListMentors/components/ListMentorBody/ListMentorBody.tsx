import * as React from 'react';
import calendar from '../../../../assets/images/calendar.png';
import { BoldText } from '../../../../common/ConsoleText';
import { IMentorSession } from '../../../../interfaces/Mentor.interface';
import MentorItem from '../MentorItem/MentorItem';


class ListMentorsBody extends React.Component <IMentorSession, {}> {
    constructor(props: IMentorSession) {
        super(props);
    }

    public render() {
        const { sessions, skills, photo, name} = this.props;
        return (
            <React.Fragment>
                <div className="ListMentors-column ListMentors-column--mentor">
                    <MentorItem skills={skills} image={photo} name={name} />
                </div>
                <div className="ListMentors-column ListMentors-separator">
                    <BoldText className="ListMentors-bigtext">{this.getTime(sessions.totalMinutes)}</BoldText>
                </div>
                <div className="ListMentors-column">
                    <img src={calendar} width="24" />
                </div>
                <div className="ListMentors-column">
                    <img src={calendar}  width="24" />
                </div>
            </React.Fragment>
        );
    }

    public getTime(minutes: number) {
        const base = 60;
        const hours = parseInt((minutes / base).toString(), 10);
        const text = hours + 'h' + (minutes - (hours * base)) + 'm';
        return text;
    }

}

export default ListMentorsBody;
