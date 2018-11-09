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

const onClick = (click: fnSearch, action: string) => {
    return () => {
        click('', action);
    }
};

const onChange = (change: fnSearch, action: string) => {
    return (event: any) => {
        change(event.target.value, action);
    }
};

const StudentChecklistBoard: React.StatelessComponent<IPropsStudentChecklistBoard> = (props) => {
    const onClickSearch = onClick(props.onSearch, ACTION.SEARCH);
    const onClickAdd = onClick(props.onSearch, ACTION.ADD);
    const onChangeSearch = onChange(props.onSearch, ACTION.SEARCH);
    const onChangeAdd = onChange(props.onSearch, '');
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
                       value={props.searchValue}/>
            </div>
            {props.students.map((student: IStudentChecklistCard, index: number) => {
                return (
                    <StudentFullCard student={student} key={`${index}`}/>
                )
            })}
        </div>
    );
};

export default StudentChecklistBoard;
