import {lpad} from '../../common/Utils/DateUtilities';
import {ISessionSchedule} from '../../interfaces/Session.interface';
import {SESSION_VIRTUAL} from "../../repository/SessionTypeConstants";
import {IListItem} from "../Lists";

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

export interface ISessionsDates {
    from: string;
    to: string;
}

export interface IRequestSaveSessions {
    skillId : string;
    interestAreaId: string;
    type: string;
    room: number;
    credits: number;
    maxStudents: number;
    isWorkshop: boolean;
    sessions: ISessionsDates[]
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

    public requestSaveSessions(isWorkshop: boolean): IRequestSaveSessions{
        let sessions = [] as ISessionsDates[];
        if (!isWorkshop) {
            const initial = new Date(this.factorySession.from);
            const end = new Date(this.factorySession.to);
            const endLoop = new Date(this.factorySession.to);
            endLoop.setDate(endLoop.getDate() + 7);
            let current = initial.getTime();
            const todayTime = (new Date()).getTime();
            while (current <= endLoop.getTime()) {
                const temporalDate = new Date(current);
                this.factorySession.sessions.forEach((item) => {
                    if (typeof(item.weekDay) !== "undefined") {
                        let from = new Date(temporalDate);
                        let to = new Date(temporalDate);
                        from = this.setHoursToCurrentDate(from, item.from);
                        to = this.setHoursToCurrentDate(to, item.to);
                        const dayDistance = (temporalDate.getDay() + 1) - item.weekDay; // sabado 6 - domingo 0 => 6
                        const differenceDay = dayDistance < 0 ? 7 : dayDistance; // 6
                        from.setDate(from.getDate() - differenceDay);
                        to.setDate(to.getDate() - differenceDay);
                        if (todayTime < from.getTime() && from.getTime() < end.getTime()) {
                            sessions.push({
                                from: from.toISOString(),
                                to: to.toISOString(),
                            })
                        }
                    }

                });
                temporalDate.setDate(temporalDate.getDate() + 7);
                current = temporalDate.getTime();
            }
        } else {
            sessions = this.factorySession.sessions;
        }
        return {
            credits: 0,
            interestAreaId: this.factorySession.interestAreaId,
            isWorkshop,
            maxStudents: this.factorySession.maxStudents,
            room: Number(this.factorySession.room),
            sessions,
            skillId : this.factorySession.skillId,
            type: this.factorySession.type
        }
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
        this.factorySession.sessions = values;
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
        const {hour, minutes} = this.getHours(utcTime);
        initialDay.setUTCHours(hour, minutes);
        return `${lpad(initialDay.getHours(), 2)}:${lpad(initialDay.getMinutes(), 2)}:00`;
    }

    private hasDayChange(initialDay: Date, utcTime: string) {
        const {hour, minutes} = this.getHours(utcTime);
        initialDay.setHours(hour, minutes);
        return initialDay.getUTCHours() < initialDay.getHours();
    }

    private setHoursToCurrentDate(date: Date, time: string) {
        const {hour, minutes} = this.getHours(time);
        date.setHours(hour, minutes);
        return date
    }

    private getHours(time: string) {
        const times = time.split(':');
        const hour = Number(times[0]);
        const minutes = Number(times[1]);
        return {hour, minutes}
    }

}
