import * as React from 'react';
import FormColumn from 'src/common/FormRow/components/FormColumn/FormColumn';
import FormRow from 'src/common/FormRow/FormRow';
import styled from "styled-components";
import defaultCamera from '../../../assets/images/camera.png';
import errorCamera from '../../../assets/images/error_camera.png';
import {ButtonNormal} from "../../../common/Buttons/Buttons";
import {errorLocatedNotification} from "../../../common/Layout/Layout";
import LayoutContext from "../../../common/Layout/Layout.context";
import LoaderFullScreen from "../../../common/Loader/LoaderFullsScreen";
import colors, {FONTS} from "../../../common/MentorColor";
import {Body1, Heading2, Heading3, LIGHT_TEXT, Subhead1} from '../../../common/MentorText';
import ImageProfile from '../../../components/Admin/MentorFormBase/components/ImageProfile/ImageProfile';
import {ExperienceItem, FormReviewHeader} from "../../../components/Admin/MentorFormBase/MentorFormBase.styled";
import {MENTOR_STATUS} from "../../../domain/Mentor/MentorBase";
import MentorProfileData, {IMentorProfileData, IMentorProfileFormValidations} from "../../../domain/Mentor/MentorProfile";
import MentorService from "../../../services/Mentor/Mentor.service";
import {getDateExperience} from "../../Admin/MentorFormBase/MentorFormBase.utils";
import MentorRating from "../components/MentorRating/MentorRating";

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
    selectedImage: string;
}

export interface IPropsProfileMentorCore {
    updateProfile(user: IMentorProfileData): void;
}

class ProfileMentorCore extends React.Component<IPropsProfileMentorCore, IStateProfileMentorCore> {
    public state: IStateProfileMentorCore;
    private mentorEditData: MentorProfileData;
    private mentorService: MentorService;
    constructor(props: any) {
        super(props);
        this.mentorEditData = new MentorProfileData({} as IMentorProfileData);
        this.mentorService =  new MentorService();
        this.state = {
            loadingData: true,
            mentor: {...this.mentorEditData.getMentorProfileValues},
            selectedImage: ''
        }
    }

    public componentDidMount() {
        this.mentorService.getProfile().then((mentor) => {
            this.mentorEditData = new MentorProfileData(mentor);
            this.props.updateProfile(mentor);
            this.setState({
                loadingData: false,
                mentor: this.mentorEditData.getMentorProfileValues,
                selectedImage: mentor.photo
            });
        })
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
                                    <Body1>Celular: {mentor.contactNumber}</Body1>
                                    <Body1>Correo: {mentor.email}</Body1>
                                </FormColumn>,
                                <FormColumn width={2} key={`FormColumn-4`}>
                                    DNI: {mentor.document}
                                </FormColumn>
                                ]}/> 
                    </TemplateContainer>
                </FormReviewHeader>
                {
                    mentor.diagnostics.length>0 &&
                    <FormReviewHeader>
                    <TemplateContainer>
                        <Heading3 color={FONTS.green}>DIAGNOSTICOS QUE TRATO</Heading3>
                            <FormRow style={{ padding: '14px 0 0 0', margin: 0 }} columns={[
                                <FormColumn width={2} key={`FormColumn-2`}>
                                    {mentor.document}
                                </FormColumn>
                                ]}/> 
                    </TemplateContainer>
                </FormReviewHeader>
                }
                {
                    !!mentor.patientAgeTo || !!mentor.patientAgeFrom && 
                    <FormReviewHeader>
                    <TemplateContainer>
                        <Heading3 color={FONTS.green}>EDAD DE ATENCIÓN DE LOS PACIENTES</Heading3>
                            <FormRow style={{ padding: '14px 0 0 0', margin: 0 }} columns={[
                                <FormColumn width={2} key={`FormColumn-5`}>
                                   Pacientes 
                                </FormColumn>
                                ]}/> 
                    </TemplateContainer>
                </FormReviewHeader>
                }
                {!!mentor.about_me && 
                    <FormReviewHeader>
                    <TemplateContainer>
                        <Heading3 color={FONTS.green}>SOBRE MI</Heading3>
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
                }
                
                {mentor.experiences.length > 0 && 
                <><FormReviewHeader>
                    <TemplateContainer>
                        <Heading3 color={FONTS.green}>EXPERIENCIA</Heading3>
                        {(!this.state.loadingData && !mentor.experiences.length) && <Subhead1 color={FONTS.error}>(Pendiente)</Subhead1>}
                        {mentor.experiences.map((item, index) => {
                            return (
                                <ExperienceItem key={`form_view_experiences_${index}`}>
                                    <Subhead1 color={FONTS.medium}>{item.position}</Subhead1>
                                    <Body1 weight={LIGHT_TEXT}>{item.company}</Body1>
                                    <Body1 weight={LIGHT_TEXT} color={FONTS.blue_grey}>{getDateExperience(item)}</Body1>
                                </ExperienceItem>)
                        })}
                    </TemplateContainer>
                 </FormReviewHeader>
                    </>}

                <ButtonNormal text={"Editar"} link={true} attrs={{
                    href: '/doctor/editar-perfil',
                    style: {margin: '0 0 0 auto', width: 150}
                }} />
            </FormProfileContainer>
        )
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
