import * as React from 'react';
import FormColumn from 'src/common/FormRow/components/FormColumn/FormColumn';
import FormRow from 'src/common/FormRow/FormRow';
import SkillService from 'src/services/Skill/Skill.service';
import styled from "styled-components";
import defaultCamera from '../../../assets/images/camera.png';
import errorCamera from '../../../assets/images/error_camera.png';
import {ButtonNormal} from "../../../common/Buttons/Buttons";
import {errorLocatedNotification} from "../../../common/Layout/Layout";
import LayoutContext from "../../../common/Layout/Layout.context";
import LoaderFullScreen from "../../../common/Loader/LoaderFullsScreen";
import colors, {FONTS} from "../../../common/MentorColor";
import {Body1, Heading2, Heading3, LIGHT_TEXT,} from '../../../common/MentorText';
import ImageProfile from '../../../components/Admin/MentorFormBase/components/ImageProfile/ImageProfile';
import {ExperienceItem, FormReviewHeader} from "../../../components/Admin/MentorFormBase/MentorFormBase.styled";
import {MENTOR_STATUS} from "../../../domain/Mentor/MentorBase";
import MentorProfileData, {IMentorProfileData, IMentorProfileFormValidations} from "../../../domain/Mentor/MentorProfile";
import MentorService from "../../../services/Mentor/Mentor.service";
import MentorRating from "../components/MentorRating/MentorRating";
import { ISubSkill } from "../../../domain/Skill/Skill";
import * as _ from 'lodash';

// const COLUMN =  'column';

const BasicData = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

/*const Wrapper = styled.div`
    display: flex;
    flex-direction: ${(props: {type?: string}) => {
        return props.type === COLUMN ? 'column' : 'row';
    }};
    margin: 0 56px;
`;*/
const TemplateContainer = styled.div`
   border: 1px solid ${colors.MISC_COLORS.background_grey_2};
   border-radius: 4px;
   margin-top: 30px; 
   display: flex;
   width: 100%;
   padding: 30px 85px;
   flex-direction: column;
`;
const FormProfileContainer = styled.div`
    margin: 0 auto;
    width: 930px;
`;


export interface IStateProfileMentorCore {
    loadingData: boolean;
    mentor: IMentorProfileFormValidations;
    specialtyName: string | null;
    selectedImage: string;
    diagnostics: ISubSkill[];
}

export interface IPropsProfileMentorCore {
    updateProfile(user: IMentorProfileData): void;
}

class ProfileMentorCore extends React.Component<IPropsProfileMentorCore, IStateProfileMentorCore> {
    public state: IStateProfileMentorCore;
    private mentorEditData: MentorProfileData;
    private mentorService: MentorService;
    private skillService: SkillService;

    constructor(props: any) {
        super(props);
        this.mentorEditData = new MentorProfileData({} as IMentorProfileData);
        this.mentorService =  new MentorService();
        this.skillService = new SkillService();
        this.loadSkill = this.loadSkill.bind(this);
        this.loadDiagnostics = this.loadDiagnostics.bind(this);

        this.state = {
            loadingData: true,
            mentor: {...this.mentorEditData.getMentorProfileValues},
            specialtyName: null,
            selectedImage: '',
            diagnostics: [],
        }
    }

    public componentDidMount() {
        this.mentorService.getProfile().then((mentor) => {
            this.mentorEditData = new MentorProfileData(mentor);
            this.props.updateProfile(mentor);
            if (mentor.skillsId && mentor.skillsId.length > 0) {
                const skillId = mentor.skillsId[0];
                this.loadSkill(skillId);
                this.loadDiagnostics(skillId, mentor.diagnostics || []);
            }
            this.setState({
                loadingData: false,
                mentor: this.mentorEditData.getMentorProfileValues,
                selectedImage: mentor.photo
            });
        });
    }

    public render() {
        const {selectedImage, mentor} = this.state;
        const camera = this.state.loadingData ? defaultCamera : errorCamera;
        return (
            <FormProfileContainer className="u-LayoutMargin" style={{position: 'relative'}}>
                {this.state.loadingData &&
                    <LoaderFullScreen text={"Cargando..."} styleLoaderContainer={{marginTop: 100}} />}
                <BasicData>
                    <ImageProfile src={selectedImage || camera}
                                  width={88} height={88}
                                  title={!!selectedImage ? "Foto de perfil" : "Falta foto de perfil"}
                                  filled={!!selectedImage || this.state.loadingData}/>
                    {!this.state.loadingData &&
                        <React.Fragment>
                            <Heading2 color={FONTS.green} style={{margin: '40px 0 10px 0'}}>{`${mentor.firstName} ${mentor.lastName}`}</Heading2>
                            {/*<Subhead1 color={!mentor.currentPosition ? FONTS.error : FONTS.dark} style={{margin: '3px 0'}}>
                                {!mentor.currentPosition ? 'Cargo Actual (Pendiente)' : mentor.currentPosition}
                            </Subhead1>
                            <Subhead1 color={!mentor.currentCompany ? FONTS.error : FONTS.dark} style={{margin: '3px 0'}}>
                                {!mentor.currentCompany ? 'Empresa Actual (Pendiente)' : mentor.currentCompany}
                            </Subhead1>*/}
                            {mentor.rating && <MentorRating count={mentor.rating.count} average={mentor.rating.average}/>}
                        </React.Fragment>}
                </BasicData>
                <FormReviewHeader>
                    <TemplateContainer>
                        <Heading3 color={FONTS.green}>DATOS PERSONALES</Heading3>
                            <FormRow style={{ padding: '14px 0 0 0', margin: 0 }} columns={[
                                <FormColumn width={2} key={`FormColumn-1`}>
                                    <Body1>Celular: {mentor.contactNumber}</Body1>
                                    <Body1>Correo: {mentor.email}</Body1>
                                </FormColumn>,
                                <FormColumn width={2} key={`FormColumn-2`}>
                                    DNI: {mentor.document}
                                </FormColumn>
                                ]}/> 
                    </TemplateContainer>
                </FormReviewHeader>
                <FormReviewHeader>
                    <TemplateContainer>
                        <Heading3 color={FONTS.green}>DATOS DE OCUPACIÓN</Heading3>
                            <FormRow style={{ padding: '14px 0 0 0', margin: 0 }} columns={[
                                <FormColumn width={2} key={`FormColumn-3`}>
                                    {!!this.state.specialtyName ?         
                                    <Body1>{this.state.specialtyName}</Body1>
                                    : <Body1>Especialidad: <span style={{color:'#2C7BFD'}}>Sin Asignar</span></Body1>
                                    }
                                </FormColumn>,
                                <FormColumn width={2} key={`FormColumn-4`}>
                                    <Body1>CMP: {mentor.medicCollegeNumber}</Body1>
                                </FormColumn>,
                                <FormColumn width={2} key={`FormColumn-5`}>
                                    {!!mentor.skill.label ?         
                                    <Body1>RNE: {mentor.rne}</Body1>
                                    :<Body1>RNE: <span style={{color:'#2C7BFD'}}>Sin Asignar</span></Body1>
                                    }
                            </FormColumn>
                                ]}/> 
                            <FormRow style={{ padding: '14px 0 0 0', margin: 0 }} columns={[
                                <FormColumn width={2} key={`FormColumn-6`}>
                                    <Body1>{mentor.city}</Body1>
                                </FormColumn>
                                ]}/>
                    </TemplateContainer>
                </FormReviewHeader>
                <FormReviewHeader>
                    <TemplateContainer>
                        <Heading3 color={FONTS.green}>DIAGNOSTICOS QUE TRATO</Heading3>
                        {this.state.diagnostics.length>0 ?
                            <div style={{ padding: '14px 0 0 0', margin: 0 }} >
                                {this.state.diagnostics.map((value, index)=>(
                                    <div  key={`FormColumn-${index}`}>
                                        {value.name}
                                    </div>
                                ))}
                            </div>
                            : <div style={{color:'#2C7BFD'}}>Sin Asignar</div>
                        }
                    </TemplateContainer>
                </FormReviewHeader>
                {!!mentor.patientAgeTo || !!mentor.patientAgeFrom && 
                    <FormReviewHeader>
                    <TemplateContainer>
                        <Heading3 color={FONTS.green}>EDAD DE ATENCIÓN DE LOS PACIENTES</Heading3>
                            <FormRow style={{ padding: '14px 0 0 0', margin: 0 }} columns={[
                                <FormColumn width={2} key={`FormColumn-5`}>
                                   Pacientes a partir de {mentor.patientAgeFrom} 
                                   {!!mentor.patientAgeTo ? ` hasta {mentor.patientAgeTo}` : ''}
                                </FormColumn>
                                ]}/> 
                    </TemplateContainer>
                </FormReviewHeader>
                }
                <FormReviewHeader>
                    <TemplateContainer>
                        <Heading3 color={FONTS.green}>SOBRE MI</Heading3>
                        {!!mentor.about_me &&    
                        <FormRow style={{ padding: '14px 0 0 0', margin: 0 }} columns={[
                                <FormColumn width={1} key={`FormColumn-1`}>
                                    <Body1>{mentor.about_me}</Body1>
                                </FormColumn>
                                ]}/>                 
                                }
                    </TemplateContainer>
                </FormReviewHeader>
                {<FormReviewHeader>
                    <TemplateContainer>
                        <Heading3 color={FONTS.green}>EXPERIENCIA</Heading3>
                        {(!this.state.loadingData && !mentor.experiences.length) && 
                        <span color={FONTS.error}>(Pendiente)</span>}
                        {mentor.experiences.length > 0 && 
                            (mentor.experiences.map((item, index) => {
                                const yearStart = !!item.fromYear ? item.fromYear.substring(0,4) : '';
                                const yearEnd = !!item.toYear ? item.toYear.substring(0,4): '';
                                return (
                                    <ExperienceItem key={`form_view_experiences_${index}`}>
                                        <span style={{color:'#2C7BFD', fontSize:'14px'}}>{item.type}</span>
                                        <Heading3>{item.position}</Heading3>
                                        <Heading3 >{item.company}</Heading3>
                                        <div style={{display:'flex',flexDirection:'row'}}>
                                                <Body1 weight={LIGHT_TEXT}>{yearStart} </Body1> {" - "}
                                                <Body1 weight={LIGHT_TEXT}> {yearEnd}</Body1>{" "}
                                                <Body1 weight={LIGHT_TEXT} style={{marginLeft:'5px'}}>{item.location} </Body1>
                                                </div>
                                    </ExperienceItem>)    
                            }))
                        }
                    </TemplateContainer>
                 </FormReviewHeader>
                }
                <FormReviewHeader>
                    <TemplateContainer>
                        <Heading3 color={FONTS.green} style={{paddingBottom:'16px'}}>FORMACIÓN</Heading3>
                        {(!mentor.education.length) && <span color={FONTS.error}>(Pendiente)</span>}
                        {mentor.education.length > 0 &&     
                            (mentor.education.map((item, index) => {
                                    return (
                                        <ExperienceItem key={`form_view_experiences_${index}`}>
                                            <span style={{color:'#2C7BFD', fontSize:'14px'}}>{item.educationType}</span>
                                            <Heading3>{item.degree}</Heading3>
                                            <Heading3 >{item.school}</Heading3>
                                            <Body1 weight={LIGHT_TEXT}>{item.year} </Body1> 
                                            <Body1 weight={LIGHT_TEXT} style={{marginLeft:'8px'}}>{item.city}</Body1>
                                        </ExperienceItem>)
                                }
                            ))}
                    </TemplateContainer>
                </FormReviewHeader>
                {!!mentor.awards &&
                    <FormReviewHeader>
                    <TemplateContainer>
                        <Heading3 color={FONTS.green}>DESTACADOS</Heading3>
                        {mentor.awards.length>0 ?
                            <div style={{ padding: '14px 0 0 0', margin: 0 }} >
                                {mentor.awards.map((value,index)=>(
                                    <div  key={`FormColumn-${index}`}>
                                        {value.description}
                                    </div>
                                ))}
                            </div> 
                            : <div style={{color:'#2C7BFD'}}>Sin Asignar</div>
                        }
                    </TemplateContainer>
                </FormReviewHeader>
                }
                <ButtonNormal text={"Editar"} link={true} attrs={{
                    href: '/doctor/editar-perfil',
                    style: {margin: '0 0 0 auto', width: 150}
                }} />
            </FormProfileContainer>
        )
    }

    private loadSkill(skillId: string) {
        this.skillService.listByMentor().then((skills) => {
            if (_.isArray(skills)) {
                if (skills.length > 0) {
                    const skill = skills[0].name;
                    this.setState({
                        ...this.state,
                        specialtyName: skill,
                    });
                }
            }
        });
    }

    private loadDiagnostics(skillId: string, diagnosticsIds: string[]) {
        this.skillService.listDiagnosticsBySkillInMentor(skillId).then((allDiagnostics) => {
            const list = allDiagnostics.filter((item) => {
                if (!_.isArray(diagnosticsIds)) {
                    return false;
                }
                return diagnosticsIds.includes(item.id);
            });
            console.log(diagnosticsIds, list);
            this.setState({
                ...this.state,
                diagnostics: list
            });
        });
    }
}

const ProfileMentor: React.FC<any> = () => {
    const context = React.useContext(LayoutContext);
    if (context.user.status === MENTOR_STATUS.INCOMPLETE) {
        context.setNotification(errorLocatedNotification);
    }

    const updateProfile = (mentor: IMentorProfileData) => {
        if (mentor.status) {
            context.setUser({...context.user, status: mentor.status, photo: mentor.photo })
        }
    };

    return (
        <ProfileMentorCore updateProfile={updateProfile} />
    )
};


export default ProfileMentor;
