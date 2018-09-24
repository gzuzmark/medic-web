import Utilities from "../common/Utilities";
import {
    IInterestAreaDeleteService,
    IInterestAreaSite
} from "../services/InterestArea/InterestArea.service";
import FormSessionBaseBean, {ISessionItem, ISessionListForm} from "./FormSessionBaseBean";

export interface ISessionsToDelete {
    id: string;
    from: string;
    to: string;
    skillId: string;
    skillName: string;
    interestAreaId: string;
    interestArea: string;
    type: string;
    mentorName: string;
    locationId: string;
    sede: string;
    room: string;
    maxStudents: number;
    rating: number;
    status: string;
}

class FormSessionDeleteBean extends FormSessionBaseBean {
    public rooms: ISessionListForm[];
    public sessions: ISessionsToDelete[];

    constructor(item: IInterestAreaDeleteService) {
        super(item);
        const from = new Date();
        const to = new Date();
        to.setDate(to.getDate() + 7);
        this.selectedSession.from = from.toString();
        this.selectedSession.to = to.toString();
        this.rooms = this.buildRooms(item.rooms);
        this.sessions = [] as ISessionsToDelete[];
        this.automaticSelectionRooms();
    }

    public updatedSelection(sessions: any[]) {
        this.sessions = sessions;
    }

    public setSelectedSession(selectedSession: ISessionItem) {
        const from = selectedSession.from ? new Date(selectedSession.from) : new Date();
        const to = selectedSession.to ? new Date(selectedSession.to) : new Date();
        if (from > to) {
            selectedSession.to = selectedSession.from;
        }
        this.selectedSession = {...selectedSession};
    }

    public getSelectedSession() {
        return {...this.selectedSession};
    }

    get getParams() {
        const params = [];
        let urlFilters = '';
        if (this.selectedSession.from && this.selectedSession.to) {
            const from = new Date(this.selectedSession.from);
            const to = new Date(this.selectedSession.to);
            params.push(`from=${from.toISOString()}`);
            params.push(`to=${to.toISOString()}`);
            urlFilters = params.join("&");
        }

        return urlFilters;
    }

    get listRooms() {
        return this.rooms.filter(
            (item: ISessionListForm) =>
                this.selectedSession.location && item.parent && item.parent.indexOf(this.selectedSession.location.id) !== -1 )
    }

    get onChangeAreaFields() {
        this.selectedSession.location = undefined;
        this.selectedSession.room = undefined;
        this.selectedSession.skill = undefined;
        this.selectedSession.type = undefined;
        this.automaticSelectionSkill();
        this.automaticSelectionLocation();
        this.automaticSelectionRooms();
        return {
            listLocations: this.listLocations,
            listRooms: this.listRooms,
            listSkills: this.listSkills
        }
    }

    get onChangeSkillFields() {
        this.selectedSession.type = undefined;
        return {
            listRooms: this.listRooms,
        }
    }

    get onChangeLocationFields() {
        this.selectedSession.room = undefined;
        this.automaticSelectionRooms();
        return {
            listRooms: this.listRooms
        }
    }

    get onChangeTypeFields() {
        this.selectedSession.location = undefined;
        this.selectedSession.room = undefined;
        this.automaticSelectionLocation();
        this.automaticSelectionRooms();
        return {
            listLocations: this.listLocations,
            listRooms: this.listRooms
        }
    }

    get onChangeDatesFields() {
        this.selectedSession.area = undefined;
        this.selectedSession.room = undefined;
        this.selectedSession.location = undefined;
        this.selectedSession.type = undefined;
        this.selectedSession.skill = undefined;
        this.automaticSelectionArea()
        this.automaticSelectionSkill();
        this.automaticSelectionLocation();
        this.automaticSelectionRooms();
        return {
            listLocations: this.listLocations,
            listRooms: this.listRooms,
            listSkills: this.listSkills
        }
    }

    get listSessions(): ISessionsToDelete[] {
        let list = [] as ISessionsToDelete[];
        if (this.sessions.length > 0) {
            list = this.sessions
                .filter((session: ISessionsToDelete) =>
                    this.selectedSession.area ? session.interestAreaId === this.selectedSession.area.id : true
                ).filter((session: ISessionsToDelete) =>
                    this.selectedSession.skill ? session.skillId === this.selectedSession.skill.id : true
                ).filter((session: ISessionsToDelete) =>
                    this.selectedSession.type ? session.type.toLowerCase() === this.selectedSession.type.name.toLowerCase() : true
                ).filter((session: ISessionsToDelete) =>
                    this.selectedSession.location ? session.sede === this.selectedSession.location.name : true
                ).filter((session: ISessionsToDelete) =>
                    this.selectedSession.room ? session.locationId === this.selectedSession.room.id : true
                )
        }
        return list
    }

    public setSessions(sessions: ISessionsToDelete[]) {
        this.sessions = sessions;
    }

    public automaticSelectionRooms() {
        const list = this.listRooms;
        if (list.length === 1) {
            this.selectedSession.room = {
                id: list[0].id,
                name: list[0].name
            };
        }
    }

    private buildRooms(rooms: IInterestAreaSite[]) {
        const listRooms = rooms.map((room: IInterestAreaSite): ISessionListForm => {
            return {
                id: Utilities.getValue(room.id),
                name: room.name,
                parent: [room.site]
            }
        });
        return listRooms;
    }

}

export default FormSessionDeleteBean;