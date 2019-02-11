import * as React from "react";
import styled from "styled-components";
import errorCamera from "../../../../../assets/images/error_camera.png"
import {date} from "../../../../../common/DateUtilities";
import colors, {FONTS} from "../../../../../common/MentorColor";
import {Body1, Heading3, LIGHT_TEXT, Subhead1} from "../../../../../common/MentorText";
import {IMentorFormExperience} from "../../../../../domain/Mentor/MentorCreate";
import MentorCreateContext, {IMentorCreateContext} from "../../MentorCreate.context";
import ImageProfile from '../ImageProfile/ImageProfile'

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
        this.getDateExperience = this.getDateExperience.bind(this);
        this.state = {
            submitText: "Continuar"
        }
    }

    public render() {
        return (
            <MentorCreateContext.Consumer>
                {(context: IMentorCreateContext) => {
                   return (
                       <div style={{padding: '20px 0'}}>
                           <Header>
                               <Subhead1>Datos personales</Subhead1>
                           </Header>
                           <div style={{alignItems: 'center', display: 'flex'}}>
                               <ImageProfile src={context.values.picture || errorCamera}
                                             width={150}
                                             height={150}
                                             title={"Falta foto de perfil"}
                                             filled={!!context.values.picture }/>
                               <BasicInformation>
                                   <Heading3>{context.values.firstName} {context.values.lastName}</Heading3>
                                   <div>
                                       <Subhead1>{context.values.currentPosition}</Subhead1>
                                       <Subhead1>{context.values.currentCompany}</Subhead1>
                                       <Subhead1 color={FONTS.error}>Experiencia Laboral</Subhead1>
                                       <Subhead1 color={FONTS.error}>(Pendiente)</Subhead1>
                                   </div>
                                   <Body1 weight={LIGHT_TEXT}>{context.values.email}</Body1>
                                   <Body1 weight={LIGHT_TEXT}>{context.values.numberContact}</Body1>
                               </BasicInformation>
                           </div>
                           <Separator/>
                           <Header>
                               <Subhead1>Descripción</Subhead1>
                               {!!context.errors.description && <Subhead1 color={FONTS.error}>(Pendiente)</Subhead1>}
                           </Header>
                           <div style={{background: colors.MISC_COLORS.background_grey_1, padding: "22px 16px"}}>
                               <Subhead1 weight={LIGHT_TEXT}>“{context.values.description}”</Subhead1>
                           </div>
                           <Separator/>
                           <Header>
                               <Subhead1>Experiencia laboral</Subhead1>
                               {(!context.values.experiences.length || !!context.errors.experiences) && <Subhead1 color={FONTS.error}>(Pendiente)</Subhead1>}
                           </Header>
                           {context.values.experiences.map((value, index) => {
                               return (
                                   <ExperienceItem key={`form_view_experiences_${index}`}>
                                       <Subhead1>{value.position}</Subhead1>
                                       <Body1 weight={LIGHT_TEXT}>{value.company}</Body1>
                                       <Body1 weight={LIGHT_TEXT} color={FONTS.blue_grey}>{this.getDateExperience(value)}</Body1>
                                   </ExperienceItem>
                               )
                           })}
                       </div>
                   )
                }}
            </MentorCreateContext.Consumer>
        )
    }

    private getDateExperience(value: IMentorFormExperience) {
        const fromMonth = value.fromMonth || "";
        const toMonth = value.toMonth || "";
        const from = `${this.getMonth(fromMonth)} ${value.fromYear}`;
        let to = "Hasta la actualidad";
        if (!value.currentJob) {
            to = `${this.getMonth(toMonth)} ${value.toYear}`;
        }
        return `${from} - ${to}`;
    }

    private getMonth(indexMonth: string) {
        const month = date.findMonthFromIndex(indexMonth);
        return month ? month.label : '';
    }
}

export default FormReview;
