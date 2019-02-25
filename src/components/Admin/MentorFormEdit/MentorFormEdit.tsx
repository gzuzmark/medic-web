import { Formik } from 'formik';
import * as React from "react";
import styled from "styled-components";
import ContentModal, {IGenericContentModal} from "../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../common/Icon/Icon";
import Loader from "../../../common/Loader/Loader";
import LoaderFullScreen from "../../../common/Loader/LoaderFullsScreen";
import {FONTS} from "../../../common/MentorColor";
import {IPropsMentorOptionsDropDown} from "../../../common/MentorDropDown/MentorDropDown";
import { Heading2 } from "../../../common/MentorText";
import {IMentorBaseForm, IMentorFormValidations} from "../../../domain/Mentor/MentorBaseForm";
import MentorEditData from "../../../domain/Mentor/MentorEdit";
import {ISites} from "../../../domain/Sites/Sites";
import {ISkill} from "../../../domain/Skill/Skill";
import {IMatchParam} from "../../../interfaces/MatchParam.interface";
import MentorService from "../../../services/Mentor/Mentor.service";
import SitesService from "../../../services/Sites/Sites.service";
import SkillService from "../../../services/Skill/Skill.service";
import MentorFormBaseContext from "../MentorFormBase/MentorFormBase.context";
import mentorFormBaseSchema from "../MentorFormBase/MentorFormBase.validations";
import FormManager from "./components/FormManager/FormManager";

interface IStateMentorEdit  {
    listSites: IPropsMentorOptionsDropDown[];
    listSkills: IPropsMentorOptionsDropDown[];
    selectedImage: string;
    mentor: IMentorFormValidations | null;
    loader: boolean;
    modal: boolean;
    saving: boolean;
    success: boolean;
}

export interface IPropsMentorEdit {
    match: IMatchParam;
}

const MentorEditContainer = styled.div`
    margin: 0 auto;
    width: 930px;
    ${Heading2} {
        text-align: center;
    }
`;

class MentorFormEdit  extends React.Component <IPropsMentorEdit, IStateMentorEdit > {
    public state: IStateMentorEdit ;
    private sitesService: SitesService;
    private idMentor: string;
    private mentorCreateData: MentorEditData;
    private skillService: SkillService;
    private mentorService: MentorService;
    private warningContent: IGenericContentModal;
    constructor(props: any) {
        super(props);
        this.updateListSkills = this.updateListSkills.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.updateMentor = this.updateMentor.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.mentorCreateData = new MentorEditData({} as IMentorBaseForm);
        this.sitesService = new SitesService();
        this.skillService =  new SkillService();
        this.mentorService =  new MentorService();
        this.state = {
            listSites: [] as IPropsMentorOptionsDropDown[],
            listSkills: [] as IPropsMentorOptionsDropDown[],
            loader: true,
            mentor: null,
            modal: false,
            saving: false,
            selectedImage: "",
            success: false
        };
        this.idMentor = this.props.match.params.id;
        this.warningContent = {
            button: "Aceptar",
            description: "Los cambios que realices se guardarán en el perfil del mentor.",
            image: <Icon name={'alert'} />,
            title: "¿Estás seguro que deseas guardar los cambios?"
        }
    }

    public componentDidMount() {
        this.mentorService.get(this.idMentor).then((mentor: IMentorBaseForm) => {
            const mentorEdit = {exist: false, ...mentor};
            this.mentorCreateData = new MentorEditData(mentorEdit);
            if (!!mentor.sitesId) {
                this.updateListSkills(mentor.sitesId[0].toString());
            }
            this.setState({
                mentor: this.mentorCreateData.getMentorValues,
                selectedImage: mentor.photo
            })
        }).catch(() => {
            // tslint:disable:no-console
            console.log("ERROR..!!")
        });
        this.sitesService.list().then((sites: ISites[]) => {
            const listSites = sites.map((v) => ({value: v.id, label: v.name}));
            this.setState({listSites, loader: false});
        }).catch(() => {
            this.setState({loader: true});
        })
    }


    public render() {
        const listSites = this.state.listSites;
        const listSkills = this.state.listSkills;
        const selectedImage = this.state.selectedImage;
        return (
            <div className="u-LayoutMargin">
                {this.state.saving && <LoaderFullScreen text={"Cargando..."}/>}
                <MentorModalBase show={this.state.modal} onCloseModal={this.closeConfirmModal} hideClose={this.state.success}>
                    {this.state.success ?
                        <ContentModal.Success description={"Cambios guardados con éxito"} />:
                        <ContentModal.Generic generic={this.warningContent} loading={false} confirm={this.updateMentor} />}
                </MentorModalBase>
                <MentorEditContainer>
                    {!this.state.mentor &&
                        <Loader style={{marginTop: 100}}/>}
                    {!!this.state.mentor &&
                        <Heading2 color={FONTS.purple}>{this.state.mentor.firstName} {this.state.mentor.lastName}</Heading2>}
                    {!!this.state.mentor && this.state.listSkills &&
                    <Formik
                        initialValues={this.state.mentor}
                        validationSchema={mentorFormBaseSchema}
                        onSubmit={this.onSubmit}>
                        {({ errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, setFieldTouched}) => {
                            return (
                                <MentorFormBaseContext.Provider
                                    value={{
                                        errors,
                                        handleBlur,
                                        handleChange,
                                        listSites,
                                        listSkills,
                                        selectedImage,
                                        setFieldTouched,
                                        setFieldValue,
                                        touched,
                                        updateImage: this.updateImage,
                                        updateListSkills: this.updateListSkills,
                                        values
                                    }}>
                                    <form onSubmit={handleSubmit}>
                                        <FormManager formData={{errors, touched, values}}
                                                     onHandleSubmit={this.onSubmit}/>
                                    </form>
                                </MentorFormBaseContext.Provider>
                            )
                        }}
                    </Formik>}
                </MentorEditContainer>
            </div>
        )
    }

    private updateMentor() {
        this.setState({saving: true, modal: false});
        this.mentorService.put(this.mentorCreateData.mentor).then(() => {
            this.setState({saving: false, modal: true, success: true});
            setTimeout( () => {
                this.closeConfirmModal();
            }, 2000)
        }).catch(() => {
            this.setState({saving: false, modal: false, success: false});
        });
    }

    private openConfirmModal() {
        this.setState({modal: true})
    }

    private closeConfirmModal() {
        this.setState({modal: false}, () => {
            setTimeout(() => {
                this.setState({success: false})
            }, 500)
        });
    }

    private onSubmit(values: IMentorFormValidations) {
        this.mentorCreateData.prepareData(values);
        this.openConfirmModal();
    }

    private updateListSkills(siteId: string) {
        return new Promise((resolve, reject) => {
            this.setState({listSkills: []}, () => {
                this.skillService.listBySite(siteId).then((skills: ISkill[]) => {
                    const listSkills = skills.map((v) => ({value: v.id, label: v.name}));
                    this.setState({listSkills});
                    resolve()
                }).catch(() => {
                    reject()
                })
            })
        })
    }

    private updateImage(selectedImage: string) {
        this.setState({selectedImage});
    }
}

export default MentorFormEdit ;
