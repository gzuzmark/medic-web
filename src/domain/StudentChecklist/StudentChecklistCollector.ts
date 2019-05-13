import {IStudentChecklist, STUDENT_STATUS, StudentChecklistBean} from "./StudentChecklistBean";

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
            const name = `${item.student.user.name} ${item.student.user.lastname}`.toLowerCase();
            const code = item.student.user.code.toLowerCase();
            return name.includes(filter) || code.includes(filter) || !filter;
        })
    }

    public addStudentComment(id: string, tags: string[], mentorComment: string) {
        this.sessions.forEach((item: StudentChecklistBean) => {
            if (item.student.id === id) {
                item.setAsCommented(tags, mentorComment);
            }
        });
    }

    public getStudent(code: string): StudentChecklistBean | null {
        let student = null;
        const candidate = this.sessions.filter((item: StudentChecklistBean) => {
            return item.student.user.code.trim().toLowerCase() === code.trim().toLowerCase();
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

    get atLeastOneAttended() {
        const candidate = this.sessions.filter((item: StudentChecklistBean) => {
            return item.status === STUDENT_STATUS.ATTENDED || item.status === STUDENT_STATUS.RATED;
        });
        return candidate.length > 0
    }

    get isAllStudentsAttended() {
        const candidate = this.sessions.filter((item: StudentChecklistBean) => {
            return item.status === STUDENT_STATUS.ATTENDED || item.status === STUDENT_STATUS.RATED || item.status === STUDENT_STATUS.NO_ATTENDED;
        });
        return candidate.length === this.sessions.length;
    }

    public markAsAttendedTo(id: string) {
        this.sessions.forEach((item: StudentChecklistBean) => {
            if (item.id === id) {
                item.setAsAttended();
            }
        });
    }

    public updateSelectionFor(id: string) {
        this.sessions.forEach((item: StudentChecklistBean) => {
            if (item.id === id) {
                item.setIsChecked();
            }
        });
    }

    public addStudent(student: StudentChecklistBean) {
        student.setAsNewStudent();
        this.sessions.push(student);
    }

}
