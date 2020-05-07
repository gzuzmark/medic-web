import * as React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import Icon from "../../../../../common/Icon/Icon";
import colors, {FONTS} from "../../../../../common/MentorColor";
import {Heading2, LIGHT_TEXT} from '../../../../../common/MentorText';
import { getTime } from '../../../../../common/Utils/DateUtilities';
import {IMentorBase, MENTOR_STATUS} from "../../../../../domain/Mentor/MentorBase";
import MentorItem from '../MentorItem/MentorItem';

interface IContainerRow {
    status: string;
}
const ContainerRow = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  .icon-calendar, .icon-add-circle {
      fill: ${(props: IContainerRow) => {
          let fill = colors.BACKGROUND_COLORS.background_disabled_button;
          if (props.status === MENTOR_STATUS.PUBLISHED) {
            fill = colors.BACKGROUND_COLORS.background_green;
          }
          return fill;
      }};
      &:hover {
        fill: ${(props: IContainerRow) => {
            let fill = colors.BACKGROUND_COLORS.background_disabled_button;
            if (props.status === MENTOR_STATUS.PUBLISHED) {
                fill = colors.BACKGROUND_COLORS.background_dark_green;
            }
            return fill;
        }};
      }
      &:focus {
        fill: ${(props: IContainerRow) => {
            let fill = colors.BACKGROUND_COLORS.background_disabled_button;
            if (props.status === MENTOR_STATUS.PUBLISHED) {
                fill = colors.BACKGROUND_COLORS.background_dark_green;
            }
            return fill;
        }};
      }
  }
`;

interface IPropsListMentorsBody {
    mentor: IMentorBase
}


class ListMentorsBody extends React.Component <IPropsListMentorsBody, {}> {
    constructor(props: IPropsListMentorsBody) {
        super(props);
    }

    public render() {
        const { sessions, skills, user, id, status} = this.props.mentor;
        const color = status === MENTOR_STATUS.DISABLED ? FONTS.disabled : FONTS.dark;
        return (
            <ContainerRow status={status}>
                <div className="ListMentors_column ListMentors_column--mentor">
                    <MentorItem skills={skills}
                                status={status}
                                image={user.photo}
                                id={id}
                                name={`${user.name} ${user.lastname}`} />
                </div>
                <div className="ListMentors_column ListMentors_separator" style={{borderColor: status === MENTOR_STATUS.DISABLED ? colors.MISC_COLORS.background_grey_1 : colors.MISC_COLORS.background_grey_2}}>
                    {status !== MENTOR_STATUS.INCOMPLETE &&
                        <Heading2 weight={LIGHT_TEXT} color={color}>{getTime(sessions.totalMinutes)}</Heading2>}
                </div>
                <div className="ListMentors_column">
                    {status === MENTOR_STATUS.PUBLISHED ?
                        <Link to={'/admin/doctores/' + id + '/sesiones'}>
                            <Icon name="calendar"/>
                        </Link>:
                        <Icon name="calendar"/>
                    }
                </div>
                <div className="ListMentors_column">
                    {status === MENTOR_STATUS.PUBLISHED ?
                        <Link to={'/admin/doctores/' + id + '/sesiones/agendar'}>
                            <Icon name="add-circle"/>
                        </Link>:
                        <Icon name="add-circle"/>
                    }
                </div>
            </ContainerRow>
        );
    }
}

export default ListMentorsBody;
