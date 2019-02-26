import * as React from "react";
import styled from "styled-components";
import errorCamera from "../../../../../assets/images/error_camera.png"
import colors, {FONTS} from "../../../../../common/MentorColor";
import {Body1, Heading3, LIGHT_TEXT, Subhead1} from "../../../../../common/MentorText";
import {date} from "../../../../../common/Utils/DateUtilities";
import {IMentorFormExperience} from "../../../../../domain/Mentor/MentorBaseForm";
import ImageProfile from '../../../MentorFormBase/components/ImageProfile/ImageProfile'
import MentorFormBaseContext, {IMentorFormBaseContext} from "../../../MentorFormBase/MentorFormBase.context";

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
            <MentorFormBaseContext.Consumer>
                {(context: IMentorFormBaseContext) => {
                   return (
                       <div style={{padding: '20px 0'}}>
                           <Header>
                               <Subhead1>Datos personales</Subhead1>
                           </Header>
                           <div style={{alignItems: 'center', display: 'flex'}}>
                               <ImageProfile src={context.selectedImage || errorCamera}
                                             width={150} height={150}
                                             title={!!context.selectedImage ? "Foto de perfil" : "Falta foto de perfil"}
                                             filled={!!context.selectedImage }/>
                               <BasicInformation>
                                   <Heading3 className={"FormReview_name"}>{context.values.firstName} {context.values.lastName}</Heading3>
                                   <div>
                                       <Subhead1 color={FONTS.medium}>{context.values.currentPosition}</Subhead1>
                                       <Subhead1 color={FONTS.medium}>{context.values.currentCompany}</Subhead1>
                                       {(context.values.currentPosition.trim().length === 0 || context.values.currentCompany.trim().length === 0) &&
                                        <React.Fragment>
                                            <Subhead1 color={FONTS.error}>Experiencia Laboral</Subhead1>
                                            <Subhead1 color={FONTS.error}>(Pendiente)</Subhead1>
                                        </React.Fragment>}
                                   </div>
                                   <Body1 weight={LIGHT_TEXT}>{context.values.email}</Body1>
                                   <Body1 weight={LIGHT_TEXT}>{context.values.contactNumber}</Body1>
                               </BasicInformation>
                           </div>
                           <Separator/>
                           <Header>
                               <Subhead1>Descripción</Subhead1>
                               {context.values.description.trim().length === 0 &&
                               <Subhead1 color={FONTS.error}>(Pendiente)</Subhead1>}
                           </Header>
                           {context.values.description.trim().length > 0 &&
                           <div style={{background: colors.MISC_COLORS.background_grey_1, padding: "22px 16px"}}>
                               <Subhead1 weight={LIGHT_TEXT} style={{overflowWrap: 'break-word'}}>“{context.values.description}”</Subhead1>
                           </div>}
                           <Separator/>
                           <Header>
                               <Subhead1>Experiencia laboral</Subhead1>
                               {(!context.values.experiences.length || !!context.errors.experiences) && <Subhead1 color={FONTS.error}>(Pendiente)</Subhead1>}
                           </Header>
                           {context.values.experiences.map((value: IMentorFormExperience, index: number) => (
                               value.position && value.company && !!this.getDateExperience(value) &&
                               <ExperienceItem key={`form_view_experiences_${index}`}>
                                   <Subhead1 color={FONTS.medium}>{value.position}</Subhead1>
                                   <Body1 weight={LIGHT_TEXT}>{value.company}</Body1>
                                   <Body1 weight={LIGHT_TEXT} color={FONTS.blue_grey}>{this.getDateExperience(value)}</Body1>
                               </ExperienceItem>))}
                       </div>
                   )
                }}
            </MentorFormBaseContext.Consumer>
        )
    }

    private getDateExperience(value: IMentorFormExperience) {
        const fromMonth = value.fromMonth || "";
        const toMonth = value.toMonth || "";
        const from = `${this.getMonth(fromMonth)} ${value.fromYear}`;
        let to = "Hasta la actualidad";
        let experienceDate = "";
        if (!value.currentJob) {
            to = `${this.getMonth(toMonth)} ${value.toYear}`;
        }
        if (!!from && !!to) {
            experienceDate = `${from} - ${to}`;
        }
        return experienceDate;
    }

    private getMonth(indexMonth: string) {
        const month = date.findMonthFromIndex(indexMonth);
        return month ? month.label : '';
    }
}

export default FormReview;
