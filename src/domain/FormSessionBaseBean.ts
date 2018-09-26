import {IListItem} from "../common/FilterList/FilterList";
import Utilities from "../common/Utilities";
import {SESSION_PHYSICAL, SESSION_UNDEFINED, SESSION_VIRTUAL} from "../repository/SessionTypeConstants";
import {
    IBase,
    IInterestAreaParent,
    IInterestAreaService
} from "../services/InterestArea/InterestArea.service";

export interface ISessionListForm extends IListItem {
    parent?: string[];
}

export interface ISessionSelected {
    id: string;
    name: string;
}

export interface ISessionItem {
    area?: ISessionSelected;
    skill?: ISessionSelected;
    type?: ISessionSelected;
    location?: ISessionSelected;
    from?: string;
    to?: string;
    room?: ISessionSelected;
}

class FormSessionBaseBean {
    public areas: ISessionListForm[];
    public skills: ISessionListForm[];
    public types: ISessionListForm[];
    public locations: ISessionListForm[];
    public selectedSession: ISessionItem;

    constructor(item: IInterestAreaService) {
        this.selectedSession = {};
        this.areas = this.buildAreas(item.areas);
        this.automaticSelectionArea();
        this.skills = this.buildSkills(item.skills);
        this.automaticSelectionSkill();
        this.types = this.buildTypes(item.types);
        this.locations = this.buildLocations(item.sites);
        this.automaticSelectionLocation();
    }

    public getSelectedSession() {
        return this.selectedSession;
    }

    public setSelectedSession(selectedSession: ISessionItem) {
        this.selectedSession = {...selectedSession};
    }

    public buildAreas(areas: IBase[]): ISessionListForm[] {
        const listAreas = areas.map((area: IBase): ISessionListForm => {
            return {
                id: Utilities.getValue(area.id),
                name: area.name
            }
        });
        return listAreas;
    }

    public buildSkills(skills: IInterestAreaParent[]): ISessionListForm[] {
        const listSkills = skills.map((skill: IInterestAreaParent): ISessionListForm => {
            return {
                id: Utilities.getValue(skill.id),
                name: skill.name,
                parent: skill.interesAreasId
            }
        });
        return listSkills;
    }

    public buildTypes(types: IBase[]): ISessionListForm[] {
        const listTypes = types.map((type: IInterestAreaParent): ISessionListForm => {
            return {
                id: Utilities.getValue(type.id),
                name: type.name
            }
        });
        return listTypes;
    }

    public buildLocations(locations: IInterestAreaParent[]): ISessionListForm[] {
        const listLocations = locations.map((location: IInterestAreaParent): ISessionListForm => {
            return {
                id: Utilities.getValue(location.id, location.name),
                name: location.name,
                parent: location.interesAreasId
            }
        });
        return listLocations;
    }

    get listAreas() : ISessionListForm[] {
        return this.areas;
    }

    get listSkills(): ISessionListForm[] {
        return this.skills.filter(
            (item: ISessionListForm) => {
                return this.selectedSession.area && item.parent && item.parent.indexOf(this.selectedSession.area.id) !== -1
            }
        )}

    get listTypes(): ISessionListForm[] {
        return this.types;
    }

    get listLocations(): ISessionListForm[] {
        let locations = [] as ISessionListForm[];
        const isPhysical = this.selectedSession.type && [SESSION_PHYSICAL, SESSION_UNDEFINED].indexOf(this.selectedSession.type.id) !== -1;
        if (this.selectedSession.type && this.selectedSession.type.id === SESSION_VIRTUAL) {
            locations = [{
                id: SESSION_VIRTUAL,
                name: 'Videoconferencia'
            }] as ISessionListForm[];
        } else if (isPhysical) {
            locations = this.locations.filter(
                (item: ISessionListForm) => {
                    return this.selectedSession.area && item.parent && item.parent.indexOf(this.selectedSession.area.id) !== -1;
                }
            );
        }
        return locations;
    }

    public automaticSelectionArea() {
        const list = this.listAreas;
        if (list.length === 1) {
            this.selectedSession.area = {
                id: list[0].id,
                name: list[0].name
            };
        }
    }

    public automaticSelectionSkill() {
        const list = this.listSkills;
        if (list.length === 1) {
            this.selectedSession.skill = {
                id: list[0].id,
                name: list[0].name
            };
        }
    }

    public automaticSelectionLocation() {
        const list = this.listLocations;
        if (list.length === 1) {
            this.selectedSession.location = {
                id: list[0].id,
                name: list[0].name
            };
        }
    }
}

export default FormSessionBaseBean;