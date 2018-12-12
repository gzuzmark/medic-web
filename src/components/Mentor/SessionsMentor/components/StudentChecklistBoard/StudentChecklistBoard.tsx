import * as React from 'react';
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import EmptyCard from "../EmptyCard/EmptyCard";
import StudentFullCard, {IStudentChecklistCard} from "../StudentFullCard/StudentFullCard";
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
    isEmpty: boolean;
    onSearch: fnSearch;
    searchValue: string;
    requesAttended() :void;
    requestNoAttended() :void;
}

export interface IStateInput {
    dirty: boolean;
    error: boolean;
    loading: boolean;
    message: string;
}

export interface IStatesStudentChecklistBoard {
    addFocus: boolean;
    activeSearch: boolean;
    searchFocus: boolean;
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
    constructor(props: IPropsStudentChecklistBoard) {
        super(props);
        this.getInputAdd = this.getInputAdd.bind(this);
        this.getInputSearch = this.getInputSearch.bind(this);
        this.activeInput = this.activeInput.bind(this);
        this.state = {
            activeSearch: true,
            addFocus: false,
            searchFocus: true
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
                {this.props.isEmpty ?
                    <EmptyCard addEnabled={this.props.board.addEnabled} /> :
                    <div className={`StudentChecklistBoard_students ${this.props.board.studentList.length > 0 ? 'StudentChecklistBoard--border' : ''} `}>
                        {this.props.board.studentList.map((student: IStudentChecklistCard, index: number) => {
                            let order = 0;
                            if (student.new) {
                                order = ++this.counter;
                            }
                            return (
                                <StudentFullCard student={student} key={`${index}`} styles={{'order': -1 * order}}/>
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
                        onClick={this.props.requesAttended}>Guardar</button>
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
                        attrs={addSearch}
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
            onClickIcon: onClickAddIcon,
            onKeyPress: onSubmitAdd,
            placeholder: "Ingresa el código del alumno",
            value: this.props.searchValue
        }
    }
}

export default StudentChecklistBoard;
