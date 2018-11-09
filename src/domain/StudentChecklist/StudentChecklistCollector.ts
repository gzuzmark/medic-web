import {IStudentChecklist, StudentChecklistBean} from "./StudentChecklistBean";

export class StudentChecklistCollector {
    public sessions: StudentChecklistBean[];

    constructor(sessions: IStudentChecklist[]) {

        this.sessions = sessions.map((item: IStudentChecklist) => {
            return new StudentChecklistBean(item);
        });
    }

    public filterStudents(filter: string): StudentChecklistBean[] {
        return this.sessions.filter((item: StudentChecklistBean) => {
            return item.student.user.name.includes(filter) || item.student.user.code.includes(filter);
        })
    }

    public addStudent(student: StudentChecklistBean) {
        student.setAsNewStudent();
        this.sessions.push(student);
    }

}
