import {lpad} from '../../common/ConsoleUtils';
import { IListItem } from '../../common/FilterList/FilterList';
import {ISessionSchedule} from '../../interfaces/Session.interface';
import {SESSION_VIRTUAL} from "../../repository/SessionTypeConstants";

export interface IFactorySession {
    from: string;
    to: string;
    type: string;
    credits: number;
    room: string;
    maxStudents: number;
    mentorId: string;
    sessions: ISessionSchedule[];
    skillId: string;
    interestAreaId: string;
    skillName: string;
    interestAreaName: string;
    typeKey?: string;
}

export class FactorySessionBean {
    public factorySession: IFactorySession;
    public selectedSite = '';
    public selectedBlock = '';

    constructor(session?: IFactorySession) {
        if (session) {
            const s = {...session};
            this.factorySession = {
                credits: s.credits,
                from: s.from,
                interestAreaId: s.interestAreaId,
                interestAreaName: s.interestAreaName || '',
                maxStudents: s.maxStudents,
                mentorId: s.mentorId,
                room: s.room,
                sessions: Array.from(s.sessions),
                skillId: s.skillId,
                skillName: s.skillName || '',
                to: s.to,
                type: s.type,
            }
        } else {
            const date = new Date();
            const endOfWeek = 6 - date.getDay() + 1;
            date.setDate(date.getDate() + endOfWeek);
            this.factorySession = {
                credits: 0,
                from: (new Date()).toISOString(),
                interestAreaId: '',
                interestAreaName: '',
                maxStudents: 1,
                mentorId: '',
                room: '',
                sessions: [{from: '', to: '', key: Date.now().toString() + 0}],
                skillId: '',
                skillName: '',
                to: date.toISOString(),
                type: ''
            }
        }
    }

    public typeName(listType: IListItem[]): string {
        const type = listType.find(item => item.id === this.factorySession.type);
        return type ? type.name : '';
    }

    get listSessions(): ISessionSchedule[] {
        const list = this.factorySession.sessions.map((item) => {
            const initialDay = new Date(this.factorySession.from);
            const from = this.getTime(initialDay, item.from);
            const to = this.getTime(initialDay, item.to);
            let weekDay = -9999;
            if (typeof(item.weekDay) !== "undefined") {
                weekDay = this.hasDayChange(initialDay, item.to) ? item.weekDay - 1: item.weekDay;
                weekDay = weekDay > 7 ? 1 : weekDay;
            }
            return {
                from,
                to,
                weekDay,
            }
        });
        return  list;
    }

    get isWorkshop(): boolean{
        return this.factorySession.interestAreaName.indexOf('aller') !== -1;
    }

    get getFormSession(): IFactorySession {
        return {...this.factorySession};
    }

    get getSelectedSite() {
        return this.selectedSite;
    }

    get getSelectedBlock() {
        return this.selectedBlock;
    }

    public setSelectedSite(site: string) {
        this.selectedBlock = '';
        this.setLocation('');
        this.selectedSite = site;
    }

    public setSelectedBlock(block: string) {
        this.setLocation('');
        this.selectedBlock = block;
    }

    public updateUTCSessions(values: ISessionSchedule[]): ISessionSchedule[] {
        this.factorySession.sessions = values.map((item: ISessionSchedule):ISessionSchedule => {
            const initialDay = new Date(this.factorySession.from);
            const from = this.getUTCTime(initialDay, item.from);
            const to = this.getUTCTime(initialDay, item.to);
            let weekDay = -9999;
            if (typeof(item.weekDay) !== "undefined") {
                weekDay = this.hasDayChange(initialDay, item.to) ? item.weekDay + 1 : item.weekDay;
                weekDay = weekDay > 7 ? 1 : weekDay;
            }
            return {
                from,
                to,
                weekDay,
            }
        });
        return this.factorySession.sessions;
    }

    public isSessionValid() {
        return new Date(this.factorySession.from) <= new Date(this.factorySession.to) &&
               this.factorySession.type !== '' &&
               (this.factorySession.room !== '' || this.factorySession.type === SESSION_VIRTUAL) &&
               this.factorySession.maxStudents > 0 &&
               this.factorySession.interestAreaId !== '' &&
               this.factorySession.mentorId !== '' &&
               this.factorySession.sessions.length > 0 &&
               this.factorySession.skillId !== '';
    }

    public isWorkShopValid() {
        const sessionsInvalid = this.factorySession.sessions.filter((item: ISessionSchedule) => {
            return item.to === '' || item.from === '';
        });
        return this.factorySession.from <= this.factorySession.to &&
            this.factorySession.type !== '' &&
            (this.factorySession.room !== '' || this.factorySession.type === SESSION_VIRTUAL) &&
            this.factorySession.maxStudents > 0 &&
            this.factorySession.mentorId !== '' &&
            this.factorySession.interestAreaId !== '' &&
            sessionsInvalid.length === 0 &&
            this.factorySession.skillId !== '';

    }

    get isVirtual(): boolean {
        return this.factorySession.type === SESSION_VIRTUAL;
    }

    public setMaxStudents(max: string) {
        this.factorySession.maxStudents = Number(max);
    }

    public setLocation(id: string) {
        this.factorySession.room = id;
    }

    public setSessionType(id: string) {
        this.factorySession.type = id;
        this.selectedSite = '';
        this.selectedBlock = '';
        this.setLocation('');
    }

    public setSkill(id: string, name: string) {
        this.factorySession.skillId = id;
        this.factorySession.skillName = name;
    }

    public setSessionSelected(id: string, name: string, mentorId: string) {
        this.factorySession.interestAreaId = id;
        this.factorySession.interestAreaName = name;
        this.factorySession.skillId = "";
        this.factorySession.skillName = "";
        this.factorySession.mentorId = mentorId;
        this.factorySession.type = '';
        this.selectedSite = '';
        this.selectedBlock = '';
        this.setLocation('');
    }

    private getTime(initialDay: Date, utcTime: string) {
        const time = utcTime.split(':');
        const hour = Number(time[0]);
        const minutes = Number(time[1]);
        initialDay.setUTCHours(hour, minutes);
        return `${lpad(initialDay.getHours(), 2)}:${lpad(initialDay.getMinutes(), 2)}:00`;
    }

    private hasDayChange(initialDay: Date, utcTime: string) {
        const time = utcTime.split(':');
        const hour = Number(time[0]);
        const minutes = Number(time[1]);
        initialDay.setHours(hour, minutes);
        return initialDay.getUTCHours() < initialDay.getHours();
    }

    private getUTCTime(initialDay: Date, utcTime: string) {
        const time = utcTime.split(':');
        const hour = Number(time[0]);
        const minutes = Number(time[1]);
        initialDay.setHours(hour, minutes);
        return `${lpad(initialDay.getUTCHours(), 2)}:${lpad(initialDay.getUTCMinutes(), 2)}:00`;
    }

}
