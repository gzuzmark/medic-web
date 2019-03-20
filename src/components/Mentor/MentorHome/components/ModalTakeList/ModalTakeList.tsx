import * as React from 'react';
import styled from "styled-components";
import {ButtonNormal, THEME_SECONDARY} from "../../../../../common/Buttons/Buttons";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import colors  from '../../../../../common/MentorColor';
import {Body1, Heading3, LIGHT_TEXT} from '../../../../../common/MentorText';
import {MomentDateParser} from "../../../../../domain/DateManager/MomentDateParser";
import {SessionMentorBean} from "../../../../../domain/Session/SessionMentorBean";
import SessionService from "../../../../../services/Session/Session.service";
import StudentCheckModal, {StudentCheckModalScreens} from "../../../SessionsMentor/components/StudentCheckModal/StudentCheckModal";

const ContainerDescription = styled.div`
    border-radius: 4px;    
    border: solid 1px ${colors.MISC_COLORS.background_grey_2};
    margin: 28px auto 0 auto;
    width: 312px;
`;

const SubContainerDescription = styled.div`
    align-items: center;
    border-top: ${(props: {borderTop?: true}) => {
        let borderTop = '';
        if (!!props.borderTop) {
            borderTop = `solid 1px ${colors.MISC_COLORS.background_grey_2}`;
        }
        return borderTop;
    }};
    display: flex;
    flex-direction: column;
    padding: 16px 0;
`;

const ContainerButton = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 36px;
`;

const ContainerTakeList = styled.div`
    margin: 10px auto 0 auto;
    text-align: center;
    width: 400px;
`;

interface IPropsModalTakeList {
    item: SessionMentorBean | null;
    loadNoAttendedSessions: () => void;
}

const DEFAULT_VIEW = 'DEFAULT_VIEW';
const sessionService = new SessionService();

const ModalTakeList: React.FC<IPropsModalTakeList> = (props) => {
    const [loading, setLoading] = React.useState(false);
    const [screen, setScreen] = React.useState(DEFAULT_VIEW);
    const options = {loading, screen};
    const item = props.item ? props.item : null;
    const setDefaultScreen = () => setScreen(DEFAULT_VIEW);
    const confirm = () => {
        if (item && item.session.id) {
            setLoading(true);
            sessionService.markAsNoAttended(item.session.id).then(() => {
                item.setAsNoAttended();
                setLoading(false);
                setScreen(StudentCheckModalScreens.SUCCESS);
                props.loadNoAttendedSessions();
            })
        }
    };
    React.useEffect(() => {
        setScreen(DEFAULT_VIEW);
    }, [props.item]);

    return (
        <MentorModalBase show={item !== null}
                         onCloseModal={setDefaultScreen}
                         hideClose={screen !== StudentCheckModalScreens.NO_ATTENDED}>
            {screen !== DEFAULT_VIEW &&
                <StudentCheckModal options={options} confirm={confirm}/>}
            {item && screen === DEFAULT_VIEW &&
                <ContainerTakeList>
                    <Heading3>No olvides pasar lista para la sesión de</Heading3>
                    <ContainerDescription>
                        <SubContainerDescription>
                            <Body1>{item.session.skill && item.session.skill.name}</Body1>
                            <Body1 weight={LIGHT_TEXT} style={{textTransform: 'capitalize'}}>{item.getDate(new MomentDateParser())}</Body1>
                            <Body1 weight={LIGHT_TEXT}>{item.getTime(new MomentDateParser())}</Body1>
                        </SubContainerDescription>
                        <SubContainerDescription borderTop={true}>
                            <Body1 weight={LIGHT_TEXT} style={{textTransform: 'capitalize'}}>{item.getSessionType()}</Body1>
                            {item.isPhysical() && <Body1 weight={LIGHT_TEXT}>{item.getLocation()}</Body1>}
                        </SubContainerDescription>
                    </ContainerDescription>
                    <ContainerButton>
                        <ButtonNormal
                            text={"Nadie se presentó"}
                            type={THEME_SECONDARY}
                            attrs={{
                                onClick: (() => setScreen(StudentCheckModalScreens.NO_ATTENDED))
                            }}/>
                        <ButtonNormal
                            link={true}
                            attrs={{
                                href: `/mentor/sesion/${item.session.id}`
                            }}
                            text={"Tomar asistencia"} />
                    </ContainerButton>
                </ContainerTakeList>}
        </MentorModalBase>
    )
};

export default ModalTakeList;
