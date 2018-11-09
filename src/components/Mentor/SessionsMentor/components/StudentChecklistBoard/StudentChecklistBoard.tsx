import * as React from 'react';
import StudentFullCard, {IStudentChecklistCard} from "../StudentFullCard/StudentFullCard";
import './StudentChecklistBoard.scss';

interface IPropsStudentChecklistBoard {
    students: IStudentChecklistCard[];
}

const StudentChecklistBoard: React.StatelessComponent<IPropsStudentChecklistBoard> = (props) => {
    return (
        <div className={`StudentChecklistBoard`}>
            {props.students.map((student: IStudentChecklistCard, index: number) => {
                return (
                    <StudentFullCard student={student} key={`${index}`}/>
                )
            })}
        </div>
    );
};

export default StudentChecklistBoard;
