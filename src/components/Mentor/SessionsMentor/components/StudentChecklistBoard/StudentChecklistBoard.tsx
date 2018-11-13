import * as React from 'react';
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import EmptyCard from "../EmptyCard/EmptyCard";
import StudentFullCard, {IStudentChecklistCard} from "../StudentFullCard/StudentFullCard";
import './StudentChecklistBoard.scss';

type fnSearch = (value: string, action: string) => void;

interface IPropsStudentChecklistBoard {
    addEnabled: boolean;
    isEmpty: boolean;
    onSearch: fnSearch;
    searchValue: string;
    students: IStudentChecklistCard[];
}

export interface IStateInput {
    dirty: boolean;
    error: boolean;
    loading: boolean;
    message: string;
}

export interface IStatesStudentChecklistBoard {
    addFocus: boolean;
    searchAnimation: boolean;
    searchFocus: boolean;
}

export const ACTION = {
    ADD: 'add',
    SEARCH: 'search'
};

const onClick = (search: fnSearch, action: string) => {
    return (event: any) => {
        search('', action);
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
        this.state = {
            addFocus: false,
            searchAnimation: true,
            searchFocus: true
        }
    }

    public render() {
        const addSearch = this.getInputAdd();
        const inputSearch = this.getInputSearch();
        let students = <EmptyCard addEnabled={this.props.addEnabled} />;
        if (!this.props.isEmpty) {
            students = (
                <React.Fragment>
                    {this.props.students.map((student: IStudentChecklistCard, index: number) => {
                        let order = 0;
                        if (student.new) {
                            order = ++this.counter;
                        }
                        return (
                            <StudentFullCard student={student} key={`${index}`} styles={{'order': -1 * order}}/>
                        )
                    })}
                </React.Fragment>
            )
        }
        return (
            <div className={`StudentChecklistBoard ${this.props.students.length > 0 ? 'StudentChecklistBoard--border' : ''}`}>
                <div className={"StudentChecklistBoard_inputs-container"}>
                    <MentorInput
                        active={true}
                        icon={"search"}
                        input={inputSearch}
                        style={{flexBasis: '48%', justifyContent: 'flex-start'}}
                        animation={{
                            enable: this.state.searchAnimation,
                            text: "Buscar alumno"
                        }}/>
                    <MentorInput
                        active={false}
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

    private updateFocus(key: string, focus: boolean) {
        const newState = {...this.state};
        newState[key] = focus;
        const searchAnimation = newState.addFocus || newState.searchFocus;
        newState.searchAnimation = searchAnimation;
        // tslint:disable:no-console
        console.log({...newState});
        this.setState({...newState});
    }

    private getInputSearch() {
        const onClickSearch = onClick(this.props.onSearch, ACTION.SEARCH);
        const onChangeSearch = onChange(this.props.onSearch, ACTION.SEARCH);
        const onBlurSearch = (event: any) => {
            this.updateFocus("searchFocus", false);
        };
        const onFocusSearch = (event: any) => {
            this.updateFocus("searchFocus", true);
        };
        return {
            autoFocus: true,
            name: "txtSearchStudent",
            onBlur: onBlurSearch,
            onChange: onChangeSearch,
            onClick: onClickSearch,
            onFocus: onFocusSearch,
            value: this.props.searchValue
        };
    }

    private getInputAdd() {
        const onClickAdd = onClick(this.props.onSearch, ACTION.ADD);
        const onChangeAdd = onChange(this.props.onSearch, '');
        const onSubmitAdd = onSubmit(this.props.onSearch, ACTION.ADD);
        const onBlurAdd = () => {
            this.updateFocus("addFocus", false);
        };
        const onFocusAdd = () => {
            this.updateFocus("addFocus", true);
        };
        return {
            autoFocus: false,
            name: "txtAddStudent",
            onBlur: onBlurAdd,
            onChange: onChangeAdd,
            onClick: onClickAdd,
            onFocus: onFocusAdd,
            onKeyPress: onSubmitAdd,
            placeholder: "Ingresa el código del alumno",
            value: this.props.searchValue
        }
    }
}

export default StudentChecklistBoard;
