import * as React from "react";
import styled from "styled-components";
import Icon from "../../../common/Icon/Icon";
import Loader from "../../../common/Loader/Loader";
import {default as colors, FONTS} from "../../../common/MentorColor";
import MentorDropDown from "../../../common/MentorDropDown/MentorDropDown";
import MentorInput from "../../../common/MentorInput/MentorInput";
import {Body1, LIGHT_TEXT, Small1, Subhead1} from "../../../common/MentorText";
import Utilities from "../../../common/Utils/Utilities";

const ToolBar = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 48px;
    & > div {
        flex-basis: 380px;
    }
`;

const TableContainer = styled.div`
    display: grid;
    grid-template-columns: 40% 20% 20% 20%;
    margin-bottom: 70px;
    & > div {
        padding-left: 16px;
    }
`;

const TableHeader = styled.div`
    background: ${colors.BACKGROUND_COLORS.background_blue};
    height: 48px;
    line-height: 48px;
    text-align: ${(props: {center?: boolean}) => props.center ? 'center' : 'left'};
    ${Small1} {
        text-transform: uppercase;
    }
`;

const TableBody =  styled.div`
    align-items: center;
    border-bottom: 1px solid ${colors.BACKGROUND_COLORS.background_disabled};
    display: flex;
    justify-content: ${(props: {center?: boolean}) => props.center ? 'center' : 'flex-start'};
    height: 72px;    
`;

const TableFull = styled.div`
    grid-column: 1/span 4;
    margin-top: 4px;
    padding: 32px 0;
    ${(props: {message?: boolean}) => {
        return !!props.message ? `
            align-items: center;
            background: ${colors.BACKGROUND_COLORS.background_blue};
            display: flex;
            justify-content: center;
        ` : ''
    }}
`;


const StudentCard = styled.div`
    display: flex;
    img {
        border-radius: 50%;
        margin-right: 12px;
    }
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        
    }
`;

const ListStudents: React.FC<{}> = () => {
    const triggerChange = () => void(0);
    return (
        <div className="u-LayoutMargin" style={{padding: '0 35px'}}>
            <ToolBar>
                <MentorDropDown
                    options={[]}
                    name={"selection"}
                    triggerChange={triggerChange}
                    placeholder={'Ejmpl. Introducción a la matemática para economía'}
                    label={"Elige el curso que deseas buscar"}/>
                <MentorInput
                    disabled={true}
                    label={"Buscar alumno"}
                    icon={"search"}
                    attrs={{placeholder: 'Ingresa el código o nombre del almumno'}}/>
            </ToolBar>
            <TableContainer>
                <TableHeader><Small1 color={FONTS.highlight}>Nombre del alumno</Small1></TableHeader>
                <TableHeader center={true}><Small1 color={FONTS.highlight}>Sesiones agendadas</Small1></TableHeader>
                <TableHeader center={true}><Small1 color={FONTS.highlight}>Asistencia a asesiones</Small1></TableHeader>
                <TableHeader center={true}><Small1 color={FONTS.highlight}>Porcentaje de asistencias a UGO</Small1></TableHeader>
                <TableFull message={true}>
                    <Icon name={"alert"}
                          style={{
                              fill: colors.BACKGROUND_COLORS.background_disabled_button,
                              height: 40,
                              width: 40}}/>
                    <Body1 color={FONTS.disabled}>¡Uy! No encontramos alumnos en este curos</Body1>
                </TableFull>
                <TableFull><Loader/></TableFull>
                <TableBody>
                    <StudentCard>
                        <img
                            width="56"
                            height="56"
                            src="https://storage.googleapis.com/ugo-utp.appspot.com/mentors/default.png"
                            onError={Utilities.onErrorStudentImage}/>
                        <div>
                            <Subhead1 color={FONTS.medium}>Anabele Suarez Fukuda</Subhead1>
                            <Body1 weight={LIGHT_TEXT} color={FONTS.medium}>U20031827</Body1>
                        </div>
                    </StudentCard>
                </TableBody>
                <TableBody center={true}>
                    <Body1 weight={LIGHT_TEXT}>4</Body1>
                </TableBody>
                <TableBody center={true}>
                    <Body1 weight={LIGHT_TEXT}>4</Body1>
                </TableBody>
                <TableBody center={true}>
                    <Body1 weight={LIGHT_TEXT}>12%</Body1>
                </TableBody>

                <TableBody>
                    <StudentCard>
                        <img
                            width="56"
                            height="56"
                            src="https://storage.googleapis.com/ugo-utp.appspot.com/mentors/default.png"
                            onError={Utilities.onErrorStudentImage}/>
                        <div>
                            <Subhead1 color={FONTS.medium}>Anabele Suarez Fukuda</Subhead1>
                            <Body1 weight={LIGHT_TEXT} color={FONTS.medium}>U20031827</Body1>
                        </div>
                    </StudentCard>
                </TableBody>
                <TableBody center={true}>
                    <Body1 weight={LIGHT_TEXT}>4</Body1>
                </TableBody>
                <TableBody center={true}>
                    <Body1 weight={LIGHT_TEXT}>4</Body1>
                </TableBody>
                <TableBody center={true}>
                    <Body1 weight={LIGHT_TEXT}>12%</Body1>
                </TableBody>
            </TableContainer>
        </div>
    )
};

export default ListStudents;
