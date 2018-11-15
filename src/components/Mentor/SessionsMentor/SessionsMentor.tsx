import * as React from 'react';
import MentorModalBase from "../../../common/ConsoleModal/MentorModalBase";
import { Text3 } from '../../../common/ConsoleText';
import Layout from "../../../common/Layout/Layout";
import Loader from "../../../common/Loader/Loader";
import {MomentDateParser} from "../../../domain/DateManager/MomentDateParser";
import {SESSION_LIFE} from "../../../domain/Session/SessionBean";
import {SessionMentorBean} from "../../../domain/Session/SessionMentorBean";
import {
    IStudentChecklist,
    STUDENT_STATUS,
    StudentChecklistBean
} from "../../../domain/StudentChecklist/StudentChecklistBean";
import {StudentChecklistCollector} from "../../../domain/StudentChecklist/StudentChecklistCollector";
import {IMatchParam} from "../../../interfaces/MatchParam.interface";
import SessionService from "../../../services/Session/Session.service";
import StudentService from "../../../services/Student/Student.service";
import {ISessionFullCard} from "./components/SessionFullCard/SessionFullCard";
import SessionFullCard from "./components/SessionFullCard/SessionFullCard";
import { default as SimpleFullCard, ISimpleFullCard} from "./components/SimpleFullCard/SimpleFullCard";
import StudentAddModal, {IStudentModal} from "./components/StudentAddModal/StudentAddModal";
import StudentChecklistBoard, {
ACTION,
IStudentChecklistBoard
} from "./components/StudentChecklistBoard/StudentChecklistBoard";
import {
    default as StudentCheckModal,
    IStudentCheckModal,
    StudentCheckModalScreens
} from "./components/StudentCheckModal/StudentCheckModal";
import {IStudentChecklistCard} from "./components/StudentFullCard/StudentFullCard";
import './SessionsMentor.scss';

interface IPropsSessionsMentor {
    match: IMatchParam;
}

interface IStateSessionsMentor {
    board: IStudentChecklistBoard;
    fullCardSession: ISessionFullCard;
    fullCardSimple: ISimpleFullCard;
    isEmpty: boolean;
    loading: boolean;
    searchValue: string;
    modal: boolean;
    modalAdd: IStudentModal;
    modalCheck: IStudentCheckModal;
}

const MESSAGE_ADD_STUDENT = "¿Estás seguro que deseas agregar a este alumno?";
const MESSAGE_REPEAT_STUDENT = "Este alumno ya se encuentra inscrito en la sesión";

class SessionsMentor extends React.Component<IPropsSessionsMentor, IStateSessionsMentor> {
    private sessionId: string;
    private mentorId: string;
    private sessionService = new SessionService();
    private studentsService = new StudentService();
    private sessionMentor: SessionMentorBean;
    private studentChecklistCollector: StudentChecklistCollector;

    constructor(props: any) {
        super(props);
        this.state = {
            board: {
                addEnabled: false,
                attendedButton: true,
                noAttendedButton: true,
                studentList: []
            },
            fullCardSession: {
                title: '',
                type: ''
            },
            fullCardSimple: {
                description: '',
                subtitle: '',
                title: ''
            },
            isEmpty: false,
            loading: true,
            modal: false,
            modalAdd: this.cleanAddModal(),
            modalCheck: this.cleanCheckModal(''),
            searchValue: '',
        };
        this.mentorId = this.props.match.params.id;
        this.sessionId = this.props.match.params.session || '';
        this.onSearch = this.onSearch.bind(this);
        this.searchStudent = this.searchStudent.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.requesAttended = this.requesAttended.bind(this);
        this.requestNoAttended = this.requestNoAttended.bind(this);
        this.onConfirmCheck = this.onConfirmCheck.bind(this);
        this.showModalNoAttended = this.showModalNoAttended.bind(this);
        this.showModalAttended = this.showModalAttended.bind(this);
    }

    public componentDidMount() {
        this.setState({
            loading: true
        }, () => {
            Promise.all([
                this.sessionService.getSessionMentor(this.sessionId, this.mentorId),
                this.studentsService.studentsFromSession(this.sessionId, this.mentorId)
            ]).then((values: any[]) => {
                this.sessionMentor = new SessionMentorBean(values[0]);
                this.studentChecklistCollector = new StudentChecklistCollector(values[1]);
                const sessions = this.studentChecklistCollector.sessions;
                const newState = {
                    board: this.getBoard(sessions),
                    fullCardSession: this.getFullCardSession(),
                    fullCardSimple: this.getFullCardSimple(),
                    isEmpty: sessions.length === 0,
                };
                this.setState({
                    loading: false,
                    ...newState
                });
            }, () => {
                this.setState({
                    loading: false
                })
            });
        });
    }

    public render() {
        return <Layout title={"Tutores"}>
            <MentorModalBase show={this.state.modal} onCloseModal={this.closeModal}>
                {!!this.state.modalAdd.user?
                    <StudentAddModal
                        options={this.state.modalAdd}
                        confirm={this.addStudent}/> : null}
                {!!this.state.modalCheck.screen ?
                    <StudentCheckModal
                        options={this.state.modalCheck}
                        confirm={this.onConfirmCheck}/> : null}
            </MentorModalBase>
            <div className="SessionsMentor u-LayoutMentorMargin">
                {this.sessionMentor &&
                <div className={"SessionsMentor_navigation"}>
                    <Text3>Tus sesiones >&nbsp;</Text3>
                    <Text3>{(this.sessionMentor? '': '')} {this.sessionMentor.getDate(new MomentDateParser())} >&nbsp;</Text3>
                    <Text3>Sesión en curso</Text3>
                </div>}
                {this.state.loading && !this.state.isEmpty &&
                    <Loader top={10} height={50}/>}
                {!this.state.loading &&
                    <React.Fragment>
                        <SessionFullCard session={this.state.fullCardSession}/>
                        <SimpleFullCard card={this.state.fullCardSimple}>
                            <StudentChecklistBoard
                                board={this.state.board}
                                onSearch={this.onSearch}
                                requesAttended={this.showModalAttended}
                                requestNoAttended={this.showModalNoAttended}
                                searchValue={this.state.searchValue}
                                isEmpty={this.state.isEmpty}
                            />
                        </SimpleFullCard>
                    </React.Fragment>}
            </div>
        </Layout>
    }

    private closeModal(force?: boolean) {
        if ((!this.state.modalAdd.loading && !this.state.modalCheck.loading) || !!force) {
            this.setState({
                modal: false,
                modalAdd: this.cleanAddModal(),
                modalCheck: this.cleanCheckModal('')
            })
        }
    }

    private showModalAttended() {
        this.setState({
            modal: true,
            modalAdd: this.cleanAddModal(),
            modalCheck: this.cleanCheckModal(StudentCheckModalScreens.ATTENDED)
        })
    }

    private showModalNoAttended() {
        this.setState({
            modal: true,
            modalAdd: this.cleanAddModal(),
            modalCheck: this.cleanCheckModal(StudentCheckModalScreens.NO_ATTENDED)
        })
    }


    private onConfirmCheck(screen: string) {
        if (screen === StudentCheckModalScreens.ATTENDED) {
            this.requesAttended()
        } else if (screen === StudentCheckModalScreens.NO_ATTENDED) {
            this.requestNoAttended()
        }
    }

    private requesAttended() {
        const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(".StudentFullCard_checkbox input[type=checkbox]:checked");
        const ids = Array.from(checkboxes).map(input => input.value);
        const filteredIds = ids.filter((id: string) => {
            return !!this.studentChecklistCollector.getStudentById(id);
        });
        if (filteredIds.length > 0) {
            const loadingOptions = {...this.state.modalCheck, loading: true};
            this.setState({
                modalCheck: loadingOptions
            }, () => {
                this.sessionService.markAsAttended(this.sessionId, filteredIds, true, this.mentorId)
                    .then(() => {
                        // mostrar modal exito
                        // actualizar estado de estudiantes
                        filteredIds.forEach((id: string) => {
                            this.studentChecklistCollector.markAsAttendedTo(id);
                            this.sessionMentor.setAsAttended();
                            const options = {loading: false, screen: StudentCheckModalScreens.SUCCESS};
                            this.setState({
                                board: this.getBoard(),
                                modalCheck: options
                            })
                        })
                    })
                    .catch(() => {
                        // mostrar modal error
                    })
            })
        } else {
            // mostrar modal exito
        }
    }

    private requestNoAttended() {
        const loadingOptions = {...this.state.modalCheck, loading: true};
        this.setState({
            modalCheck: loadingOptions
        }, () => {
            this.sessionService.markAsNoAttended(this.sessionId, this.mentorId).then(() => {
                this.sessionMentor.setAsNoAttended();
                const options = {loading: false, screen: StudentCheckModalScreens.SUCCESS};
                this.setState({
                    board: this.getBoard(),
                    modalCheck: options
                })
            })
            .catch(() => {
                // mostrar modal error
            });
        });
    }

    private searchStudent(action: string) {
        if (action === ACTION.SEARCH) {
            const sessions  = this.studentChecklistCollector.filterStudents(this.state.searchValue);
            this.setState({
                board: this.getBoard(sessions)
            })
        } else if (action === ACTION.ADD ) {
            if (!!this.state.searchValue) {
                const studentCode = this.state.searchValue;
                const student = this.studentChecklistCollector.getStudent(studentCode);
                if (!student) {
                    this.studentsService.searchStudentFromSession(this.sessionId, studentCode, this.mentorId)
                        .then((response: IStudentChecklist) => {
                            // exito: ocultar loading state
                            // exito: mostrar modal con datos de estudiante
                            this.setState({
                                modal: true,
                                modalAdd: {
                                    loading: false,
                                    message: MESSAGE_ADD_STUDENT,
                                    user: response
                                }
                            });
                        })
                        .catch(() => {
                            // error: ocultar loading state
                            // error: mostrar error en caja de texto
                        })
                } else {
                    this.setState({
                        modal: true,
                        modalAdd: {
                            loading: false,
                            message: MESSAGE_REPEAT_STUDENT,
                            user: student.getContract
                        }
                    });
                }
            }
        }
    }

    private addStudent(user: IStudentChecklist) {
        const student = this.studentChecklistCollector.getStudent(user.student.code);
        if (!student) {
            const idStudent = user.student.id ? user.student.id : '';
            const modalAdd = {...this.state.modalAdd, loading: true};
            this.setState({ modalAdd });
            this.studentsService.addStudentToSession(this.sessionId, idStudent, this.mentorId)
                .then((response: {id: string}) => {
                    user.id = response.id;
                    user.status = STUDENT_STATUS.SCHEDULED;
                    const newStudent = new StudentChecklistBean(user);
                    this.studentChecklistCollector.addStudent(newStudent);
                    const sessions = this.studentChecklistCollector.sessions;
                    this.sessionMentor.incrementStudent();
                    this.setState({
                        board: this.getBoard(sessions),
                        fullCardSimple: this.getFullCardSimple(),
                        isEmpty: sessions.length === 0,
                        searchValue: ''
                    }, () => {
                        this.closeModal(true);
                    })
                })
                .catch(() => {
                    this.closeModal(true);
                })
        } else {
            this.closeModal(true);
        }
    }

    private onSearch(searchValue: string, action: string) {
        this.setState({
            searchValue
        }, () => {
            this.searchStudent(action);
        });
    }

    private getFullCardSession(): ISessionFullCard {
        const schedule = this.sessionMentor.getTime(new MomentDateParser());
        return {
            title: `${this.sessionMentor.getSessionType()} - ${schedule}`,
            type: this.sessionMentor.getStatus() === SESSION_LIFE.ACTIVE ? 'En curso' : 'Activa'
        };
    }

    private getBoard(sessions?: StudentChecklistBean[]): IStudentChecklistBoard {
        if (!sessions) {
            sessions = this.studentChecklistCollector.sessions;
        }
        return {
            addEnabled: this.sessionMentor.isPhysical(),
            attendedButton: this.studentChecklistCollector.isAllStudentsAttended || this.sessionMentor.isDisableAttended,
            noAttendedButton:this.studentChecklistCollector.atLeastOneAttended || this.sessionMentor.isDisableNoAttended,
            studentList: this.getStudentList(sessions)
        }
    }

    private getFullCardSimple(): ISimpleFullCard {
        return {
            description: this.sessionMentor.getLocation(),
            subtitle: this.sessionMentor.getAvailability(),
            title: this.sessionMentor.skillName,
        };
    }

    private getStudentList(sessions: StudentChecklistBean[]): IStudentChecklistCard[] {
        return sessions.map((item: StudentChecklistBean) => {
            return {
                checked: item.isChecked,
                code: item.student.user.code,
                disabled: item.isDisabled || this.sessionMentor.isDisabled,
                id: item.id,
                name: item.student.user.name,
                new: item.new,
                photo: item.student.user.photo
            }

        });
    }

    private cleanAddModal() {
        return {
            loading: false,
            message: '',
            show: false,
            user: null
        }
    }

    private cleanCheckModal(screen: string) {
        return {
            loading: false,
            screen
        }
    }
}

export default SessionsMentor;
