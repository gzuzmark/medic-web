import * as React from 'react';
import ContentModal from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import {default as TagService, ITags} from "../../../../../services/Tag/Tag.service";
import EmptyCard from "../EmptyCard/EmptyCard";
import StudentCommentModal, {
    ITagConfirm,
    ITagModalStudentChecklistBoard
} from "../StudentCommentModal/StudentCommentModal";
import StudentCommentModalHeader from "../StudentCommentModal/StudentCommentModalHeader";
import StudentFullCard, {IStudentChecklistCard, StudentFullCardHeader} from "../StudentFullCard/StudentFullCard";
import './StudentChecklistBoard.scss';

type fnSearch = (value: string, action: string) => void;
type fnClear = (action: string) => void;

export interface IStudentChecklistBoard {
    addEnabled: boolean;
    attendedButton: boolean;
    noAttendedButton: boolean;
    noResultsAdd: boolean;
    studentList: IStudentChecklistCard[];
}

interface IPropsStudentChecklistBoard {
    board: IStudentChecklistBoard;
    tags: ITags[];
    isEmpty: boolean;
    onSearch: fnSearch;
    searchValue: string;
    sessionId: string;
    studentCommented(request: ITagConfirm): void;
    requestAttended() :void;
    requestNoAttended() :void;
}

export interface IStateInput {
    dirty: boolean;
    error: boolean;
    loading: boolean;
    message: string;
}

interface ILoadingStudentChecklistBoard {
    tag: boolean;
}

interface IModalStudentChecklistBoard {
    tag: boolean;
    success: boolean;
}

export interface IStatesStudentChecklistBoard {
    addFocus: boolean;
    activeSearch: boolean;
    loading: ILoadingStudentChecklistBoard;
    modal: IModalStudentChecklistBoard;
    searchFocus: boolean;
    tagModal: ITagModalStudentChecklistBoard;
}

export const ACTION = {
    ADD: 'add',
    SEARCH: 'search'
};

const onClick = (clear: fnClear, action: string) => {
    return (event: any) => {
        clear(action);
    }
};

const onChange = (search: fnSearch, action: string) => {
    return (event: any) => {
        search(event.target.value, action);
    }
};

const onSubmit = (search: fnSearch, action: string) => {
    return (event: any) => {
        if (event.key === 'Enter') {
            search(event.target.value, action);
        }
    }
};

const onClickIcon = (search: fnSearch, action: string) => {
    return (value: string) => {
        search(value, action);
    }
};

class StudentChecklistBoard extends  React.Component<IPropsStudentChecklistBoard, IStatesStudentChecklistBoard> {
    public state: IStatesStudentChecklistBoard;
    private counter = 0;
    private tagService = new TagService();
    constructor(props: IPropsStudentChecklistBoard) {
        super(props);
        this.getInputAdd = this.getInputAdd.bind(this);
        this.getInputSearch = this.getInputSearch.bind(this);
        this.activeInput = this.activeInput.bind(this);
        this.onSaveComment = this.onSaveComment.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            activeSearch: true,
            addFocus: false,
            loading: {
                tag: false
            },
            modal: {
                success: false,
                tag: false
            },
            searchFocus: true,
            tagModal: {}
        }
    }

    public render() {
        const addSearch = this.getInputAdd();
        const inputSearch = this.getInputSearch();
        let propsNoAttendedButton = {};
        let propsAttendedButton = {};
        if (this.props.board.noAttendedButton || this.props.isEmpty) {
            propsNoAttendedButton = {
                disabled: "true"
            };
        }
        if (this.props.board.attendedButton || this.props.isEmpty) {
            propsAttendedButton = {
                disabled: "true"
            };
        }
        const students = (
            <React.Fragment>
                {this.state.tagModal.student &&
                <MentorModalBase
                    show={this.state.modal.tag || this.state.modal.success}
                    onCloseModal={this.closeModal}
                    hideClose={this.state.modal.success}
                    width={528}
                    header={!this.state.modal.success ? <StudentCommentModalHeader modal={this.state.tagModal}/> : null}>
                    {this.state.modal.tag &&
                        <StudentCommentModal
                            loading={this.state.loading.tag}
                            modal={this.state.tagModal}
                            confirm={this.onSaveComment}
                            cancel={this.closeModal}/>}
                    {this.state.modal.success &&
                        <ContentModal.Success description={"Comentario Guardado"} />}
                </MentorModalBase>}
                {this.props.isEmpty ?
                    <EmptyCard addEnabled={this.props.board.addEnabled} /> :
                    <div className={`StudentChecklistBoard_students ${this.props.board.studentList.length > 0 ? 'StudentChecklistBoard--border' : ''} `}>
                        <StudentFullCardHeader />
                        {this.props.board.studentList.map((student: IStudentChecklistCard, index: number) => {
                            const order = student.new ? ++this.counter : 0;
                            const showTagModal = this.showTagModal(student);
                            return (
                                <StudentFullCard
                                    showTagModal={showTagModal}
                                    student={student}
                                    key={`${index}`}
                                    styles={{'order': -1 * order}}/>
                            )
                        })}
                    </div>
                }
                <div className={'StudentChecklistBoard_buttons'}>
                    <button
                        className={'u-Button u-Button--white StudentChecklistBoard_button StudentChecklistBoard_button--no-attended'}
                        {...propsNoAttendedButton}
                        onClick={this.props.requestNoAttended}>Nadie se presentó</button>
                    <button
                        {...propsAttendedButton}
                        className={'u-Button StudentChecklistBoard_button'}
                        onClick={this.props.requestAttended}>Guardar</button>
                </div>
            </React.Fragment>
        )

        const searchError = this.props.board.studentList.length === 0 &&
                            this.state.activeSearch &&
                            this.props.searchValue !== '' ?
                            'No se encontró ningún alumno con ese código' : '';
        const addError = !this.state.activeSearch &&
                         this.props.searchValue !== '' &&
                         this.props.board.noResultsAdd ?
                         'No se ha encontrado a ningún alumno con ese código':'';
        const { onClickAddIcon, ...addSearchAttr } = addSearch;
        return (
            <div className={`StudentChecklistBoard`}>
                <div className={"StudentChecklistBoard_inputs-container"}>
                    <MentorInput
                        active={this.state.activeSearch}
                        error={searchError}
                        icon={"search"}
                        attrs={inputSearch}
                        style={{minWidth: `${this.state.activeSearch?'498px': '0px'}`, justifyContent: 'flex-start'}}
                        animation={{
                            enable: true,
                            text: "Buscar alumno"
                        }}/>
                    <MentorInput
                        active={!this.state.activeSearch}
                        enable={this.props.board.addEnabled}
                        error={addError}
                        icon={"add-circle"}
                        onClickIcon={onClickAddIcon}
                        attrs={addSearchAttr}
                        style={{minWidth: `${!this.state.activeSearch?'498px': '0px'}`, justifyContent: 'flex-end'}}
                        animation={{
                            enable: true,
                            text: "Agregar alumnos"
                        }}/>
                </div>
                <div className={"StudentChecklistBoard_students-container"}>
                    {students}
                </div>
            </div>
        )
    }

    private onSaveComment(request: ITagConfirm) {
        const loading = {...this.state.loading, tag: true};
        this.setState({loading}, () => {
            const {id, ...body} = request;
            this.tagService.addComment(this.props.sessionId, id, body).then(() => {
                this.setState({
                    loading: {...this.state.loading, tag: false},
                    modal: {...this.state.modal, tag: false, success: true}
                }, () => {
                    this.props.studentCommented(request);
                    setTimeout(() => {
                        this.setState({
                            modal: {...this.state.modal, success: false}
                        });
                    }, 1500);
                });
            }).catch(() => {
                this.setState({
                    loading: {...this.state.loading, tag: false},
                })
            })

        });
    }

    private showTagModal(student: IStudentChecklistCard) {
        return () => {
            if (this.state.loading.tag || this.state.modal.tag) {
                return
            }
            const modal = {...this.state.modal};
            const tagModal = {...this.state.tagModal};
            tagModal.student = student;
            modal.tag = true;
            if (student.commented) {
                tagModal.tags = student.tags.map((tag: string) => {
                    return {id: '', name: tag}
                });
                tagModal.comment = student.mentorComment;
                this.setState({tagModal, modal});
            } else {
                tagModal.tags = [...this.props.tags];
                tagModal.comment = '';
                this.setState({tagModal, modal});
            }
        }
    }

    private activeInput(key: string) {
        if (key === ACTION.SEARCH && !this.state.activeSearch) {
            this.props.onSearch('', '');
            this.setState({
                activeSearch: true
            })
        } else if (key === ACTION.ADD && this.state.activeSearch) {
            this.props.onSearch('', '');
            this.setState({
                activeSearch: false
            })
        }
    }

    private getInputSearch() {
        const onClickSearch = onClick(this.activeInput, ACTION.SEARCH);
        const onChangeSearch = onChange(this.props.onSearch, ACTION.SEARCH);
        return {
            autoFocus: false,
            name: "txtSearchStudent",
            onChange: onChangeSearch,
            onClick: onClickSearch,
            value: this.props.searchValue
        };
    }

    private closeModal() {
        if (!this.state.loading.tag) {
            const modal = {tag: false, success: false};
            this.setState({modal});
        }
    }

    private getInputAdd() {
        const onClickAdd = onClick(this.activeInput, ACTION.ADD);
        const onChangeAdd = onChange(this.props.onSearch, '');
        const onSubmitAdd = onSubmit(this.props.onSearch, ACTION.ADD);
        const onClickAddIcon = onClickIcon(this.props.onSearch, ACTION.ADD);
        return {
            autoFocus: false,
            name: "txtAddStudent",
            onChange: onChangeAdd,
            onClick: onClickAdd,
            onClickAddIcon,
            onKeyPress: onSubmitAdd,
            placeholder: "Ingresa el código del alumno",
            value: this.props.searchValue
        }
    }
}

export default StudentChecklistBoard;
