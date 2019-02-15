import { Formik } from 'formik';
import * as React from "react";
import Loader from "../../../common/Loader/Loader";
import {IPropsMentorOptionsDropDown} from "../../../common/MentorDropDown/MentorDropDown";
import Utilities from "../../../common/Utilities";
import MentorCreateData, {IMentorCreateData, IMentorFormValidations} from "../../../domain/Mentor/MentorCreate";
import {ISites} from "../../../domain/Sites/Sites";
import {ISkill} from "../../../domain/Skill/Skill";
import SitesService from "../../../services/Sites/Sites.service";
import SkillService from "../../../services/Skill/Skill.service";
import FormManager from "./components/FormManager/FormManager";
import StepsBar, {IStepsBar} from "./components/StepsBar/StepsBar";
import MentorCreateContext from "./MentorCreate.context";
import './MentorCreate.scss';
import mentorCreateSchema from "./MentorCreate.validations";

interface IStateMentorCreate {
    stepsBar: IStepsBar[];
    stepActive: number;
    submitText: string;
    mentorData: IMentorFormValidations;
    listSites: IPropsMentorOptionsDropDown[];
    listSkills: IPropsMentorOptionsDropDown[];
    loader: boolean;
    selectedImage: string;
}

const emptyStep = {active: false, animation: true, complete: false};
const defaultStep = {active: true, animation: false, complete: false};

class MentorCreate extends React.Component <{}, IStateMentorCreate> {
    public state: IStateMentorCreate;
    public mentorCreateData: MentorCreateData;
    private sitesService: SitesService;
    private skillService: SkillService;
    constructor(props: any) {
        super(props);
        this.mentorCreateData = new MentorCreateData({} as IMentorCreateData);
        this.onSelectStep = this.onSelectStep.bind(this);
        this.onNextStep = this.onNextStep.bind(this);
        this.onBeforeStep = this.onBeforeStep.bind(this);
        this.updateListSkills = this.updateListSkills.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.sitesService = new SitesService();
        this.skillService =  new SkillService();
        this.state = {
            listSites: [] as IPropsMentorOptionsDropDown[],
            listSkills: [] as IPropsMentorOptionsDropDown[],
            loader: true,
            mentorData: this.mentorCreateData.getMentorValues,
            selectedImage: "",
            stepActive: 1,
            stepsBar: [{...defaultStep, title: "Correo"},
                {...emptyStep, title: "Datos personales"},
                {...emptyStep, title: "Perfil (opcional)"},
                {...emptyStep, title: "Confirmación"}],
            submitText: "Continuar"
        }
    }

    public componentDidMount() {
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
                <div className='MentorCreate'>
                    <StepsBar steps={this.state.stepsBar} click={this.onSelectStep}/>
                    {this.state.loader ?
                        <Loader style={{marginTop: 140}}/> :
                        <Formik
                            initialValues={this.mentorCreateData.getMentorValues}
                            validationSchema={mentorCreateSchema}
                            onSubmit={this.onSubmit}>
                            {({ errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, setFieldTouched}) => {
                                return (
                                    <MentorCreateContext.Provider
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
                                            <FormManager currentStep={this.state.stepActive}
                                                         formData={{errors, touched, values}}
                                                         onBeforeStep={this.onBeforeStep}
                                                         onNextStep={this.onNextStep}
                                                         submitText={this.state.submitText}/>
                                        </form>
                                    </MentorCreateContext.Provider>
                                )
                            }}
                        </Formik>
                    }
                </div>
            </div>
        )
    }

    private onSubmit(values: IMentorFormValidations) {
        // tslint:disable:no-console
        console.log(values);
    }

    private onSelectStep(step: IStepsBar, counter: number) {
        const completedSteps = this.state.stepsBar.filter((s) => s.complete);
        if (!step.active && (step.complete || counter === completedSteps.length + 1 )) {
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
            step.active = index + 1 === counter;
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

export default MentorCreate;
