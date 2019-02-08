import * as React from "react";
import styled from "styled-components";
import errorCamera from "../../../../../assets/images/error_camera.png"
import colors, {FONTS} from "../../../../../common/MentorColor";
import {Body1, Heading3, LIGHT_TEXT, Subhead1} from "../../../../../common/MentorText";

interface IStateFormReview {
submitText: string;
}

interface IPropsFormReview {
    currentStep?: number;
}

const Separator = styled.div`
    border-top: 1px solid ${colors.MISC_COLORS.background_grey_2};
    height: 0;
    margin: 30px 0;
    width: 100%;
`;

const Header = styled.div`
    display: flex;
    margin-bottom: 20px;
    h4 {
        margin-right: 6px;
    }
`;

const BasicInformation = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 30px;
    padding: 10px 0;
`;

const ExperienceItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 13px;
`;

class FormReview extends React.Component <IPropsFormReview, IStateFormReview> {
    public state: IStateFormReview;
    constructor(props: IPropsFormReview) {
        super(props);
        this.state = {
            submitText: "Continuar"
        }
    }

    public render() {
        return (
            <div style={{padding: '20px 0'}}>
                <Header>
                    <Subhead1>Datos personales</Subhead1>
                </Header>
                <div style={{alignItems: 'center', display: 'flex'}}>
                    <div>
                        <img src={errorCamera} width={150} height={150} title={"Falta foto de perfil"}/>
                    </div>
                    <BasicInformation>
                        <Heading3>Diandra Katiuska Mackensy Gallardo</Heading3>
                        <div>
                            <Subhead1>Ingeniero Civil</Subhead1>
                            <Subhead1>Graña & Montero</Subhead1>
                            <Subhead1 color={FONTS.error}>Experiencia Laboral</Subhead1>
                            <Subhead1 color={FONTS.error}>(Pendiente)</Subhead1>
                        </div>
                        <Body1 weight={LIGHT_TEXT}>U345678@grupouto.edu.pe</Body1>
                        <Body1 weight={LIGHT_TEXT}>(51-1) 987 789 678</Body1>
                    </BasicInformation>
                </div>
                <Separator/>
                <Header>
                    <Subhead1>Descripción</Subhead1>
                    <Subhead1 color={FONTS.error}>(Pendiente)</Subhead1>
                </Header>
                <div style={{background: colors.MISC_COLORS.background_grey_1, padding: "22px 16px"}}>
                    <Subhead1 weight={LIGHT_TEXT}>“Tengo 10 años de experiencia. Me encanta enseñar, sé que lograremos pasar ese curso juntos. Nos vemos en la sesión”</Subhead1>
                </div>
                <Separator/>
                <Header>
                    <Subhead1>Experiencia laboral</Subhead1>
                </Header>
                <ExperienceItem>
                    <Subhead1>Global Director of UX and Strategy</Subhead1>
                    <Body1 weight={LIGHT_TEXT}>Fantasy Interactive Learning</Body1>
                    <Body1 weight={LIGHT_TEXT} color={FONTS.blue_grey}>Octubre 2018 - Hasta la actualidad</Body1>
                </ExperienceItem>
                <ExperienceItem>
                    <Subhead1>Global Director of UX and Strategy</Subhead1>
                    <Body1 weight={LIGHT_TEXT}>Fantasy Interactive Learning</Body1>
                    <Body1 weight={LIGHT_TEXT} color={FONTS.blue_grey}>Octubre 2018 - Hasta la actualidad</Body1>
                </ExperienceItem>
            </div>
        )
    }
}

export default FormReview;
