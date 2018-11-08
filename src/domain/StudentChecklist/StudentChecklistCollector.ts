import {StudentChecklist} from "./StudentChecklist";

export class StudentChecklistCollector {
    public sessions: StudentChecklist[];

    constructor(sessions: StudentChecklist[]) {
        this.sessions = sessions;
    }

    public filterStudents(filter: string): StudentChecklist[] {
        return this.sessions.filter((item: StudentChecklist) => {
            return item.student.user.name.includes(filter) || item.student.user.code.includes(filter);
        })
    }

    public addStudent(student: StudentChecklist) {
        student.setAsNewStudent();
        this.sessions.push(student);
    }

    public toState() {
        return this.sessions.map((item: StudentChecklist) => {
            return {
                new: item.new
            }
        });
    }

}
