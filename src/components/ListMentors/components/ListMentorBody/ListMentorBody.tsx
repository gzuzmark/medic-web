import * as React from 'react';
import { Link } from "react-router-dom";
import add from '../../../../assets/images/add.png';
import calendar from '../../../../assets/images/calendar.png';
import { BoldText } from '../../../../common/ConsoleText';
import { getTime } from "../../../../common/ConsoleUtils";
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
                    <BoldText className="ListMentors-bigtext">{getTime(sessions.totalMinutes)}</BoldText>
                </div>
                <div className="ListMentors-column">
                    <Link to={'/admin/mentores/' + id + '/sesiones'}>
                        <img src={calendar} width="24" />
                    </Link>
                </div>
                <div className="ListMentors-column">
                    <Link to={'/admin/mentores/' + id + '/sesiones/agendar'}>
                        <img src={add}  width="24" />
                    </Link>
                </div>
            </React.Fragment>
        );
    }
}

export default ListMentorsBody;
