import {IStudentChecklist, StudentChecklistBean} from "./StudentChecklistBean";

export class StudentChecklistCollector {
    public sessions: StudentChecklistBean[];

    constructor(sessions: IStudentChecklist[]) {

        this.sessions = sessions.map((item: IStudentChecklist) => {
            return new StudentChecklistBean(item);
        });
    }

    public filterStudents(filter: string): StudentChecklistBean[] {
        filter = filter.toLowerCase();
        return this.sessions.filter((item: StudentChecklistBean) => {
            const name = item.student.user.name.toLowerCase();
            const code = item.student.user.code.toLowerCase();
            return name.includes(filter) || code.includes(filter) || !filter;
        })
    }

    public getStudent(code: string): StudentChecklistBean | null {
        let student = null;
        const candidate = this.sessions.filter((item: StudentChecklistBean) => {
            return item.student.user.code === code;
        });
        if (candidate.length > 0) {
            student = candidate[0];
        }
        return student;
    }

    public getStudentById(id: string): StudentChecklistBean | null {
        let student = null;
        const candidate = this.sessions.filter((item: StudentChecklistBean) => {
            return item.id === id;
        });
        if (candidate.length > 0) {
            student = candidate[0];
        }
        return student;
    }

    public markAsAttendedTo(id: string) {
        this.sessions.forEach((item: StudentChecklistBean) => {
            if (item.id === id) {
                item.setAsAttended();
            }
        });
    }

    public addStudent(student: StudentChecklistBean) {
        student.setAsNewStudent();
        this.sessions.push(student);
    }

}
