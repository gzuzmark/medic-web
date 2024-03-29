import { Formik } from 'formik';
import * as React from "react";
import ContentModal, {IGenericContentModal} from "../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../common/Icon/Icon";
import Loader from "../../../common/Loader/Loader";
import {IPropsMentorOptionsDropDown} from "../../../common/MentorDropDown/MentorDropDown";
import Utilities from "../../../common/Utils/Utilities";
import MentorAdminCreateData, {IMentorAdminCreateData} from "../../../domain/Mentor/MentorAdminCreate";
import {IMentorFormValidations} from "../../../domain/Mentor/MentorBaseForm";
import {ISites} from "../../../domain/Sites/Sites";
import {ISkill} from "../../../domain/Skill/Skill";
import MentorRepository from "../../../repository/MentorsRepository";
import MentorService from "../../../services/Mentor/Mentor.service";
import SitesService from "../../../services/Sites/Sites.service";
import SkillService from "../../../services/Skill/Skill.service";
import MentorFormBaseContext from "../MentorFormBase/MentorFormBase.context";
import FormManager from "./components/FormManager/FormManager";
import StepsBar, {IStepsBar} from "./components/StepsBar/StepsBar";
import './MentorFormCreate.scss';
import {mentorCreateSchemaRNENotRequired, mentorCreateSchemaRNERequired} from "./MentorFormCreate.validations";

const skillsIdRneNotRequired = [
    "20d7bfad-fa6f-40f7-a084-e0ff7b0bd5ea", // Medicina General ID PROD, STAGING
    "25b9be97-d739-4a3a-9720-80ff7155b49f", // Nutrición ID PROD, STAGING
    "1f541097-dc70-4852-a31a-f2956ab4fab4", // Psicología ID PROD, STAGING
]

interface IStateMentorCreate {
    stepsBar: IStepsBar[];
    stepActive: number;
    submitText: string;
    mentorData: IMentorFormValidations;
    listSites: IPropsMentorOptionsDropDown[];
    listSkills: IPropsMentorOptionsDropDown[];
    listDiagnostics: IPropsMentorOptionsDropDown[];
    loader: boolean;
    modal: boolean;
    saving: boolean;
    selectedImage: string;
    isRNERequired: boolean
}

const emptyStep = {active: false, animation: true, complete: false};
const defaultStep = {active: true, animation: false, complete: false};

class MentorFormCreate extends React.Component <{}, IStateMentorCreate> {
    public state: IStateMentorCreate;
    private mentorCreateData: MentorAdminCreateData;
    private sitesService: SitesService;
    private skillService: SkillService;
    private mentorService: MentorService;
    private successContent: IGenericContentModal;
    constructor(props: any) {
        super(props);
        this.mentorCreateData = new MentorAdminCreateData({} as IMentorAdminCreateData);
        this.onSelectStep = this.onSelectStep.bind(this);
        this.onNextStep = this.onNextStep.bind(this);
        this.onBeforeStep = this.onBeforeStep.bind(this);
        this.updateListSkills = this.updateListSkills.bind(this);
        this.updateListDiagnostics = this.updateListDiagnostics.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sitesService = new SitesService();
        this.skillService =  new SkillService();
        this.mentorService =  new MentorService();
        this.state = {
            listSites: [] as IPropsMentorOptionsDropDown[],
            listSkills: [] as IPropsMentorOptionsDropDown[],
            loader: true,
            mentorData: this.mentorCreateData.getMentorValues,
            listDiagnostics:[] as IPropsMentorOptionsDropDown[],
            modal: false,
            saving: false,
            selectedImage: "",
            stepActive: 1,
            stepsBar: [{...defaultStep, title: "Datos personales"},
                {...emptyStep, title: "Datos de Ocupación"},
                {...emptyStep, title: "Creación de perfil"}],
            submitText: "Continuar",
            isRNERequired: false
        };
        this.successContent = {
            button: "Agregar a otro mentor",
            description: "Se le enviará un correo con los datos que ingresaste.",
            image: <Icon name={'add-contact'} />,
            title: "¡Listo! Mentor Agregado"
        }
    }

    public componentDidMount() {
        this.sitesService.list().then((sites: ISites[]) => {
            const listSites = sites.map((v) => ({value: v.id, label: v.name}));
            this.setState({listSites, loader: false});
        }).catch(() => {
            this.setState({loader: true});
        })

            this.skillService.list().then((skills: ISkill[]) => {
                const listSkills = skills.map((v) => ({value: v.id, label: v.name,code: v.type_code}));
                this.setState({listSkills,loader: false});
            }).catch(() => {
                this.setState({loader: true});
            })
    }


    public render() {
        const listSites = this.state.listSites;
        const listSkills = this.state.listSkills;
        const listDiagnostics = this.state.listDiagnostics;
        const selectedImage = this.state.selectedImage;
        return (
            <div className="u-LayoutMargin">
                <MentorModalBase
                    show={this.state.modal}
                    onCloseModal={this.returnToHome}>
                        <ContentModal.Generic generic={this.successContent} loading={false} confirm={this.saveNextMentor} />
                </MentorModalBase>
                <div className='MentorCreate'>
                    <StepsBar steps={this.state.stepsBar} click={this.onSelectStep}/>
                    {this.state.loader ?
                        <Loader style={{marginTop: 140}}/> :
                        <Formik
                            initialValues={this.mentorCreateData.getMentorValues}
                            validationSchema={this.state.isRNERequired ? mentorCreateSchemaRNERequired : mentorCreateSchemaRNENotRequired}
                            onSubmit={this.onSubmit}>
                            {({ errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, setFieldTouched, setValues, setTouched}) => {
                                return (
                                    <MentorFormBaseContext.Provider
                                        value={{
                                            errors,
                                            handleBlur,
                                            handleChange,
                                            listSites,
                                            listSkills,
                                            listDiagnostics,
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
                                            <FormManager currentStep={this.state.stepActive}
                                                         formData={{errors, touched, values}}
                                                         onBeforeStep={this.onBeforeStep}
                                                         onNextStep={this.onNextStep}
                                                         onHandleSubmit={this.onSubmit}
                                                         saving={this.state.saving}
                                                         updateField={this.updateField(setFieldValue, setFieldTouched)}
                                                         submitText={this.state.submitText}/>
                                        </form>
                                    </MentorFormBaseContext.Provider>
                                )
                            }}
                        </Formik>
                    }
                </div>
            </div>
        )
    }

    private updateField(setFieldValue: any, setFieldTouched: any) {
        return (field: string, value: string) => {
            setFieldTouched(field, false);
            setFieldValue(field, value);
        }
    }

    private onSubmit(values: IMentorFormValidations) {
        this.mentorCreateData.prepareData(values);
        this.setState({saving: true});
        this.mentorService.save(this.mentorCreateData.prepareDataCreate()).then((response: any) => {
            this.setState({saving: false, modal: true});
            MentorRepository.addedMentorsInsert(response);
        }).catch(() => {
            this.setState({saving: false});
        })
    }

    private onSelectStep(step: IStepsBar, counter: number) {
        if (this.state.stepActive <= counter || this.state.saving) {
            return
        }
        const completedSteps = this.state.stepsBar.filter((s) => s.complete);
        if (!step.active && (step.complete || counter === completedSteps.length + 1 ) ) {
            let stepsBar = this.removeAnimations(counter);
            stepsBar = this.getActiveStepsBar(counter);
            this.setState({stepActive: counter, stepsBar}, () => {
                Utilities.scrollToTop();
            });
        }
    }

    private onNextStep() {
        const counter = this.state.stepActive;
        const nextStep = counter + 1;
        if (nextStep <= this.state.stepsBar.length) {
            let stepsBar = this.updateStepCompleted(counter);
            stepsBar = this.getActiveStepsBar(nextStep);
            this.setState({stepActive: nextStep, stepsBar}, () => {
                Utilities.scrollToTop();
            });
        }// test ultimo paso seccion review
        if(nextStep===4){
            let stepsBar = this.updateStepCompleted(counter);
            stepsBar = this.getActiveStepsBar(nextStep);
            this.setState({stepActive: nextStep, stepsBar}, () => {
                Utilities.scrollToTop();
            });
        }
    }

    private onBeforeStep() {
        const counter = this.state.stepActive;
        const beforeStep = counter - 1;
        if (beforeStep > 0) {
            const stepsBar = this.getActiveStepsBar(beforeStep);
            this.setState({stepActive: beforeStep, stepsBar}, () => {
                Utilities.scrollToTop();
            });
        }
    }

    private getActiveStepsBar(counter: number, newStepsBar?: IStepsBar[]) {
        const stepsBar = newStepsBar || [...this.state.stepsBar];
        return stepsBar.map((step, index) => {
            if (index + 1 > counter) {
                step = {...step, ...emptyStep};
            } else if (index + 1 === counter) {
                step = {...step, ...defaultStep};
            } else {
                step.active = false;
            }
            return step;
        })
    }

    private removeAnimations(counter: number) {
        const stepsBar = [...this.state.stepsBar];
        return stepsBar.map((step, index) => {
            if (index + 1 === counter) {
                step.animation = false;
            } else if (index + 1 === this.state.stepActive) {
                step.animation = false;
            }
            return step;
        })
    }

    private updateStepCompleted(counter: number, newStepsBar?: IStepsBar[]) {
        const stepsBar = newStepsBar || [...this.state.stepsBar];
        return stepsBar.map((step, index) => {
            step.complete = (index + 1 === counter) ? true : step.complete;
            return step;
        })
    }

    private updateListSkills() {
        return new Promise<void>((resolve, reject) => {
            this.setState({listSkills: []}, () => {
                this.skillService.list().then((skills: ISkill[]) => {
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
        this.setState({...this.state, isRNERequired: true})
        skillsIdRneNotRequired.map(id => {
            if (id === skillId) {
                this.setState({...this.state, isRNERequired: false})
            }
        })

        return new Promise<void>((resolve, reject) => {
            this.skillService.listDiagnosticsBySkill(skillId).then((listEl: ISkill[]) => {
                const listDiagnostics = listEl.map((v) => ({value: v.id, label: v.name}));
                this.setState({listDiagnostics,loader: false});
                resolve()
            }).catch(() => {
                reject()
            })
        })
    }
    private updateImage(selectedImage: string) {
        this.setState({selectedImage});
    }

    private saveNextMentor() {
        window.location.reload(true);
    }

    private returnToHome() {
        window.location.assign('/');
    }
}

export default MentorFormCreate;
