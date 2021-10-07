import styled from "styled-components";

const BACKGROUNDS = {
    NO_RESERVADA: '#E9FAF5',
    NO_RESERVADA_PAST: '#E9FAF5',
    NO_RESERVADA_EDITABLE: '#E9FAF5',

    RESERVADA: '#E9FAF5',
    RESERVADA_PAST: '#84E4C6',
    RESERVADA_PATIENT: '#1ECD96',
}

const COLORS = {
    NO_RESERVADA: '#00B57C',
    NO_RESERVADA_PAST: '#51D8AE',
    RESERVADA: '#FFFFFF',
}

const FONT_FAMILY_MULISH = 'font-family: Mulish';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 40px; 
    box-sizing: border-box;
    border-radius: 8px;
    padding: 5px 12px;
`;

/** APPOIMENT PAST */

export const CitaNoReservadaPast = styled(Container as any)`
    background: ${BACKGROUNDS.NO_RESERVADA_PAST} !important;
    border: 1.5px solid #84E4C6;
    color: ${COLORS.NO_RESERVADA} !important;
`;

export const CitaReservadaPast = styled(Container as any) `
    background: ${BACKGROUNDS.RESERVADA_PAST} !important;
    border: 1.5px solid #84E4C6;
    color: #FFF !important;
`
/** APPOIPMENT FUTURE */

export const CitaReservada = styled(Container as any) `
    background: ${BACKGROUNDS.RESERVADA} !important;
    border: 1.5px solid #1ECD96;
`

export const CitaReservadaWithPatient = styled(Container as any) `
    background: ${BACKGROUNDS.RESERVADA_PATIENT} !important;
    border: 1.5px solid #00B57C;
`

/** HOURS */

const Hour = styled.div`
    ${FONT_FAMILY_MULISH}    
    font-style: normal;
    font-weight: 800;
    font-size: 14px;
    line-height: 16px;
`;

export const HourDiv = styled(Hour as any)`
    color: ${COLORS.NO_RESERVADA}
`;

export const HourPastDiv = styled(Hour as any)`
    color: ${COLORS.NO_RESERVADA_PAST}
`;

export const HourPatiendDiv = styled(Hour as any)`
    color: ${COLORS.RESERVADA}
`;

/** PATIENT */

export const PatientDiv = styled.div`
    ${FONT_FAMILY_MULISH}
    color: #FFF
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
`;
