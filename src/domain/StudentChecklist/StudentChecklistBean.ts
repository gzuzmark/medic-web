import {IUserStudent, UserStudentBean} from "../Student/UserStudentBean";

export interface IStudentChecklist {
    student: IUserStudent;
    id: string;
    status: string;
    booked?: boolean;
    enableToReserve?: boolean;
    commented?: boolean;
    tags?: string[];
    mentorComment?: string;
}

export const STUDENT_STATUS = {
    ATTENDED: 'ATTENDED',
    NO_ATTENDED: 'NO_ATTENDED',
    RATED: 'RATED',
    SCHEDULED: 'SCHEDULED',
};

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
        this.status = this.item.status || STUDENT_STATUS.SCHEDULED;
        this.new = false;
        this.checked = this.isAttended;
        this.booked = !!this.item.booked;
        this.item.commented = !!this.item.commented;
    }

    get getContract(): IStudentChecklist {
        return this.item;
    }

    get student(): UserStudentBean {
        return this.user;
    }

    get isAttended(): boolean {
        return this.status === STUDENT_STATUS.ATTENDED || this.status === STUDENT_STATUS.RATED;
    }

    get isDisabled(): boolean {
        return this.isAttended ||  this.status === STUDENT_STATUS.NO_ATTENDED;
    }

    get isChecked(): boolean {
        return this.isAttended || this.checked;
    }

    get isBooked(): boolean {
        return this.booked;
    }

    public setIsChecked() {
        this.checked = !this.checked;
    }

    public setAsNewStudent() {
        this.new = true;
    }

    public setAsAttended() {
        this.status = STUDENT_STATUS.ATTENDED;
    }

    public setAsCommented(tags: string[], mentorComment: string) {
        this.item.commented = true;
        this.item.tags = tags;
        this.item.mentorComment = mentorComment;
    }

    public updateChecked() {
        if (this.isDisabled) {
            this.checked = !this.checked;
        }
    }

}
