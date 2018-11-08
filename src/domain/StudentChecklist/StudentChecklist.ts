import {SESSION_STATUS} from "../Session/SessionBean";
import {IUserStudent, UserStudentBean} from "../Student/UserStudentBean";

export interface IStudentChecklist {
    user: IUserStudent;
    id: string;
    attended: boolean;
    status: string;
}

export class StudentChecklist {
    public id: string;
    public attended: boolean;
    public status: string;
    public user: UserStudentBean;
    public new: boolean;
    public checked: boolean;

    constructor(studentChecklist: IStudentChecklist) {
        this.user = new UserStudentBean(studentChecklist.user);
        this.id = studentChecklist.id;
        this.attended = studentChecklist.attended;
        this.status = studentChecklist.status;
        this.new = false;
        this.checked = this.isAttended;
    }

    get student(): UserStudentBean {
        return this.user;
    }

    get isAttended(): boolean {
        return this.status === SESSION_STATUS.ATTENDED || this.status === SESSION_STATUS.RATED;
    }

    get isDisabled(): boolean {
        return this.isAttended ||  this.status === SESSION_STATUS.NO_ATTENDED;
    }

    public setAsNewStudent() {
        this.new = true;
    }

    public updateChecked() {
        if (this.isDisabled) {
            this.checked = !this.checked;
        }
    }

}
