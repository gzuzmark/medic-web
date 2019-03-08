import {Formik} from "formik";
import * as React from 'react';
import styled from "styled-components";
import ContentModal from "../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../common/ConsoleModal/MentorModalBase";
import LoaderFullScreen from "../../../common/Loader/LoaderFullsScreen";
import {IMentorFormValidations} from "../../../domain/Mentor/MentorBaseForm";
import MentorEditProfileData, {IMentorEditProfileData} from "../../../domain/Mentor/MentorEditProfile";
import { IMentorProfileFormValidations } from "../../../domain/Mentor/MentorProfile";
import MentorService from "../../../services/Mentor/Mentor.service";
import MentorFormBaseContext from "../../Admin/MentorFormBase/MentorFormBase.context";
import mentorFormBaseSchema from "../../Admin/MentorFormBase/MentorFormBase.validations";
import FormEditManager from "./components/FormEditManager/FormEditManager";

const MentorEditContainer = styled.div`
    margin: 0 auto;
    position: relative;
    width: 930px;
`;

interface IStateProfileEditMentor  {
    loadingData: boolean;
    mentor: IMentorProfileFormValidations;
    modalSuccess: boolean;
    saving: boolean;
    selectedImage: string;
}


class ProfileEditMentor extends React.Component<{}, IStateProfileEditMentor> {
    public state: IStateProfileEditMentor;
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
                        {({ errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, setFieldTouched, validateForm}) => {
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
                                        touched,
                                        updateImage: this.updateImage,
                                        values
                                    }}>
                                    <form onSubmit={handleSubmit}>
                                        <FormEditManager
                                            formData={{errors, touched, values}}
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
        this.mentorService.updateProfile(this.mentorProfileData.mentorUpdateParams).then(() => {
            this.setState({saving: false, modalSuccess: true});
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

export default ProfileEditMentor;
