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
    add: IStateInput;
    search: IStateInput;
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

const StudentChecklistBoard: React.StatelessComponent<IPropsStudentChecklistBoard> = (props) => {
    const onClickSearch = onClick(props.onSearch, ACTION.SEARCH);
    const onClickAdd = onClick(props.onSearch, ACTION.ADD);
    const onChangeSearch = onChange(props.onSearch, ACTION.SEARCH);
    const onChangeAdd = onChange(props.onSearch, '');
    const onSubmitAdd = onSubmit(props.onSearch, ACTION.ADD);
    let counter = 0;
    let students = <EmptyCard addEnabled={props.addEnabled} />;
    if (!props.isEmpty) {
        students = (
            <React.Fragment>
                {props.students.map((student: IStudentChecklistCard, index: number) => {
                    let order = 0;
                    if (student.new) {
                        order = ++counter;
                    }
                    return (
                        <StudentFullCard student={student} key={`${index}`} styles={{'order': -1 * order}}/>
                    )
                })}
            </React.Fragment>
        )
    }
    const inputSearch = {
        autoFocus: true,
        name: "txtSearchStudent",
        onChange: onChangeSearch,
        onClick: onClickSearch,
        value: props.searchValue
    };
    const addSearch = {
        autoFocus: false,
        name: "txtAddStudent",
        onChange: onChangeAdd,
        onClick: onClickAdd,
        onKeyPress: onSubmitAdd,
        placeholder: "Ingresa el código del alumno",
        value: props.searchValue
    };
    return (
        <div className={`StudentChecklistBoard ${props.students.length > 0 ? 'StudentChecklistBoard--border' : ''}`}>
            <div className={"StudentChecklistBoard_inputs-container"}>
                <MentorInput
                    active={true}
                    icon={"search"}
                    input={inputSearch}
                    style={{flexBasis: '48%', justifyContent: 'flex-start'}}
                    animation={{
                        enable: true,
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
    );
};

export default StudentChecklistBoard;
