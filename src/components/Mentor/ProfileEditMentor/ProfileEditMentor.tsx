import { Formik } from "formik";
import * as React from 'react';
import { IPropsMentorOptionsDropDown } from "src/common/MentorDropDown/MentorDropDown";
import { ISkill } from "src/domain/Skill/Skill";
import SkillService from "src/services/Skill/Skill.service";
import styled from "styled-components";
import ContentModal from "../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../common/ConsoleModal/MentorModalBase";
import { errorLocatedNotification } from "../../../common/Layout/Layout";
import LayoutContext from "../../../common/Layout/Layout.context";
import LoaderFullScreen from "../../../common/Loader/LoaderFullsScreen";
import { MENTOR_STATUS } from "../../../domain/Mentor/MentorBase";
import { IMentorFormValidations } from "../../../domain/Mentor/MentorBaseForm";
import MentorEditProfileData, { IMentorEditProfileData } from "../../../domain/Mentor/MentorEditProfile";
import { IMentorProfileData, IMentorProfileFormValidations } from "../../../domain/Mentor/MentorProfile";
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
    listSites: IPropsMentorOptionsDropDown[];
    listSkills: IPropsMentorOptionsDropDown[];
    listDiagnostics: IPropsMentorOptionsDropDown[];
}

interface IPropsProfileEditMentorCore {
    updateProfile(user: IMentorProfileData): void;
}

class ProfileEditMentorCore extends React.Component<IPropsProfileEditMentorCore, IStateProfileEditMentorCore> {
    public state: IStateProfileEditMentorCore;
    private mentorProfileData: MentorEditProfileData;
    private mentorService: MentorService;
    private skillService: SkillService;
    // private readonly idMentor: string;
    constructor(props: any) {
        super(props);
        this.mentorProfileData = new MentorEditProfileData({} as IMentorEditProfileData);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.updateMentor = this.updateMentor.bind(this);
        this.mentorService = new MentorService();
        this.skillService =  new SkillService();
        this.state = {
            loadingData: true,
            mentor: {...this.mentorProfileData.getMentorValues},
            modalSuccess: false,
            saving: false,
            selectedImage: '',
            listSites: [],
            listSkills: [],
            listDiagnostics: []
        };
    }

    public componentDidMount() {
        this.mentorService.getProfile().then((mentor) => {
            this.mentorProfileData = new MentorEditProfileData(mentor);
            if (!!mentor.sitesId) {
                this.updateListSkillsBySite(mentor.sitesId[0].toString());
            }
            if (!!mentor.skillsId && mentor.skillsId.length > 0) {
                this.updateListDiagnostics(mentor.skillsId[0]);
            }
            this.props.updateProfile(mentor);
            this.setState({
                loadingData: false,
                mentor: this.mentorProfileData.getMentorProfileValues,
                selectedImage: mentor.photo
            });
        })
    }

    public render() {
        const selectedImage = this.state.selectedImage;
        // const disablePersonalData = !!this.state.mentor;
        return (
            <div className="u-LayoutMargin">
                {this.state.saving && <LoaderFullScreen modal={true} text={"Cargando..."}/>}
                <MentorModalBase show={this.state.modalSuccess} onCloseModal={this.closeConfirmModal} hideClose={true}>
                    <ContentModal.Success description={"Cambios guardados con éxito"} />
                </MentorModalBase>
                <MentorEditContainer>
                    {this.state.loadingData &&
                        <LoaderFullScreen text={"Cargando..."} styleLoaderContainer={{marginTop: 100}} />}
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
                                        listSites: this.state.listSites,
                                        listSkills: this.state.listSkills,
                                        listDiagnostics: this.state.listDiagnostics,
                                        selectedImage,
                                        setFieldTouched,
                                        setFieldValue,
                                        setTouched,
                                        setValues,
                                        touched,
                                        updateImage: this.updateImage,
                                        updateListSkills: this.updateListSkills,
                                        updateListDiagnostics: this.updateListDiagnostics,
                                        values: values as IMentorFormValidations
                                    }}>
                                    <form onSubmit={handleSubmit}>
                                        <FormEditManager
                                            formData={{errors, touched, values}}
                                            rating={this.state.mentor.rating}
                                            onHandleSubmit={this.onSubmit}
                                            validateForm={validateForm}/>
                                        {/* <FormManager formData={{errors, touched, values}}
                                            mentor={{
                                                id: this.idMentor || '',
                                                status: this.state.mentor ? this.state.mentor.status : '',
                                                updateMentor: this.updateMentor
                                            }}
                                            onHandleSubmit={this.onSubmit}
                                            validateForm={validateForm}
                                            disablePersonalData={disablePersonalData}/> */}
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
        this.mentorService.updateProfile(this.mentorProfileData.mentor).then((mentor: IMentorProfileData) => {
            this.setState({saving: false, modalSuccess: true});
            this.props.updateProfile(mentor);
            setTimeout( () => {
                this.setState({modalSuccess: false});
            }, 2000)
        }).catch(() => {
            this.setState({saving: false, modalSuccess: false});
        });
    }

    private updateListSkills() {
        return new Promise<void>((resolve, reject) => {
            this.setState({listSkills: []}, () => {
                this.skillService.listByMentor().then((skills: ISkill[]) => {
                    const listSkills = skills.map((v) => ({value: v.id, label: v.name}));
                    this.setState({listSkills});
                    resolve()
                }).catch(() => {
                    reject()
                })
            })
        })
    }
    private updateListSkillsBySite(siteId: string) {
        return new Promise<void>((resolve, reject) => {
            this.setState({listSkills: []}, () => {
                this.skillService.listBySiteInMentor(siteId).then((skills: ISkill[]) => {
                    const listSkills = skills.map((v) => ({value: v.id, label: v.name}));
                    this.setState({listSkills});
                    resolve()
                }).catch(() => {
                    reject()
                })
            })
        })
    }

    private updateListDiagnostics(skillId: string) {
        return new Promise<void>((resolve, reject) => {
            this.skillService.listDiagnosticsBySkillInMentor(skillId).then((listEl: ISkill[]) => {
                const listDiagnostics = listEl.map((v) => ({value: v.id, label: v.name}));
                this.setState({...this.state, listDiagnostics });
                resolve()
            }).catch(() => {
                reject()
            })
        })
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
    if (context.user.status === MENTOR_STATUS.INCOMPLETE) {
        context.setNotification(errorLocatedNotification);
    }

    const updateProfile = (mentor: IMentorProfileData) => {
        if (mentor.status) {
            context.setUser({...context.user, status: mentor.status, photo: mentor.photo })
        }
    };

    return (
        <ProfileEditMentorCore updateProfile={updateProfile} />
    )
}

export default ProfileEditMentor;
