import * as React from 'react';
import MentorModalBase from "../../../common/ConsoleModal/MentorModalBase";
import { Title2 } from '../../../common/ConsoleText';
import Icon from "../../../common/Icon/Icon";
import Layout from "../../../common/Layout/Layout";
import Loader from "../../../common/Loader/Loader";
import {MomentDateParser} from "../../../domain/DateManager/MomentDateParser";
import {SESSION_LIFE, SESSION_STATUS} from "../../../domain/Session/SessionBean";
import {SessionMentorBean} from "../../../domain/Session/SessionMentorBean";
import {IStudentChecklist, StudentChecklistBean} from "../../../domain/StudentChecklist/StudentChecklistBean";
import {StudentChecklistCollector} from "../../../domain/StudentChecklist/StudentChecklistCollector";
import {IMatchParam} from "../../../interfaces/MatchParam.interface";
import SessionService from "../../../services/Session/Session.service";
import StudentService from "../../../services/Student/Student.service";
import {ISessionFullCard} from "./components/SessionFullCard/SessionFullCard";
import SessionFullCard from "./components/SessionFullCard/SessionFullCard";
import { default as SimpleFullCard, ISimpleFullCard} from "./components/SimpleFullCard/SimpleFullCard";
import StudentChecklistBoard, {ACTION} from "./components/StudentChecklistBoard/StudentChecklistBoard";
import {IStudentChecklistCard} from "./components/StudentFullCard/StudentFullCard";
import StudentModalCard, {IStudentModal} from "./components/StudentModalCard/StudentModalCard";
import './SessionsMentor.scss';

interface IPropsSessionsMentor {
    match: IMatchParam;
}

interface IStateSessionsMentor {
    addEnabled: boolean;
    fullCardSession: ISessionFullCard;
    fullCardSimple: ISimpleFullCard;
    isEmpty: boolean;
    loading: boolean;
    searchValue: string;
    modal: IStudentModal;
    studentList: IStudentChecklistCard[];
    noAttendedButton: boolean;
    attendedButton: boolean;
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
            addEnabled: false,
            attendedButton: true,
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
            modal: this.cleanModal(),
            noAttendedButton: true,
            searchValue: '',
            studentList: [],
        };
        this.mentorId = this.props.match.params.id;
        this.sessionId = this.props.match.params.session || '';
        this.onSearch = this.onSearch.bind(this);
        this.searchStudent = this.searchStudent.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.clodeModal = this.clodeModal.bind(this);
        this.requestSave = this.requestSave.bind(this);
        this.requestNoAttended = this.requestNoAttended.bind(this);
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
                let addEnabled = false;
                if (this.sessionMentor.session.location) {
                    addEnabled = this.sessionMentor.session.location.type === 'PHYSICAL';
                }
                const newState = {
                    addEnabled,
                    attendedButton: this.studentChecklistCollector.isAllStudentsAttended || this.sessionMentor.isNoAttended,
                    fullCardSession: this.getFullCardSession(),
                    fullCardSimple: this.getFullCardSimple(),
                    isEmpty: sessions.length === 0,
                    noAttendedButton: this.studentChecklistCollector.atLeastOneAttended || this.sessionMentor.isNoAttended,
                    studentList: this.getStudentList(sessions)
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
            <MentorModalBase show={this.state.modal.show && !!this.state.modal.user} onCloseModal={this.clodeModal}>
                {!!this.state.modal.user ?
                    <StudentModalCard
                        options={this.state.modal}
                        confirm={this.addStudent}/> : null}
            </MentorModalBase>
            <div className="SessionsMentor u-LayoutMentorMargin">
                <div className={"StudentChecklistBoard"}>
                    <Icon name={"calendar"}/>
                    <Title2>Tus sesiones</Title2>
                </div>
                {this.state.loading && !this.state.isEmpty &&
                    <Loader top={10} height={50}/>}
                {!this.state.loading &&
                    <React.Fragment>
                        <SessionFullCard session={this.state.fullCardSession}/>
                        <SimpleFullCard card={this.state.fullCardSimple}>
                            <StudentChecklistBoard
                                attendedButton={this.state.attendedButton}
                                noAttendedButton={this.state.noAttendedButton}
                                addEnabled={this.state.addEnabled}
                                students={this.state.studentList}
                                onSearch={this.onSearch}
                                requestSave={this.requestSave}
                                requestNoAttended={this.requestNoAttended}
                                searchValue={this.state.searchValue}
                                isEmpty={this.state.isEmpty}
                            />
                        </SimpleFullCard>
                    </React.Fragment>}
            </div>
        </Layout>
    }

    private clodeModal() {
        if (!this.state.modal.loading) {
            this.setState({
                modal: {
                    loading: false,
                    message: '',
                    show: false
                }
            })
        }
    }

    private requestSave() {
        // mostrar modal confirmar
        const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(".StudentFullCard_checkbox input[type=checkbox]:checked");
        const ids = Array.from(checkboxes).map(input => input.value);
        const filteredIds = ids.filter((id: string) => {
            return !!this.studentChecklistCollector.getStudentById(id);
        });
        if (filteredIds.length > 0) {
            this.sessionService.markAsAttended(this.sessionId, filteredIds, true, this.mentorId)
                .then(() => {
                    // mostrar modal exito
                    // actualizar estado de estudiantes
                    filteredIds.forEach((id: string) => {
                        this.studentChecklistCollector.markAsAttendedTo(id);
                        this.sessionMentor.setAsAttended();
                        const sessions = this.studentChecklistCollector.sessions;
                        this.setState({
                            attendedButton: this.studentChecklistCollector.isAllStudentsAttended || this.sessionMentor.isNoAttended,
                            noAttendedButton: this.studentChecklistCollector.atLeastOneAttended || this.sessionMentor.isNoAttended,
                            studentList: this.getStudentList(sessions)
                        })
                    })
                })
                .catch(() => {
                    // mostrar modal error
                })
        } else {
            // mostrar modal exito
        }
    }

    private requestNoAttended() {
        this.sessionMentor.setAsNoAttended();
        this.sessionService.markAsNoAttended(this.sessionId, this.mentorId).then(() => {
            this.setState({
                attendedButton: this.studentChecklistCollector.isAllStudentsAttended || this.sessionMentor.isNoAttended,
                noAttendedButton: this.studentChecklistCollector.atLeastOneAttended || this.sessionMentor.isDisableNoAttended,
                studentList: this.getStudentList(this.studentChecklistCollector.sessions)
            })
        });
    }

    private searchStudent(action: string) {
        if (action === ACTION.SEARCH) {
            const sessions  = this.studentChecklistCollector.filterStudents(this.state.searchValue);
            this.setState({
                studentList: this.getStudentList(sessions)
            })
        } else if (action === ACTION.ADD ) {
            if (!!this.state.searchValue) {
                const studentCode = this.state.searchValue;
                const student = this.studentChecklistCollector.getStudent(studentCode);
                if (!student) {
                    // mostrar loading state
                    this.studentsService.searchStudentFromSession(this.sessionId, studentCode, this.mentorId)
                        .then((response: IStudentChecklist) => {
                            // exito: ocultar loading state
                            // exito: mostrar modal con datos de estudiante
                            this.setState({
                                modal: {
                                    loading: false,
                                    message: MESSAGE_ADD_STUDENT,
                                    show: true,
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
                        modal: {
                            loading: false,
                            message: MESSAGE_REPEAT_STUDENT,
                            show: true,
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
            const modal = {...this.state.modal, loading: true};
            this.setState({ modal });
            this.studentsService.addStudentToSession(this.sessionId, idStudent, this.mentorId)
                .then((response: {id: string}) => {
                    user.id = response.id;
                    user.status = SESSION_STATUS.SCHEDULED;
                    const newStudent = new StudentChecklistBean(user);
                    this.studentChecklistCollector.addStudent(newStudent);
                    const sessions = this.studentChecklistCollector.sessions;
                    this.sessionMentor.incrementStudent();
                    this.setState({
                        fullCardSimple: this.getFullCardSimple(),
                        isEmpty: sessions.length === 0,
                        modal: this.cleanModal(),
                        studentList: this.getStudentList(sessions)
                    })
                })
                .catch(() => {
                    this.setState({
                        modal: this.cleanModal()
                    })
                })
        } else {
            this.setState({
                modal:this.cleanModal()
            })
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
            type: this.sessionMentor.getStatus() === SESSION_LIFE.ACTIVE ? 'En curso' : 'No en curso'
        };
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

    private cleanModal() {
        return {
            loading: false,
            message: '',
            show: false
        }
    }
}

export default SessionsMentor;
