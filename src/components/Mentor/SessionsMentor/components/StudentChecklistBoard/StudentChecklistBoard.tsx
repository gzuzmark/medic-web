import * as React from 'react';
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import EmptyCard from "../EmptyCard/EmptyCard";
import StudentFullCard, {IStudentChecklistCard} from "../StudentFullCard/StudentFullCard";
import './StudentChecklistBoard.scss';

type fnSearch = (value: string, action: string) => void;

export interface IStudentChecklistBoard {
    addEnabled: boolean;
    attendedButton: boolean;
    noAttendedButton: boolean;
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

const onClick = (search: (key: string) => void, action: string) => {
    return (event: any) => {
        search(action);
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
        let students = <EmptyCard addEnabled={this.props.board.addEnabled} />;
        let propsNoAttendedButton = {};
        let propsAttendedButton = {};
        if (this.props.board.noAttendedButton) {
            propsNoAttendedButton = {
                disabled: "true"
            };
        }
        if (this.props.board.attendedButton) {
            propsAttendedButton = {
                disabled: "true"
            };
        }
        if (!this.props.isEmpty) {
            students = (
                <React.Fragment>
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
        }
        return (
            <div className={`StudentChecklistBoard`}>
                <div className={"StudentChecklistBoard_inputs-container"}>
                    <MentorInput
                        active={this.state.activeSearch}
                        icon={"search"}
                        input={inputSearch}
                        style={{flexBasis: '48%', justifyContent: 'flex-start'}}
                        animation={{
                            enable: true,
                            text: "Buscar alumno"
                        }}/>
                    <MentorInput
                        active={!this.state.activeSearch}
                        enable={this.props.board.addEnabled}
                        icon={"add-circle"}
                        input={addSearch}
                        style={{flexBasis: '48%', justifyContent: 'flex-end'}}
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
        return {
            autoFocus: false,
            name: "txtAddStudent",
            onChange: onChangeAdd,
            onClick: onClickAdd,
            onKeyPress: onSubmitAdd,
            placeholder: "Ingresa el código del alumno",
            value: this.props.searchValue
        }
    }
}

export default StudentChecklistBoard;
