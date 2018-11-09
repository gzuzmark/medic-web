import * as React from 'react';
import { Title2 } from '../../../common/ConsoleText';
import Icon from "../../../common/Icon/Icon";
import Layout from "../../../common/Layout/Layout";
import Loader from "../../../common/Loader/Loader";
import {MomentDateParser} from "../../../domain/DateManager/MomentDateParser";
import {SESSION_LIFE} from "../../../domain/Session/SessionBean";
import {SessionMentorBean} from "../../../domain/Session/SessionMentorBean";
import {StudentChecklistBean} from "../../../domain/StudentChecklist/StudentChecklistBean";
import {StudentChecklistCollector} from "../../../domain/StudentChecklist/StudentChecklistCollector";
import {IMatchParam} from "../../../interfaces/MatchParam.interface";
import SessionService from "../../../services/Session/Session.service";
import StudentService from "../../../services/Student/Student.service";
import {ISessionFullCard} from "./components/SessionFullCard/SessionFullCard";
import SessionFullCard from "./components/SessionFullCard/SessionFullCard";
import { default as SimpleFullCard, ISimpleFullCard} from "./components/SimpleFullCard/SimpleFullCard";
import StudentChecklistBoard, {ACTION} from "./components/StudentChecklistBoard/StudentChecklistBoard";
import {IStudentChecklistCard} from "./components/StudentFullCard/StudentFullCard";
import './SessionsMentor.scss';

interface IPropsSessionsMentor {
    match: IMatchParam;
}

interface IStateSessionsMentor {
    fullCardSession: ISessionFullCard;
    fullCardSimple: ISimpleFullCard;
    loading: boolean;
    searchValue: string;
    studentList: IStudentChecklistCard[];
}

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
            fullCardSession: {
                title: '',
                type: ''
            },
            fullCardSimple: {
                description: '',
                subtitle: '',
                title: ''
            },
            loading: true,
            searchValue: '',
            studentList: []
        };
        this.mentorId = this.props.match.params.id;
        this.sessionId = this.props.match.params.session;
        this.onSearch = this.onSearch.bind(this);
        this.searchStudent = this.searchStudent.bind(this);
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
                    fullCardSession: this.getFullCardSession(),
                    fullCardSimple: this.getFullCardSimple(),
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
            <div className="SessionsMentor u-LayoutMentorMargin">
                <div className={"StudentChecklistBoard"}>
                    <Icon name={"calendar"}/>
                    <Title2>Tus sesiones</Title2>
                </div>
                {
                    this.state.loading ?
                    <Loader top={10} height={50}/> :
                    <React.Fragment>
                        <SessionFullCard session={this.state.fullCardSession}/>
                        <SimpleFullCard card={this.state.fullCardSimple}>
                            <StudentChecklistBoard
                                students={this.state.studentList}
                                onSearch={this.onSearch}
                                searchValue={this.state.searchValue}
                                />
                        </SimpleFullCard>
                    </React.Fragment>
                }
            </div>
        </Layout>
    }

    private searchStudent(action: string) {
        // tslint:disable:no-console
        console.log(this.state.searchValue, action);
        if (action === ACTION.SEARCH) {
            const sessions  = this.studentChecklistCollector.filterStudents(this.state.searchValue);
            this.setState({
                studentList: this.getStudentList(sessions)
            })
        } else if (action === ACTION.ADD ) {
            // validar que no esté vacío
            // if (!!searchValue)
            // validar si código existe en estudiantes actuales
            // const student = this.studentChecklistCollector.getStudent(searchValue);
            // if (student)
            //   mostrar modal con alumno
            // else
            //   mostrar loading state
            //   buscar alumno
            //   exito: ocultar loading state
            //   exito: mostrar modal con datos de estudiante
            //   error: ocultar loading state
            //   error: mostrar error en caja de texto
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
                id: item.id,
                name: item.student.user.name,
                new: item.new,
                photo: item.student.user.photo
            }

        });
    }
}

export default SessionsMentor;
