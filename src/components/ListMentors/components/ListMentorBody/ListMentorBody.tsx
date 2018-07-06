import * as React from 'react';
import { Link } from "react-router-dom";
import add from '../../../../assets/images/add.png';
import calendar from '../../../../assets/images/calendar.png';
import { BoldText } from '../../../../common/ConsoleText';
import { IMentor } from '../../../../interfaces/Mentor.interface';
import MentorItem from '../MentorItem/MentorItem';


class ListMentorsBody extends React.Component <IMentor, {}> {
    constructor(props: IMentor) {
        super(props);
    }

    public render() {
        const { sessions, skills, photo, name, id} = this.props;
        return (
            <React.Fragment>
                <div className="ListMentors-column ListMentors-column--mentor">
                    <MentorItem skills={skills} image={photo} name={name} />
                </div>
                <div className="ListMentors-column ListMentors-separator">
                    <BoldText className="ListMentors-bigtext">{this.getTime(sessions.totalMinutes)}</BoldText>
                </div>
                <div className="ListMentors-column">
                    <Link to={'/admin/mentores/sessiones/' + id}>
                        <img src={calendar} width="22" />
                    </Link>
                </div>
                <div className="ListMentors-column">
                    <img src={add}  width="22" />
                </div>
            </React.Fragment>
        );
    }

    public getTime(minutes: number) {
        const base = 60;
        const hours = parseInt((minutes / base).toString(), 10);
        const text = this.lpad(hours, 2) + 'h ' + this.lpad((minutes - (hours * base)), 2) + 'm';
        return text;
    }

    private lpad(value: number, padding: number) {
        const zeroes = new Array(padding+1).join("0");
        return (zeroes + value).slice(-padding);
    }
}

export default ListMentorsBody;
