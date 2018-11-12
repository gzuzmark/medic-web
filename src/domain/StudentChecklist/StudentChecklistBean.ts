import {SESSION_STATUS} from "../Session/SessionBean";
import {IUserStudent, UserStudentBean} from "../Student/UserStudentBean";

export interface IStudentChecklist {
    student: IUserStudent;
    id: string;
    status: string;
    booked?: boolean;
}

export class StudentChecklistBean {
    public id: string;
    public status: string;
    public user: UserStudentBean;
    public new: boolean;
    public checked: boolean;
    public booked: boolean;
    public item: IStudentChecklist;
    constructor(studentChecklist: IStudentChecklist) {
        this.item = studentChecklist;
        this.user = new UserStudentBean(this.item.student);
        this.id = this.item.id;
        this.status = this.item.status;
        this.new = false;
        this.checked = this.isAttended;
        this.booked = !!this.item.booked;
    }

    get getContract(): IStudentChecklist {
        return this.item;
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

    get isChecked(): boolean {
        return this.isAttended && this.checked;
    }

    get isBooked(): boolean {
        return this.booked;
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
