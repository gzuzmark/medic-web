import { Formik } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';
import noAttened from '../../../assets/images/student_check_modal/no_attended.png';
import ContentModal from '../../../common/ConsoleModal/ContentModal';
import MentorModalBase from '../../../common/ConsoleModal/MentorModalBase';
import { Text3 } from '../../../common/ConsoleText';
import Layout from '../../../common/Layout/Layout';
import LoaderFullScreen from '../../../common/Loader/LoaderFullsScreen';
import { MomentDateParser } from '../../../domain/DateManager/MomentDateParser';
import { SESSION_LIFE } from '../../../domain/Session/SessionBean';
import SessionEditPatientHistoryData, {
	ISessionPatientHistoryForm,
	ISessionPatientPastCase,
} from '../../../domain/Session/SessionEditPatientHistory';
import {
	ISessionPatient,
	SessionMentorBean,
} from '../../../domain/Session/SessionMentorBean';
import sessionFormValidationSchema from '../../../domain/Session/SessionTreatmentValidation';
import {
	IStudentChecklist,
	STUDENT_STATUS,
	StudentChecklistBean,
} from '../../../domain/StudentChecklist/StudentChecklistBean';
import { StudentChecklistCollector } from '../../../domain/StudentChecklist/StudentChecklistCollector';
import { IMatchParam } from '../../../interfaces/MatchParam.interface';
import SessionService from '../../../services/Session/Session.service';
import StudentService from '../../../services/Student/Student.service';
import FormEditHistoryManager from './components/FormEditHistoryManager/FormEditHistoryManager';
import {
    ISessionNutritionistFormValidations,
	nutritionistDefaultValues,
} from './components/NutritionistForm/NutritionistForm.context';
import PatientBackgroundFormContext, {
    IPatientBackgroundFormValidations,
	IPatientCaseFormValidations,
	ISessionPatientHistoryFormValidations,
} from './components/PatientHistoryForm/PatientBackgroundForm.context';
import PatientPhotosModal from './components/PatientPhotosModal/PatientPhotosModal';
import RecipePreviewModal from './components/RecipePreviewModal/RecipePreviewModal';
import {ISessionFullCard} from "./components/SessionFullCard/SessionFullCard";
import SessionFullCard from "./components/SessionFullCard/SessionFullCard";
import { default as SimpleFullCard, ISimpleFullCard} from "./components/SimpleFullCard/SimpleFullCard";
import StudentAddModal, {IStudentModal} from "./components/StudentAddModal/StudentAddModal";
import StudentChecklistBoard, {
	ACTION,
	IStudentChecklistBoard,
} from './components/StudentChecklistBoard/StudentChecklistBoard';
import {
    default as StudentCheckModal,
    IStudentCheckModal,
    StudentCheckModalScreens
} from "./components/StudentCheckModal/StudentCheckModal";
import {IStudentChecklistCard} from "./components/StudentFullCard/StudentFullCard";
import UploadPrescriptionModal from './components/UploadPrescriptionModal/UploadPrescriptionModal';
import './SessionsMentor.scss';

interface IPropsSessionsMentor {
	match: IMatchParam;
}

interface IStateSessionsMentor {
    board: IStudentChecklistBoard;
    fullCardSession: ISessionFullCard;
    fullCardSimple: ISimpleFullCard;
    hasToken: boolean;
    hasTreatments: boolean;
    isEmpty: boolean;
    isNutrition: boolean;
    loading: boolean;
    pastCases: ISessionPatientPastCase[];
    patientHistory: ISessionPatientHistoryFormValidations;
    currentPatient: Record<string, string> | null;
    currentDoctor: Record<string, string> | null;
    prescriptionPath: string;
    folioNumber: string;
    searchValue: string;
    modal: boolean;
    modalError: boolean;
    modalSuccess: boolean;
    modalAdd: IStudentModal;
    modalCheck: IStudentCheckModal;
    showPhotosModal: boolean;
    showPreviewModal: boolean;
    showSaveSession: boolean;
    showSendRecipe: boolean;
    showUploadModal: boolean;
    uploadURL: string;
}

const MESSAGE_ADD_STUDENT = '¿Estás seguro que deseas agregar a este paciente?';
const MESSAGE_REPEAT_STUDENT =
	'Este paciente ya se encuentra inscrito en la sesión';

class SessionsMentor extends React.Component<IPropsSessionsMentor, IStateSessionsMentor> {
    private sessionId: string;
    private mentorId: string;
    private sessionService = new SessionService();
    private studentsService = new StudentService();
    private sessionMentor: SessionMentorBean;
    private studentChecklistCollector: StudentChecklistCollector;
    private mdp = new MomentDateParser();
    private patientHistoryData: SessionEditPatientHistoryData;
    constructor(props: any) {
        super(props);
        this.patientHistoryData = new SessionEditPatientHistoryData({} as ISessionPatientHistoryForm);
        this.state = {
            board: {
                addEnabled: false,
                attendedButton: true,
                noAttendedButton: true,
                noResultsAdd: false,
                studentList: []
            },
            currentDoctor: null,
            currentPatient: null,
            folioNumber: '',
            fullCardSession: {
                title: '',
                type: ''
            },
            fullCardSimple: {
                description: '',
                isLink: false,
                subtitle: '',
                title: ''
            },
            hasToken: false,
            hasTreatments: false,
            isEmpty: false,
            isNutrition: false,
            loading: true,
            modal: false,
            modalAdd: this.cleanAddModal(),
            modalCheck: this.cleanCheckModal(''),
            modalError: true,
            modalSuccess: false,
            pastCases: [],
            patientHistory: {
                case: this.patientHistoryData.getCaseValues,
                history: this.patientHistoryData.getHistoryValues,
                nutritionist: this.patientHistoryData.getNutritionValues
            },
            prescriptionPath: '',
            searchValue: '',
            showPhotosModal: false,
            showPreviewModal: false,
            showSaveSession: true,
            showSendRecipe: true,
            showUploadModal: false,
            uploadURL: '',
        };
        this.sessionId = this.props.match.params.session || '';
        this.onSearch = this.onSearch.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.searchStudent = this.searchStudent.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.requestAttended = this.requestAttended.bind(this);
        this.requestNoAttended = this.requestNoAttended.bind(this);
        this.onConfirmCheck = this.onConfirmCheck.bind(this);
        this.closeModalError = this.closeModalError.bind(this);
        this.showModalNoAttended = this.showModalNoAttended.bind(this);
        this.showModalAttended = this.showModalAttended.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateHistory = this.updateHistory.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
        this.toggleSaveSession = this.toggleSaveSession.bind(this);
        this.toggleSendRecipe = this.toggleSendRecipe.bind(this);
        this.togglePreviewModal = this.togglePreviewModal.bind(this);
        this.onClosePreviewModal = this.onClosePreviewModal.bind(this);
        this.onDownloadRecipe = this.onDownloadRecipe.bind(this);
        this.onUploadRecipe = this.onUploadRecipe.bind(this);
        this.onSendRecipe = this.onSendRecipe.bind(this);
        this.updateSendRecipe = this.updateSendRecipe.bind(this);
        this.getPrescriptionURL = this.getPrescriptionURL.bind(this);
        this.onCloseUploadModal = this.onCloseUploadModal.bind(this);
        this.togglePhotosModal = this.togglePhotosModal.bind(this);
        this.onClosePhotosModal = this.onClosePhotosModal.bind(this);
    }

    public componentDidMount() {
        this.setState({
            loading: true
        }, () => {
            Promise.all([
                this.sessionService.getSessionMentor(this.sessionId),
                this.studentsService.studentsFromSession(this.sessionId),
                this.sessionService.getSessionConsult(this.sessionId),
                this.sessionService.getPastSessionConsults(this.sessionId),
            ]).then((values: any[]) => {
                const sessionResponse = values[0];
                const isNutrition = sessionResponse.skill.is_nutrition;
                this.sessionMentor = new SessionMentorBean(sessionResponse);
                this.studentChecklistCollector = new StudentChecklistCollector(values[1]);
                const sessions = this.studentChecklistCollector.sessions;
                const patient = this.sessionMentor.session.patient;
                const patCase = !isNutrition ? values[2] : {};
                const patNutrition = isNutrition ? values[2] : nutritionistDefaultValues;
                const pastCases = values[3] as ISessionPatientPastCase[];
                const patientHistory = {
                    case: patCase,
                    history: patient,
                    nutritionist: patNutrition,
                } as ISessionPatientHistoryForm;
                this.sessionMentor.setSessionPatientTriage(isNutrition ? patNutrition : patCase);
                this.patientHistoryData = new SessionEditPatientHistoryData(patientHistory);
                const hasToken = sessionResponse.doctor && !!sessionResponse.doctor.has_token;
                const newState = {
                    board: this.getBoard(sessions, patient),
                    currentDoctor: values[0].doctor,
                    currentPatient: values[0].patient,
                    folioNumber: patCase.folioNumber,
                    fullCardSession: this.getFullCardSession(),
                    fullCardSimple: this.getFullCardSimple(),
                    hasToken,
                    hasTreatments: patCase.has_treatments,
                    isEmpty: sessions.length === 0 && !patient,
                    isNutrition,
                    pastCases,
                    patientHistory: {
                        case: this.patientHistoryData.getCaseValues,
                        history: this.patientHistoryData.getHistoryValues,
                        nutritionist: this.patientHistoryData.getNutritionValues,
                    },
                    prescriptionPath: patCase.prescriptionPath,
                    showSaveSession: !hasToken || !!patCase.prescriptionPath,
                    showSendRecipe: hasToken && !patCase.prescriptionPath,
                };
                this.setState({
                    loading: false,
                    ...newState
                });
            }, () => {
                this.setState({
                    isEmpty: true,
                    loading: false,
                })
            });
        });
    }

    public render() {
        const session = this.sessionMentor && this.sessionMentor.session;
        const navBarText = this.sessionMentor ?
            `${this.mdp.isDateToday(this.sessionMentor.session.from)? 'hoy ': ''}${this.sessionMentor.getDate(this.mdp)}` : '';
        const patientPhotos = this.sessionMentor && this.sessionMentor.getPatientPhotos();
        return <Layout title={"Tutores"}>
            <MentorModalBase show={this.state.modalSuccess} onCloseModal={this.closeConfirmModal} hideClose={true}>
                <ContentModal.Success description={"Cambios guardados con éxito"} />
            </MentorModalBase>
            <MentorModalBase
                show={this.state.modal}
                onCloseModal={this.closeModal}
                hideClose={this.state.modalCheck.screen === StudentCheckModalScreens.SUCCESS || this.state.modalError}>
                {!!this.state.modalAdd.user?
                    <StudentAddModal
                        options={this.state.modalAdd}
                        confirm={this.addStudent}/> : null}
                {!!this.state.modalCheck.screen ?
                    <StudentCheckModal
                        options={this.state.modalCheck}
                        confirm={this.onConfirmCheck}/> : null}
                {!!this.state.modalError ?
                    <ContentModal.Warning
                        confirm={this.closeModalError}
                        image={<img src={noAttened} />}
                        button={"Entendido"}
                        description={"Este paciente aún no ha descargado la aplicación. Podrás agregarlo una vez que esta sesión haya iniciado."}
                        title={"Lo sentimos, no se pudo agregar al paciente."}/> : null}
            </MentorModalBase>
            <div className="SessionsMentor u-LayoutMentorMargin">
                {this.sessionMentor &&
                <div className={"SessionsMentor_navigation"}>
                    <Link to={'/doctor'}><Text3>Tus sesiones >&nbsp;</Text3></Link>
                    <Text3>
                        {navBarText.charAt(0).toUpperCase()}{navBarText.slice(1)} >&nbsp;</Text3>
                    <Text3>{`Sesión ${this.state.fullCardSession.type.toLowerCase()}`}</Text3>
                </div>}
                {this.state.loading && !this.state.isEmpty &&
                    <LoaderFullScreen text={"Cargando..."} styleLoaderContainer={{marginTop: 300}} />}
                <PatientPhotosModal show={this.state.showPhotosModal} photos={patientPhotos && patientPhotos.map(p => p.url) || null} onClose={this.onClosePhotosModal} />
                {!this.state.loading &&
                    <React.Fragment>
                        <SessionFullCard session={this.state.fullCardSession}/>
                        <SimpleFullCard card={this.state.fullCardSimple}>
                            <StudentChecklistBoard
                                board={this.state.board}
                                onSearch={this.onSearch}
                                onSelect={this.onSelect}
                                requestAttended={this.showModalAttended}
                                requestNoAttended={this.showModalNoAttended}
                                searchValue={this.state.searchValue}
                                isEmpty={this.state.isEmpty}
                                tags={[]}
                                sessionId={this.sessionId}
                                studentCommented={this.studentCommented}
                                hideObservations={true}
                                hideSearch={true}
                            />
                            <Formik
                                validationSchema={sessionFormValidationSchema}
                                initialValues={this.state.patientHistory}
                                enableReinitialize={true}
                                isInitialValid={false}
                                onSubmit={this.onSubmit}>
                                {({ errors, touched, values, setFieldValue, handleBlur, handleChange, handleSubmit}) => {
                                    return (
                                        <PatientBackgroundFormContext.Provider
                                            value={{
                                                errors,
                                                handleBlur,
                                                handleChange,
                                                setFieldValue,
                                                touched,
                                                values: values as ISessionPatientHistoryFormValidations,
                                            }}>
                                            <RecipePreviewModal
                                                show={this.state.showPreviewModal}
                                                onClose={this.onClosePreviewModal}
                                                recipeURL={this.state.prescriptionPath}
                                                uploadURL={this.state.uploadURL}
                                                onDownloadRecipe={this.onDownloadRecipe}
                                                onUploadRecipe={this.onUploadRecipe}
                                            />
                                            <UploadPrescriptionModal
                                                show={this.state.showUploadModal}
                                                onClose={this.onCloseUploadModal}
                                                uploadURL={this.state.uploadURL}
                                            />
                                            <form onSubmit={handleSubmit}>
                                                <FormEditHistoryManager
                                                    formData={{values}}
                                                    onHandleSubmit={this.onSubmit}
                                                    session={session}
                                                    pastCases={this.state.pastCases}
                                                    isNutrition={this.state.isNutrition}
                                                    showSaveSession={this.state.showSaveSession}
                                                    showSendRecipe={this.state.showSendRecipe}
                                                    toggleSaveSession={this.toggleSaveSession}
                                                    toggleSendRecipe={this.toggleSendRecipe}
                                                    onSendRecipe={this.onSendRecipe}
                                                    folioNumber={this.state.folioNumber}
                                                    prescriptionURL={this.state.prescriptionPath}
                                                    getPrescriptionURL={this.getPrescriptionURL}
                                                    handleOpenPatientPhotos={this.togglePhotosModal}
                                                    hasTreatments={this.state.hasTreatments}
                                                />
                                            </form>
                                        </PatientBackgroundFormContext.Provider>
                                    )
                                }}
                            </Formik>
                        </SimpleFullCard>
                    </React.Fragment>}
            </div>
        </Layout>
    }

    private updateHistory() {
        const sessionId = this.sessionId;
        const isNutrition = this.state.isNutrition;
        const historyUpdatedParams = this.patientHistoryData.historyUpdateParams;
        const caseUpdatedParams = {
            ...this.patientHistoryData.caseUpdateParams,
            folioNumber: this.state.folioNumber,
            prescriptionPath: this.state.prescriptionPath
        };
        const nutritionistUpdateParams = this.patientHistoryData.getNutritionValues;
        const patientForm = isNutrition ? nutritionistUpdateParams : caseUpdatedParams;
        if (sessionId) {
            this.setState({ loading: true, modalSuccess: false });
            Promise.all([
                this.sessionService.updateHistoryBackground(sessionId, historyUpdatedParams),
                this.sessionService.updateSessionConsult(sessionId, patientForm),
            ]).then((responses) => {
                const patHistory = responses[0] as IPatientBackgroundFormValidations;
                const patCase = (!isNutrition ? responses[1] : {}) as IPatientCaseFormValidations;
                const patNutrition = (isNutrition ? responses[1] : nutritionistDefaultValues) as ISessionNutritionistFormValidations;
                this.setState({
                    loading: false,
                    modalSuccess: true,
                    patientHistory: { history: patHistory, case: patCase, nutritionist: patNutrition },
                });
                setTimeout(() => {
                    this.setState({ modalSuccess: false });
                },1500);
            }).catch(() => {
                this.setState({ loading: false });
            })
        }
    }

    private onSubmit(values: ISessionPatientHistoryFormValidations) {
        this.patientHistoryData.preparePatientHistoryData(values.history);
        if (this.state.isNutrition) {
            if (values.nutritionist) {
                this.patientHistoryData.prepareNutritionData(values.nutritionist);
            }
        } else {
            this.patientHistoryData.preparePatientCaseData(values.case);
        }
        this.updateHistory();
    }
    private togglePhotosModal(showPhotosModal: boolean) {
        this.setState({ showPhotosModal });
    }
    private toggleSaveSession(showSaveSession: boolean) {
        this.setState({ showSaveSession });
    }
    private toggleSendRecipe(showSendRecipe: boolean) {
        this.setState({ showSendRecipe });
    }
    private onClosePhotosModal() {        
        this.setState({ showPhotosModal: false });
    }
    private onClosePreviewModal() {
        this.setState({ showPreviewModal: false });
    }
    private onCloseUploadModal() {
        this.setState({ showUploadModal: false });
    }
    private onDownloadRecipe() {
        const recipeParams = this.patientHistoryData.getRecipeData(this.state.currentPatient, this.state.currentDoctor, this.sessionMentor.issueDate, this.state.pastCases.length) as any;
        this.sessionService.createPrescription(recipeParams).then((response: any) => {
            const { folioNumber, prescriptionUrl, uploadFileUrl } = response.prescriptionResponse;
            this.setState({ folioNumber, uploadURL: uploadFileUrl });
            const link = document.createElement("a");
            link.target = "_blank";
            link.href = prescriptionUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch(() => {
            this.setState({ loading: false });
        })
    }
    private onUploadRecipe() {
        this.setState({
            showPreviewModal: false,
            showSaveSession: true,
            showSendRecipe: false,
            showUploadModal: true,
        });
    }
    private getPrescriptionURL() {
        this.sessionService.getFileURL(this.state.folioNumber).then((response: any) => {
            const url = response.url;
            const link = document.createElement("a");
            link.target = "_blank";
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    private togglePreviewModal(showPreviewModal: boolean) {
        this.setState({ showPreviewModal });
    }
    private onSendRecipe(values: ISessionPatientHistoryFormValidations) {
        this.patientHistoryData.preparePatientCaseData(values.case);
        this.updateSendRecipe();
    }
    private updateSendRecipe() {
        const recipeParams = this.patientHistoryData.getRecipeData(this.state.currentPatient, this.state.currentDoctor, this.sessionMentor.issueDate, this.state.pastCases.length) as any;
        this.sessionService.sendTreatmentsRecipe(recipeParams).then((response: any) => {
            this.setState({
                hasTreatments: true,
                prescriptionPath: response.previewResponse.link,
                showPreviewModal: true,
            });
        }).catch(() => {
            this.setState({ loading: false });
        })
    }

	private closeConfirmModal() {
		this.setState({ modalSuccess: false });
	}

	private closeModal(force?: boolean) {
		if (
			(!this.state.modalAdd.loading && !this.state.modalCheck.loading) ||
			!!force
		) {
			this.setState({
				modal: false,
				modalAdd: this.cleanAddModal(),
				modalCheck: this.cleanCheckModal(''),
				modalError: false,
			});
		}
	}

	private closeModalError() {
		this.setState(
			{
				searchValue: '',
			},
			() => {
				this.closeModal(true);
			},
		);
	}

	private showModalAttended() {
		this.setState({
			modal: true,
			modalAdd: this.cleanAddModal(),
			modalCheck: this.cleanCheckModal(StudentCheckModalScreens.ATTENDED),
			modalError: false,
		});
	}

	private showModalNoAttended() {
		this.setState({
			modal: true,
			modalAdd: this.cleanAddModal(),
			modalCheck: this.cleanCheckModal(StudentCheckModalScreens.NO_ATTENDED),
			modalError: false,
		});
	}

	private onConfirmCheck(screen: string) {
		if (screen === StudentCheckModalScreens.ATTENDED) {
			this.requestAttended();
		} else if (screen === StudentCheckModalScreens.NO_ATTENDED) {
			this.requestNoAttended();
		}
	}

	private studentCommented() {
		return '';
	}

	private requestAttended() {
		const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
			'.StudentFullCard_option--checkbox input[type=checkbox]:checked',
		);
		const ids = Array.from(checkboxes).map((input) => input.value);
		const filteredIds = ids.filter((id: string) => {
			return !!this.studentChecklistCollector.getStudentById(id);
		});
		if (filteredIds.length > 0) {
			const loadingOptions = { ...this.state.modalCheck, loading: true };
			this.setState(
				{
					modalCheck: loadingOptions,
				},
				() => {
					this.sessionService
						.markAsAttended(this.sessionId, filteredIds)
						.then(() => {
							filteredIds.forEach((id: string) => {
								this.studentChecklistCollector.markAsAttendedTo(id);
								this.sessionMentor.setAsAttended();
								this.showSuccessModal();
							});
						})
						.catch((error) => {
							// mostrar modal error
						});
				},
			);
		} else {
			// mostrar modal exito
		}
	}

	private requestNoAttended() {
		const loadingOptions = { ...this.state.modalCheck, loading: true };
		this.setState(
			{
				modalCheck: loadingOptions,
			},
			() => {
				this.sessionService
					.markAsNoAttended(this.sessionId)
					.then(() => {
						this.sessionMentor.setAsNoAttended();
						this.showSuccessModal();
					})
					.catch(() => {
						// mostrar modal error
					});
			},
		);
	}

	private showSuccessModal() {
		const options = {
			loading: false,
			screen: StudentCheckModalScreens.SUCCESS,
		};
		const sessions = this.studentChecklistCollector.filterStudents(
			this.state.searchValue,
		);
		this.setState(
			{
				board: this.getBoard(sessions),
				modalCheck: options,
			},
			() => {
				setTimeout(() => {
					this.closeModal(true);
				}, 1300);
			},
		);
	}

	private searchStudent(action: string) {
		if (action === ACTION.SEARCH) {
			const sessions = this.studentChecklistCollector.filterStudents(
				this.state.searchValue,
			);
			this.setState({
				board: this.getBoard(sessions),
			});
		} else if (action === ACTION.ADD) {
			if (!!this.state.searchValue) {
				const studentCode = this.state.searchValue;
				const student = this.studentChecklistCollector.getStudent(studentCode);
				if (!student) {
					this.studentsService
						.searchStudentFromSession(this.sessionId, studentCode)
						.then((response: IStudentChecklist) => {
							if (response.enableToReserve) {
								this.setState({
									modal: true,
									modalAdd: {
										loading: false,
										message: MESSAGE_ADD_STUDENT,
										user: response,
									},
									modalError: false,
								});
							} else {
								this.setState({
									modal: true,
									modalError: true,
								});
							}
						})
						.catch((error) => {
							if (error.response.status === 404) {
								const newStateBoard = {
									...this.state.board,
									noResultsAdd: true,
								};
								this.setState({
									board: newStateBoard,
								});
							}
						});
				} else {
					this.setState({
						modal: true,
						modalAdd: {
							loading: false,
							message: MESSAGE_REPEAT_STUDENT,
							user: student.getContract,
						},
						modalError: false,
					});
				}
			}
		}
	}

	private addStudent(user: IStudentChecklist) {
		const student = this.studentChecklistCollector.getStudent(
			user.student.code,
		);
		if (!student) {
			const idStudent = user.student.id ? user.student.id : '';
			const modalAdd = { ...this.state.modalAdd, loading: true };
			this.setState({ modalAdd });
			this.studentsService
				.addStudentToSession(
					this.sessionId,
					idStudent,
					this.mentorId,
					this.sessionMentor.locationType,
				)
				.then((response: { id: string }) => {
					user.id = response.id;
					user.status = STUDENT_STATUS.SCHEDULED;
					const newStudent = new StudentChecklistBean(user);
					this.studentChecklistCollector.addStudent(newStudent);
					const sessions = this.studentChecklistCollector.sessions;
					this.sessionMentor.incrementStudent();
					this.setState(
						{
							board: this.getBoard(sessions),
							fullCardSimple: this.getFullCardSimple(),
							isEmpty: sessions.length === 0,
							searchValue: '',
						},
						() => {
							this.closeModal(true);
						},
					);
				})
				.catch(() => {
					this.closeModal(true);
				});
		} else {
			this.closeModal(true);
		}
	}

	private onSelect(id: string) {
		this.studentChecklistCollector.updateSelectionFor(id);
		const sessions = this.studentChecklistCollector.filterStudents(
			this.state.searchValue,
		);
		this.setState({
			board: this.getBoard(sessions),
		});
	}

	private onSearch(searchValue: string, action: string) {
		const newStateBoard = { ...this.state.board };
		if (this.state.board.noResultsAdd) {
			newStateBoard.noResultsAdd = false;
			this.setState({
				board: newStateBoard,
			});
		}
		this.setState(
			{
				board: newStateBoard,
				searchValue,
			},
			() => {
				this.searchStudent(action);
			},
		);
	}

	private getFullCardSession(): ISessionFullCard {
		const schedule = this.sessionMentor.getTime(new MomentDateParser());
		return {
			title: `${this.sessionMentor.getSessionType('Sesión')} - ${schedule}`,
			type:
				this.sessionMentor.getStatus() === SESSION_LIFE.ACTIVE
					? 'En curso'
					: 'Activa',
		};
	}

	private getBoard(
		sessions?: StudentChecklistBean[],
		patient?: ISessionPatient,
	): IStudentChecklistBoard {
		if (!sessions) {
			sessions = this.studentChecklistCollector.sessions;
		}
		const studentList = [];
		if (patient) {
			studentList.push(this.buildStudentItemFromPatient(patient));
		}
		return {
			addEnabled:
				!this.sessionMentor.isNoAttended &&
				!this.sessionMentor.isUndefined() &&
				!patient,
			attendedButton:
				this.studentChecklistCollector.isAllStudentsAttended ||
				this.sessionMentor.isDisableAttended,
			noAttendedButton:
				(this.studentChecklistCollector.atLeastOneAttended ||
					this.sessionMentor.isDisableNoAttended) &&
				!patient,
			noResultsAdd: false,
			studentList,
		};
	}

	private getFullCardSimple(): ISimpleFullCard {
		return {
			description: this.sessionMentor.getLocation(),
			isLink: this.sessionMentor.isVirtual(),
			subtitle: this.sessionMentor.getAvailability(),
			title: this.sessionMentor.skillName,
		};
	}

	private buildStudentItemFromPatient(
		patient: ISessionPatient,
	): IStudentChecklistCard {
		return {
			checked: false,
			code: patient.id || '',
			commented: false,
			disabled: this.sessionMentor.isDisabled,
			id: patient.id || '',
			isEnabledForComment: false,
			lastname: patient.last_name,
			mentorComment: '',
			name: `${patient.name} ${patient.full_last_name}`,
			new: true,
			photo: '',
			studentId: patient.id || '',
			tags: [],
		} as IStudentChecklistCard;
	}

	private cleanAddModal() {
		return {
			loading: false,
			message: '',
			show: false,
			user: null,
		};
	}

	private cleanCheckModal(screen: string) {
		return {
			loading: false,
			screen,
		};
	}
}

export default SessionsMentor;
