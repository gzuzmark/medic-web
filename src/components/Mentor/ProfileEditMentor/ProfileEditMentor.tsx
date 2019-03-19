import {Formik} from "formik";
import * as React from 'react';
import styled from "styled-components";
import ContentModal from "../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../common/ConsoleModal/MentorModalBase";
import {errorLocatedNotification} from "../../../common/Layout/Layout";
import LayoutContext from "../../../common/Layout/Layout.context";
import LoaderFullScreen from "../../../common/Loader/LoaderFullsScreen";
import {MENTOR_STATUS} from "../../../domain/Mentor/MentorBase";
import {IMentorFormValidations} from "../../../domain/Mentor/MentorBaseForm";
import MentorEditProfileData, {IMentorEditProfileData} from "../../../domain/Mentor/MentorEditProfile";
import {IMentorProfileData, IMentorProfileFormValidations} from "../../../domain/Mentor/MentorProfile";
import MentorService from "../../../services/Mentor/Mentor.service";
import MentorFormBaseContext from "../../Admin/MentorFormBase/MentorFormBase.context";
import mentorFormBaseSchema from "../../Admin/MentorFormBase/MentorFormBase.validations";
import FormEditManager from "./components/FormEditManager/FormEditManager";

const MentorEditContainer = styled.div`
    margin: 0 auto;
    position: relative;
    width: 930px;
`;

interface IStateProfileEditMentorCore  {
    loadingData: boolean;
    mentor: IMentorProfileFormValidations;
    modalSuccess: boolean;
    saving: boolean;
    selectedImage: string;
}

interface IPropsProfileEditMentorCore {
    setStatus(notification: string): void;
}

class ProfileEditMentorCore extends React.Component<IPropsProfileEditMentorCore, IStateProfileEditMentorCore> {
    public state: IStateProfileEditMentorCore;
    private mentorProfileData: MentorEditProfileData;
    private mentorService: MentorService;
    constructor(props: any) {
        super(props);
        this.mentorProfileData = new MentorEditProfileData({} as IMentorEditProfileData);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.updateMentor = this.updateMentor.bind(this);
        this.mentorService =  new MentorService();
        this.state = {
            loadingData: true,
            mentor: {...this.mentorProfileData.getMentorValues},
            modalSuccess: false,
            saving: false,
            selectedImage: ''
        };
    }

    public componentDidMount() {
        this.mentorService.getProfile().then((mentor) => {
            this.mentorProfileData = new MentorEditProfileData(mentor);
            this.setState({
                loadingData: false,
                mentor: this.mentorProfileData.getMentorProfileValues,
                selectedImage: mentor.photo
            });
        })
    }

    public render() {
        const selectedImage = this.state.selectedImage;
        return (
            <div className="u-LayoutMargin">
                {this.state.saving && <LoaderFullScreen modal={true} text={"Cargando..."}/>}
                <MentorModalBase show={this.state.modalSuccess} onCloseModal={this.closeConfirmModal} hideClose={true}>
                    <ContentModal.Success description={"Cambios guardados con éxito"} />
                </MentorModalBase>
                <MentorEditContainer>
                    {this.state.loadingData && <LoaderFullScreen />}
                    <Formik
                        initialValues={this.state.mentor}
                        enableReinitialize={true}
                        validationSchema={mentorFormBaseSchema}
                        isInitialValid={false}
                        onSubmit={this.onSubmit}>
                        {({ errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, setFieldTouched, validateForm, setValues, setTouched}) => {
                            return (
                                <MentorFormBaseContext.Provider
                                    value={{
                                        errors,
                                        handleBlur,
                                        handleChange,
                                        listSites: [],
                                        listSkills: [] ,
                                        selectedImage,
                                        setFieldTouched,
                                        setFieldValue,
                                        setTouched,
                                        setValues,
                                        touched,
                                        updateImage: this.updateImage,
                                        values: values as IMentorFormValidations
                                    }}>
                                    <form onSubmit={handleSubmit}>
                                        <FormEditManager
                                            formData={{errors, touched, values}}
                                            rating={this.state.mentor.rating}
                                            onHandleSubmit={this.onSubmit}
                                            validateForm={validateForm}/>
                                    </form>
                                </MentorFormBaseContext.Provider>
                            )
                        }}
                    </Formik>
                </MentorEditContainer>
            </div>
        )
    }

    private updateMentor() {
        this.setState({saving: true, modalSuccess: false});
        this.mentorService.updateProfile(this.mentorProfileData.mentorUpdateParams).then((mentor: IMentorProfileData) => {
            this.setState({saving: false, modalSuccess: true});
            if (mentor.status) {
                this.props.setStatus(mentor.status);
            }
            setTimeout( () => {
                this.setState({modalSuccess: false});
            }, 2000)
        }).catch(() => {
            this.setState({saving: false, modalSuccess: false});
        });
    }


    private closeConfirmModal() {
        this.setState({modalSuccess: false});
    }

    private onSubmit(values: IMentorFormValidations) {
        this.mentorProfileData.prepareData(values);
        this.updateMentor();
    }

    private updateImage(selectedImage: string) {
        this.setState({selectedImage});
    }
}

const ProfileEditMentor: React.FC<any> = () => {
    const context = React.useContext(LayoutContext);
    if (context.status === MENTOR_STATUS.INCOMPLETE) {
        context.setNotification(errorLocatedNotification);
    }
    return (
        <ProfileEditMentorCore setStatus={context.setStatus} />
    )
}

export default ProfileEditMentor;
