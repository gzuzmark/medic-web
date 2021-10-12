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

export const CitaReservadaEditPast = styled(Container as any) `
    background: #CDD4F0 !important;
    border: 1.5px solid #CDD4F0;
    color: #FFF !important;
`

/** APPOIPMENT FUTURE */

export const CitaNoReservada = styled(Container as any) `
    background: ${BACKGROUNDS.RESERVADA} !important;
    border: 1.5px solid #1ECD96;
    position: relative;
    cursor: unset;
`

export const CitaReservadaWithPatient = styled(Container as any) `
    background: ${BACKGROUNDS.RESERVADA_PATIENT} !important;
    border: 1.5px solid #00B57C;
`

export const CitaReservadaWithPatientEdit = styled(Container as any) `
    background: #A3ABCC !important;
    border: 1.5px solid #A3ABCC;
`

export const CloseIcon = styled.img`
    position: absolute;
    top: 6px
    right: 6px;
    cursor: pointer;
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


/** BUTTON EDIT, CANCEL, SAVE */
// por cuestion de tiempo se hizo aquí :v

const ButtonNormal = styled.button`
    width: 159px;
    padding: 19px 5px !important;
    border-radius: 8px;
    transition-property: background, border, color;
    transition-timing-function: ease-in-out;
    transition-duration: 0.3s;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    cursor: pointer;
`;

export const ButtonAlivia = styled(ButtonNormal as any)`
    @properties disabled;
    background: #1ECD96;
    border: 1px solid #1ECD96;
    color: #FFFFFF;
    cursor: pointer;
    &:disabled {
        background: #84E4C6;
        border: 1px solid #84E4C6;
        cursor: unset;
    }
`;

export const ButtonWhite = styled(ButtonNormal as any)`
    background: #FFFFFF;
    border: 1px solid #1ECD96;
    color: #1ECD96;
`;

export const DivButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    column-gap: 10px;
    margin: 30px 0px 10px;
`;
