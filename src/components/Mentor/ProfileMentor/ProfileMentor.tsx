import * as React from 'react';
import styled from "styled-components";
import defaultCamera from '../../../assets/images/camera.png';
import errorCamera from '../../../assets/images/error_camera.png';
import {ButtonNormal} from "../../../common/Buttons/Buttons";
import {errorLocatedNotification} from "../../../common/Layout/Layout";
import LayoutContext from "../../../common/Layout/Layout.context";
import LoaderFullScreen from "../../../common/Loader/LoaderFullsScreen";
import colors, {FONTS} from "../../../common/MentorColor";
import {Body1, Heading2, LIGHT_TEXT, Subhead1} from '../../../common/MentorText';
import ImageProfile from '../../../components/Admin/MentorFormBase/components/ImageProfile/ImageProfile';
import {ExperienceItem, FormReviewHeader, Separator} from "../../../components/Admin/MentorFormBase/MentorFormBase.styled";
import {MENTOR_STATUS} from "../../../domain/Mentor/MentorBase";
import MentorProfileData, {IMentorProfileData, IMentorProfileFormValidations} from "../../../domain/Mentor/MentorProfile";
import MentorService from "../../../services/Mentor/Mentor.service";
import {getDateExperience} from "../../Admin/MentorFormBase/MentorFormBase.utils";
import MentorRating from "../components/MentorRating/MentorRating";

const COLUMN =  'column';

const BasicData = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: ${(props: {type?: string}) => {
        return props.type === COLUMN ? 'column' : 'row';
    }};
    margin: 0 56px;
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
                            <Subhead1 color={!mentor.currentPosition ? FONTS.error : FONTS.dark} style={{margin: '3px 0'}}>
                                {!mentor.currentPosition ? 'Cargo Actual (Pendiente)' : mentor.currentPosition}
                            </Subhead1>
                            <Subhead1 color={!mentor.currentCompany ? FONTS.error : FONTS.dark} style={{margin: '3px 0'}}>
                                {!mentor.currentCompany ? 'Empresa Actual (Pendiente)' : mentor.currentCompany}
                            </Subhead1>
                            {mentor.rating && <MentorRating count={mentor.rating.count} average={mentor.rating.average}/>}
                        </React.Fragment>}
                </BasicData>
                <Separator />
                <FormReviewHeader>
                    <Wrapper>
                        <Subhead1>CMP</Subhead1>
                        {!this.state.loadingData && mentor.description.trim().length === 0 &&
                            <Subhead1 color={FONTS.error}>(Pendiente)</Subhead1>}
                    </Wrapper>
                </FormReviewHeader>
                {mentor.description.trim().length > 0 &&
                    <Wrapper>
                        <div style={{background: colors.MISC_COLORS.background_grey_1, padding: "22px 16px", width: '100%', borderRadius: 4}}>
                            <Subhead1 weight={LIGHT_TEXT} style={{overflowWrap: 'break-word'}}>“{mentor.description}”</Subhead1>
                        </div>
                    </Wrapper>}
                <Separator />
                <FormReviewHeader>
                    <Wrapper>
                        <Subhead1>Experiencia laboral</Subhead1>
                        {(!this.state.loadingData && !mentor.experiences.length) && <Subhead1 color={FONTS.error}>(Pendiente)</Subhead1>}
                    </Wrapper>
                </FormReviewHeader>
                {mentor.experiences.length > 0 &&
                    <Wrapper type={COLUMN}>
                        {mentor.experiences.map((item, index) => {
                            return (
                                <ExperienceItem key={`form_view_experiences_${index}`}>
                                    <Subhead1 color={FONTS.medium}>{item.position}</Subhead1>
                                    <Body1 weight={LIGHT_TEXT}>{item.company}</Body1>
                                    <Body1 weight={LIGHT_TEXT} color={FONTS.blue_grey}>{getDateExperience(item)}</Body1>
                                </ExperienceItem>)
                        })}
                    </Wrapper>}

                <Separator />
                <ButtonNormal text={"Editar información"} link={true} attrs={{
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
