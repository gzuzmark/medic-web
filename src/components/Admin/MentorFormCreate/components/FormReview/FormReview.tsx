import * as React from "react";
import FormColumn from "src/common/FormRow/components/FormColumn/FormColumn";
import FormRow from "src/common/FormRow/FormRow";
import styled from "styled-components";
import errorCamera from "../../../../../assets/images/error_camera.png"
import colors, {FONTS} from "../../../../../common/MentorColor";
import {Body1, Heading3, LIGHT_TEXT, Subhead1} from "../../../../../common/MentorText";

import ImageProfile from '../../../MentorFormBase/components/ImageProfile/ImageProfile'
import MentorFormBaseContext, {IMentorFormBaseContext} from "../../../MentorFormBase/MentorFormBase.context";
import {ExperienceItem, FormReviewHeader} from "../../../MentorFormBase/MentorFormBase.styled";


const BasicData = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;
const TemplateContainer = styled.div`
   border: 1px solid ${colors.MISC_COLORS.background_grey_2};
   border-radius: 4px;
   margin-top: 30px; 
   display: flex;
   width: 100%;
   padding: 30px 85px;
   flex-direction: column;
`;

interface IStateFormReview {
submitText: string;
}

interface IPropsFormReview {
    currentStep?: number;
}

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
            <MentorFormBaseContext.Consumer>
                {(context: IMentorFormBaseContext) => {
                   return (
                       <div style={{padding: '20px 0'}}>
                           <BasicData>
                                <ImageProfile src={context.selectedImage || errorCamera}
                                            width={150} height={150}
                                            title={!!context.selectedImage ? "Foto de perfil" : "Falta foto de perfil"}
                                             filled={!!context.selectedImage }/>
                               {/* <React.Fragment>
                                    <Heading2 color={FONTS.green} style={{margin: '40px 0 10px 0'}}>{`${context.values.firstName} ${context.values.lastName}`}</Heading2>
                                </React.Fragment>*/}
                            </BasicData>
                            <FormReviewHeader>
                            <TemplateContainer>
                                <Heading3 color={FONTS.green}>DATOS PERSONALES</Heading3>
                                    <FormRow style={{ padding: '14px 0 0 0', margin: 0 }} columns={[
                                        <FormColumn width={2} key={`FormColumn-1`}>
                                            <Body1>Celular: {context.values.contactNumber}</Body1>
                                            <Body1>Correo: {context.values.email}</Body1>
                                        </FormColumn>,
                                        <FormColumn width={2} key={`FormColumn-2`}>
                                            DNI: {context.values.document}
                                        </FormColumn>
                                        ]}/> 
                            </TemplateContainer>
                        </FormReviewHeader>
                        <FormReviewHeader>
                            <TemplateContainer>
                                <Heading3 color={FONTS.green}>DATOS DE OCUPACIÓN</Heading3>
                                    <FormRow style={{ padding: '14px 0 0 0', margin: 0 }} columns={[
                                        <FormColumn width={2} key={`FormColumn-3`}>
                                            <Body1>{context.values.skill.label}</Body1>
                                        </FormColumn>,
                                        <FormColumn width={2} key={`FormColumn-4`}>
                                            CMP: {context.values.medicCollegeNumber}
                                        </FormColumn>,
                                        <FormColumn width={2} key={`FormColumn-5`}>
                                            RNE: {context.values.rne}
                                    </FormColumn>
                                        ]}/> 
                                    <FormRow style={{ padding: '14px 0 0 0', margin: 0 }} columns={[
                                        <FormColumn width={2} key={`FormColumn-6`}>
                                            <Body1>{context.values.city}</Body1>
                                        </FormColumn>
                                        ]}/>
                            </TemplateContainer>
                        </FormReviewHeader>
                        {!!context.values.about_me && 
                            <FormReviewHeader>
                            <TemplateContainer>
                                <Heading3 color={FONTS.green}>SOBRE MI</Heading3>
                                    <FormRow style={{ padding: '14px 0 0 0', margin: 0 }} columns={[
                                        <FormColumn width={1} key={`FormColumn-1`}>
                                            <Body1>{context.values.about_me}</Body1>
                                        </FormColumn>
                                        ]}/> 
                            </TemplateContainer>
                            </FormReviewHeader>
                        }
                        {context.values.experiences.length > 0 && 
                        <><FormReviewHeader>
                            <TemplateContainer>
                                <Heading3 color={FONTS.green} style={{paddingBottom:'16px'}}>EXPERIENCIA</Heading3>
                                {(!context.values.experiences.length) && <Subhead1 color={FONTS.error}>(Pendiente)</Subhead1>}
                                {context.values.experiences.map((item, index) => {
                                    return (
                                        <ExperienceItem key={`form_view_experiences_${index}`}>
                                            <span style={{color:'#2C7BFD', fontSize:'14px'}}>{item.type}</span>
                                            <Heading3>{item.position}</Heading3>
                                            <Heading3 >{item.company}</Heading3>
                                            <div style={{display:'flex',flexDirection:'row'}}>
                                            <Body1 weight={LIGHT_TEXT}>{item.fromYear} </Body1> {" - "}
                                            <Body1 weight={LIGHT_TEXT}> {item.toYear}</Body1>{" "}
                                            <Body1 weight={LIGHT_TEXT} style={{marginLeft:'8px'}}>{item.location} </Body1>
                                            </div>
                                        </ExperienceItem>)    
                                        })}
                                    </TemplateContainer>
                                </FormReviewHeader>
                            </>
                        }
                        {context.values.education.length > 0 && 
                    <>
                        <FormReviewHeader>
                            <TemplateContainer>
                                <Heading3 color={FONTS.green} style={{paddingBottom:'16px'}}>FORMACIÓN</Heading3>
                                {(!context.values.education.length) && <Subhead1 color={FONTS.error}>(Pendiente)</Subhead1>}
                                {context.values.education.map((item, index) => {
                                    return (
                                        <ExperienceItem key={`form_view_experiences_${index}`}>
                                            <span style={{color:'#2C7BFD', fontSize:'14px'}}>{item.educationType}</span>
                                            <Heading3>{item.degree}</Heading3>
                                            <Heading3 >{item.school}</Heading3>
                                            <div style={{display:'flex',flexDirection:'row'}}>
                                            <Body1 weight={LIGHT_TEXT}>{item.year} </Body1> 
                                            <Body1 weight={LIGHT_TEXT} style={{marginLeft:'8px'}}> {item.city}</Body1>
                                            </div>
                                        </ExperienceItem>)
                                })}
                            </TemplateContainer>
                        </FormReviewHeader>
                    </>
                }

                       </div>
                   )
                }}
            </MentorFormBaseContext.Consumer>
        )
    }
}

export default FormReview;
