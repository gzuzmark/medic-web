import * as React from 'react';
import StudentFullCard, {IStudentChecklistCard} from "../StudentFullCard/StudentFullCard";
import './StudentChecklistBoard.scss';

type fnSearch = (value: string, action: string) => void;

interface IPropsStudentChecklistBoard {
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
    return () => {
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
    return (
        <div className={`StudentChecklistBoard`}>
            <div className={"StudentChecklistBoard_inputs-container"}>
                <input type={"text"}
                       name={"txtSearchStudent"}
                       onClick={onClickSearch}
                       onChange={onChangeSearch}
                       value={props.searchValue} />
                <input type={"text"}
                       name={"txtAddStudent"}
                       onClick={onClickAdd}
                       onChange={onChangeAdd}
                       onKeyPress={onSubmitAdd}
                       value={props.searchValue}/>
            </div>
            <div className={"StudentChecklistBoard_students-container"}>
            {props.students.map((student: IStudentChecklistCard, index: number) => {
                let order = 0;
                if (student.new) {
                    order = ++counter;
                }
                return (
                    <StudentFullCard student={student} key={`${index}`} styles={{'order': -1 * order}}/>
                )
            })}
            </div>
        </div>
    );
};

export default StudentChecklistBoard;
