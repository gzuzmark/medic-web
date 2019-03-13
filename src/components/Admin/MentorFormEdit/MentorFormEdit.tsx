import { Formik } from 'formik';
import * as React from "react";
import styled from "styled-components";
import ContentModal from "../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../common/ConsoleModal/MentorModalBase";
import LayoutContext, {IHeaderNotification} from "../../../common/Layout/Layout.context";
import Loader from "../../../common/Loader/Loader";
import LoaderFullScreen from "../../../common/Loader/LoaderFullsScreen";
import {FONTS} from "../../../common/MentorColor";
import {IPropsMentorOptionsDropDown} from "../../../common/MentorDropDown/MentorDropDown";
import { Heading2 } from "../../../common/MentorText";
import MentorAdminEditData, {IMentorAdminEditCreateData, IMentorAdminEditFormValidations} from "../../../domain/Mentor/MentorAdminEdit";
import {MENTOR_STATUS} from "../../../domain/Mentor/MentorBase";
import {IMentorFormValidations} from "../../../domain/Mentor/MentorBaseForm";
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
    mentor: IMentorAdminEditFormValidations | null;
    modal: boolean;
    saving: boolean;
}

export interface IPropsMentorEdit {
    match: IMatchParam;
}

export interface IPropsMentorEditCore{
    match: IMatchParam;
    setNotification(notification: IHeaderNotification): void;
}

const MentorEditContainer = styled.div`
    margin: 0 auto;
    width: 930px;
    ${Heading2} {
        text-align: center;
    }
`;

class MentorFormEditCore  extends React.Component <IPropsMentorEditCore, IStateMentorEdit > {
    public state: IStateMentorEdit ;
    private sitesService: SitesService;
    private mentorEditData: MentorAdminEditData;
    private skillService: SkillService;
    private mentorService: MentorService;
    private readonly idMentor: string;
    constructor(props: any) {
        super(props);
        this.updateListSkills = this.updateListSkills.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.updateMentor = this.updateMentor.bind(this);
        this.saveMentor = this.saveMentor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.mentorEditData = new MentorAdminEditData({} as IMentorAdminEditCreateData);
        this.sitesService = new SitesService();
        this.skillService =  new SkillService();
        this.mentorService =  new MentorService();
        this.state = {
            listSites: [] as IPropsMentorOptionsDropDown[],
            listSkills: [] as IPropsMentorOptionsDropDown[],
            mentor: null,
            modal: false,
            saving: false,
            selectedImage: ""
        };
        this.idMentor = this.props.match.params.id;
    }

    public componentDidMount() {
        this.mentorService.get(this.idMentor).then((mentor: IMentorAdminEditCreateData) => {
            const mentorEdit = {...mentor};
            this.mentorEditData = new MentorAdminEditData(mentorEdit);
            if (!!mentor.sitesId) {
                this.updateListSkills(mentor.sitesId[0].toString());
            }
            this.setState({
                mentor: {...this.mentorEditData.getMentorValues},
                selectedImage: mentor.photo
            });
            const status = mentor.status ? mentor.status : '';
            this.showWarningBox(status);
        }).catch(() => {
            // tslint:disable:no-console
            console.log("ERROR..!!")
        });
        this.sitesService.list().then((sites: ISites[]) => {
            const listSites = sites.map((v) => ({value: v.id, label: v.name}));
            this.setState({listSites});
        }).catch(() => {
            this.setState({listSites: []});
        })
    }

    public render() {
        const listSites = this.state.listSites;
        const listSkills = this.state.listSkills;
        const selectedImage = this.state.selectedImage;
        const disablePersonalData = !!this.state.mentor && !!this.state.mentor.otherUtpRole;
        return (
            <div className="u-LayoutMargin">
                {this.state.saving && <LoaderFullScreen modal={true} text={"Cargando..."}/>}
                <MentorModalBase show={this.state.modal} hideClose={true}>
                    <ContentModal.Success description={"Cambios guardados con éxito"} />
                </MentorModalBase>
                <MentorEditContainer>
                    {!this.state.mentor &&
                        <Loader style={{marginTop: 100}}/>}
                    {!!this.state.mentor &&
                        <Heading2 color={FONTS.purple}>{this.state.mentor.firstName} {this.state.mentor.lastName}</Heading2>}
                    {!!this.state.mentor && this.state.listSkills &&
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
                                        listSites,
                                        listSkills,
                                        selectedImage,
                                        setFieldTouched,
                                        setFieldValue,
                                        setTouched,
                                        setValues,
                                        touched,
                                        updateImage: this.updateImage,
                                        updateListSkills: this.updateListSkills,
                                        values: values as IMentorFormValidations
                                    }}>
                                    <form onSubmit={handleSubmit}>
                                        <FormManager formData={{errors, touched, values}}
                                                     mentor={{
                                                         id: this.idMentor,
                                                         status: this.state.mentor ? this.state.mentor.status : '',
                                                         updateMentor: this.updateMentor
                                                     }}
                                                     onHandleSubmit={this.onSubmit}
                                                     validateForm={validateForm}
                                                     disablePersonalData={disablePersonalData}/>
                                    </form>
                                </MentorFormBaseContext.Provider>
                            )
                        }}
                    </Formik>}
                </MentorEditContainer>
            </div>
        )
    }

    private updateMentor(status: string) {
        this.showWarningBox(status);
        if (this.state.mentor) {
            const mentor = {...this.state.mentor, status};
            this.setState({ mentor });
        }
    }

    private showWarningBox(status: string) {
        if (status === MENTOR_STATUS.INCOMPLETE) {
            this.props.setNotification({
                show: true,
                text: "Datos pendientes",
                type: "ERROR"
            })
        } else {
            this.props.setNotification({
                show: false,
                text: "",
                type: "ERROR"
            })
        }
    }

    private saveMentor() {
        this.setState({saving: true, modal: false});
        this.mentorService.put(this.idMentor, this.mentorEditData.mentor).then((mentor: IMentorAdminEditCreateData) => {
            const mentorEdit = {...mentor};
            this.mentorEditData = new MentorAdminEditData(mentorEdit);
            const status = mentor.status ? mentor.status : '';
            const oldMentor = {...this.state.mentor};
            this.showWarningBox(status);
            this.setState({
                mentor: {...oldMentor, ...this.mentorEditData.getMentorValues},
                modal: true,
                saving: false,
                selectedImage: mentor.photo
            });
            setTimeout( () => {
                this.setState({modal: false});
            }, 2000)
        }).catch(() => {
            this.setState({saving: false, modal: false});
        });
    }

    private onSubmit(values: IMentorFormValidations) {
        this.mentorEditData.prepareData(values);
        this.saveMentor();
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

const MentorFormEdit: React.FC<IPropsMentorEdit> = props => {
    const context = React.useContext(LayoutContext);
    return (
        <MentorFormEditCore match={props.match} setNotification={context.setNotification}/>
    )
}

export default MentorFormEdit ;
