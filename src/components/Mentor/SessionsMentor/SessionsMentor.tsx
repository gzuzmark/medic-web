import * as React from 'react';
import {Link} from "react-router-dom";
import noAttened from '../../../assets/images/student_check_modal/no_attended.png';
import ContentModal from "../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../common/ConsoleModal/MentorModalBase";
import { Text3 } from '../../../common/ConsoleText';
import Layout from "../../../common/Layout/Layout";
import LoaderFullScreen from "../../../common/Loader/LoaderFullsScreen";
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
import TagService, {ITags} from "../../../services/Tag/Tag.service";
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
import {ITagConfirm} from "./components/StudentCommentModal/StudentCommentModal";
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
    modalError: boolean;
    modalAdd: IStudentModal;
    modalCheck: IStudentCheckModal;
    tags: ITags[];
}

const MESSAGE_ADD_STUDENT = "¿Estás seguro que deseas agregar a este alumno?";
const MESSAGE_REPEAT_STUDENT = "Este alumno ya se encuentra inscrito en la sesión";

class SessionsMentor extends React.Component<IPropsSessionsMentor, IStateSessionsMentor> {
    private sessionId: string;
    private mentorId: string;
    private sessionService = new SessionService();
    private studentsService = new StudentService();
    private tagService = new TagService();
    private sessionMentor: SessionMentorBean;
    private studentChecklistCollector: StudentChecklistCollector;
    private mdp = new MomentDateParser();
    constructor(props: any) {
        super(props);
        this.state = {
            board: {
                addEnabled: false,
                attendedButton: true,
                noAttendedButton: true,
                noResultsAdd: false,
                studentList: []
            },
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
            isEmpty: false,
            loading: true,
            modal: false,
            modalAdd: this.cleanAddModal(),
            modalCheck: this.cleanCheckModal(''),
            modalError: true,
            searchValue: '',
            tags: [],
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
        this.studentCommented = this.studentCommented.bind(this);
    }

    public componentDidMount() {
        this.setState({
            loading: true
        }, () => {
            Promise.all([
                this.sessionService.getSessionMentor(this.sessionId),
                this.studentsService.studentsFromSession(this.sessionId),
                this.tagService.list(),
            ]).then((values: any[]) => {
                this.sessionMentor = new SessionMentorBean(values[0]);
                this.studentChecklistCollector = new StudentChecklistCollector(values[1]);
                const sessions = this.studentChecklistCollector.sessions;
                this.setState({tags: values[2]}, () => {
                    const newState = {
                        board: this.getBoard(sessions),
                        fullCardSession: this.getFullCardSession(),
                        fullCardSimple: this.getFullCardSimple(),
                        isEmpty: sessions.length === 0
                    };
                    this.setState({
                        loading: false,
                        ...newState
                    });
                })
            }, () => {
                this.setState({
                    loading: false
                })
            });
        });
    }

    public render() {
        const navBarText = this.sessionMentor ?
            `${this.mdp.isDateToday(this.sessionMentor.session.from)? 'hoy ': ''}${this.sessionMentor.getDate(this.mdp)}` : '';
        return <Layout title={"Tutores"}>
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
                        description={"Este alumno aún no ha descargado la aplicación. Podrás agregarlo una vez que esta sesión haya iniciado."}
                        title={"Lo sentimos, no se pudo agregar al alumno."}/> : null}
            </MentorModalBase>
            <div className="SessionsMentor u-LayoutMentorMargin">
                {this.sessionMentor &&
                <div className={"SessionsMentor_navigation"}>
                    <Link to={'/mentor'}><Text3>Tus sesiones >&nbsp;</Text3></Link>
                    <Text3>
                        {navBarText.charAt(0).toUpperCase()}{navBarText.slice(1)} >&nbsp;</Text3>
                    <Text3>{`Sesión ${this.state.fullCardSession.type.toLowerCase()}`}</Text3>
                </div>}
                {this.state.loading && !this.state.isEmpty &&
                    <LoaderFullScreen text={"Cargando..."} styleLoaderContainer={{marginTop: 300}} />}
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
                                tags={this.state.tags}
                                sessionId={this.sessionId}
                                studentCommented={this.studentCommented}
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
                modalCheck: this.cleanCheckModal(''),
                modalError: false
            })
        }
    }

    private closeModalError() {
        this.setState({
            searchValue: ''
        }, () => {
            this.closeModal(true);
        })
    }

    private showModalAttended() {
        this.setState({
            modal: true,
            modalAdd: this.cleanAddModal(),
            modalCheck: this.cleanCheckModal(StudentCheckModalScreens.ATTENDED),
            modalError: false
        })
    }

    private showModalNoAttended() {
        this.setState({
            modal: true,
            modalAdd: this.cleanAddModal(),
            modalCheck: this.cleanCheckModal(StudentCheckModalScreens.NO_ATTENDED),
            modalError: false
        })
    }

    private onConfirmCheck(screen: string) {
        if (screen === StudentCheckModalScreens.ATTENDED) {
            this.requestAttended()
        } else if (screen === StudentCheckModalScreens.NO_ATTENDED) {
            this.requestNoAttended()
        }
    }

    private requestAttended() {
        const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(".StudentFullCard_option--checkbox input[type=checkbox]:checked");
        const ids = Array.from(checkboxes).map(input => input.value);
        const filteredIds = ids.filter((id: string) => {
            return !!this.studentChecklistCollector.getStudentById(id);
        });
        if (filteredIds.length > 0) {
            const loadingOptions = {...this.state.modalCheck, loading: true};
            this.setState({
                modalCheck: loadingOptions
            }, () => {
                this.sessionService.markAsAttended(this.sessionId, filteredIds)
                    .then(() => {
                        filteredIds.forEach((id: string) => {
                            this.studentChecklistCollector.markAsAttendedTo(id);
                            this.sessionMentor.setAsAttended();
                            this.showSuccessModal();
                        })
                    })
                    .catch((error) => {
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
            this.sessionService.markAsNoAttended(this.sessionId).then(() => {
                this.sessionMentor.setAsNoAttended();
                this.showSuccessModal();
            })
            .catch(() => {
                // mostrar modal error
            });
        });
    }

    private showSuccessModal() {
        const options = {loading: false, screen: StudentCheckModalScreens.SUCCESS};
        const sessions  = this.studentChecklistCollector.filterStudents(this.state.searchValue);
        this.setState({
            board: this.getBoard(sessions),
            modalCheck: options
        }, () => {
            setTimeout(() => {
                this.closeModal(true);
            }, 1300)
        })
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
                    this.studentsService.searchStudentFromSession(this.sessionId, studentCode)
                        .then((response: IStudentChecklist) => {
                            if (response.enableToReserve) {
                                this.setState({
                                    modal: true,
                                    modalAdd: {
                                        loading: false,
                                        message: MESSAGE_ADD_STUDENT,
                                        user: response
                                    },
                                    modalError: false
                                });
                            } else {
                                this.setState({
                                    modal: true,
                                    modalError: true
                                })
                            }
                        })
                        .catch((error) => {
                            if (error.response.status === 404) {
                                const newStateBoard = {...this.state.board, noResultsAdd: true};
                                this.setState({
                                    board: newStateBoard
                                })
                            }
                        })
                } else {
                    this.setState({
                        modal: true,
                        modalAdd: {
                            loading: false,
                            message: MESSAGE_REPEAT_STUDENT,
                            user: student.getContract
                        },
                        modalError: false
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
            this.studentsService.addStudentToSession(this.sessionId, idStudent, this.mentorId, this.sessionMentor.locationType)
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

    private onSelect(id: string) {
        this.studentChecklistCollector.updateSelectionFor(id);
        const sessions  = this.studentChecklistCollector.filterStudents(this.state.searchValue);
        this.setState({
            board: this.getBoard(sessions)
        })
    }

    private onSearch(searchValue: string, action: string) {
        const newStateBoard = {...this.state.board};
        if (this.state.board.noResultsAdd) {
            newStateBoard.noResultsAdd = false;
            this.setState({
                board: newStateBoard
            })
        }
        this.setState({
            board: newStateBoard,
            searchValue
        }, () => {
            this.searchStudent(action);
        });
    }

    private getFullCardSession(): ISessionFullCard {
        const schedule = this.sessionMentor.getTime(new MomentDateParser());
        return {
            title: `${this.sessionMentor.getSessionType('Sesión')} - ${schedule}`,
            type: this.sessionMentor.getStatus() === SESSION_LIFE.ACTIVE ? 'En curso' : 'Activa'
        };
    }

    private getBoard(sessions?: StudentChecklistBean[]): IStudentChecklistBoard {
        if (!sessions) {
            sessions = this.studentChecklistCollector.sessions;
        }
        return {
            addEnabled: !this.sessionMentor.isNoAttended, // this.sessionMentor.isPhysical() &&
            attendedButton: this.studentChecklistCollector.isAllStudentsAttended || this.sessionMentor.isDisableAttended,
            noAttendedButton:this.studentChecklistCollector.atLeastOneAttended || this.sessionMentor.isDisableNoAttended,
            noResultsAdd: false,
            studentList: this.getStudentList(sessions)
        }
    }

    private getFullCardSimple(): ISimpleFullCard {
        return {
            description: this.sessionMentor.getLocation(),
            isLink: this.sessionMentor.isVirtual(),
            subtitle: this.sessionMentor.getAvailability(),
            title: this.sessionMentor.skillName,
        };
    }

    private getStudentList(sessions: StudentChecklistBean[]): IStudentChecklistCard[] {
        return sessions.map((checklist: StudentChecklistBean) => {
            const sessionIsEnabledForComment = !!this.sessionMentor.session.isEnabledForComment &&
                this.state.tags.length > 0 && !checklist.item.commented;
            const tags = checklist.item.tags || [];
            return {
                checked: checklist.isChecked,
                code: checklist.student.user.code,
                commented: !!checklist.item.commented,
                disabled: checklist.isDisabled || this.sessionMentor.isDisabled,
                id: checklist.id,
                isEnabledForComment: sessionIsEnabledForComment || (!!checklist.item.commented && tags.length > 0),
                lastname: checklist.student.user.lastname,
                mentorComment: checklist.item.mentorComment || '',
                name: `${checklist.student.user.name} ${checklist.student.user.lastname}`,
                new: checklist.new,
                photo: checklist.student.user.photo,
                studentId: checklist.student.id,
                tags
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

    private studentCommented(commented: ITagConfirm, ) {
        const {id, comment, tags} = commented;
        const selectedTags = tags.map((tagId) => {
            const selectedTag = this.state.tags.find((tag) => tag.id === tagId );
            return selectedTag ? selectedTag.name : '';
        });
        this.studentChecklistCollector.addStudentComment(id, selectedTags, comment);
        const sessions  = this.studentChecklistCollector.filterStudents(this.state.searchValue);
        this.setState({
            board: this.getBoard(sessions)
        })
    }
}

export default SessionsMentor;
