import * as React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTime } from '../../../../../common/ConsoleUtils';
import Icon from "../../../../../common/Icon/Icon";
import {FONTS} from "../../../../../common/MentorColor";
import colors from "../../../../../common/MentorColor";
import { Headline1 } from '../../../../../common/MentorText';
import { IMentor } from '../../../../../interfaces/Mentor.interface';
import MentorItem from '../MentorItem/MentorItem';

const DivStyled = styled.div`
  align-items: center;        
  display: flex;
  width: 100%;
  svg {
      fill: ${colors.BACKGROUND_COLORS.background_purple};
      &:hover {
        fill: ${colors.MISC_COLORS.light_purple};
      }
      &:focus {
        fill: ${colors.MISC_COLORS.dark_purple};
      }
  }
`;

class ListMentorsBody extends React.Component <IMentor, {}> {
    constructor(props: IMentor) {
        super(props);
    }

    public render() {
        const { sessions, skills, user, id} = this.props;
        return (
            <DivStyled>
                <div className="ListMentors-column ListMentors-column--mentor">
                    <MentorItem skills={skills} image={user.photo} name={user.name} />
                </div>
                <div className="ListMentors-column ListMentors-separator">
                    <Headline1 color={FONTS.medium}>{getTime(sessions.totalMinutes)}</Headline1>
                </div>
                <div className="ListMentors-column">
                    <Link to={'/admin/mentores/' + id + '/sesiones'}>
                        <Icon name="calendar"/>
                    </Link>
                </div>
                <div className="ListMentors-column">
                    <Link to={'/admin/mentores/' + id + '/sesiones/agendar'}>
                        <Icon name="add-circle"/>
                    </Link>
                </div>
            </DivStyled>
        );
    }
}

export default ListMentorsBody;
