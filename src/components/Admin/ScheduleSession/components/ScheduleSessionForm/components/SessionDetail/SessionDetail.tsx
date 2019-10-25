import * as React from 'react';
import * as NumericInput from 'react-numeric-input';
import { Text } from '../../../../../../../common/ConsoleText';
import FilterList from '../../../../../../../common/FilterList/FilterList';
import FormColumn from '../../../../../../../common/FormRow/components/FormColumn/FormColumn';
import FormRow from '../../../../../../../common/FormRow/FormRow';
import {FactorySessionBean} from "../../../../../../../domain/FactorySession/FactorySessionBean";
import {FormLocationDependency} from "../../../../../../../domain/FormSession/FormLocationDependency";
import {IListItem} from "../../../../../../../domain/Lists";
import {ISkill} from "../../../../../../../domain/Skill/Skill";
import {IMentorDescription, ISessionTypes} from '../../../../../../../interfaces/Mentor.interface';
import {
    SESSION_PHYSICAL,
    SESSION_UNDEFINED, SESSION_VIRTUAL
} from '../../../../../../../repository/SessionTypeConstants';
import {
    SESSION_BLOCK,
    SESSION_MAX_STUDENTS, SESSION_ROOM, SESSION_SITE, SESSION_SKILL,
    SESSION_TYPE
} from '../../../../ScheduleSession.constants';
import ScheduleSessionContext, {IScheduleContext} from '../../../../ScheduleSession.context';
import './SessionDetail.scss';


interface IPropsSessionDetail {
    skills: ISkill[];
    sessionTypes: ISessionTypes[];
    onChange: (field: string, item: IListItem) => void;
}

interface IListSessionTypes extends IListItem {
    type: string;
}

interface IStateSessionDetail {
    listSession: any[];
    maxStudents: number;
    mentor?: IMentorDescription;
    rooms: IListItem[];
    sites: IListItem[];
    blocks: IListItem[];
}

class SessionDetail extends React.Component <IPropsSessionDetail, IStateSessionDetail> {
    public state: IStateSessionDetail;
    public timer: any = 0;
    constructor(props: IPropsSessionDetail) {
        super(props);
        this.state = {
            blocks: [],
            listSession: [],
            maxStudents: 1,
            mentor: undefined,
            rooms: [],
            sites: []
        };
        this._onChangeSkill = this._onChangeSkill.bind(this);
        this._onChangeMaxStudents = this._onChangeMaxStudents.bind(this);
        this._updateRooms = this._updateRooms.bind(this);
        this._updateSites = this._updateSites.bind(this);
        this._updateBlocks = this._updateBlocks.bind(this);
        this._updateMaxStudents = this._updateMaxStudents.bind(this);
        this.getCurrentRoomName = this.getCurrentRoomName.bind(this);
    }

    public componentDidMount() {
        if (this.props.skills.length === 1) {
            this._onChangeSkill(this.props.skills[0]);
        }
        if (this.props.sessionTypes) {
            const listSession = this.props.sessionTypes.map((item) => {
                return {
                    id: item.key,
                    name: item.name,
                    type: item.type
                }
            });
            this.setState({listSession});
        }
    }
    public reset() {
        this.setState({
            blocks: [],
            listSession: [],
            maxStudents: 1,
            mentor: undefined,
            rooms: [],
            sites: []
        }, () => {
            this.componentDidMount();
        });
    }
    public render() {
        return (
            <ScheduleSessionContext.Consumer>
                {
                    (scheduleSessionContext: IScheduleContext) => {
                        const session = scheduleSessionContext.session;
                        const locations = scheduleSessionContext.locations;
                        const onChangeType = this._updateSites(locations, session);
                        const onChangeSite = this._updateBlocks(locations);
                        const onChangeBlock = this._updateRooms(locations, session);
                        const onChangeRoom = this._updateMaxStudents(locations, session);
                        const roomName = this.getCurrentRoomName(session);
                        const onChangeMax = this._onChangeMaxStudents(session);
                        this._autoSelect(locations, session);
                        let counter = 0;
                        return (
                            <div style={{width: '80%'}}>
                                <FormRow columns={[
                                    <FormColumn key={`SessionDetailRow${++counter}`}  width={2}>
                                        <Text className='FormSession-label'>Sesión</Text>
                                        <FilterList
                                            onChange={this._onChangeSkill}
                                            name={session.factorySession.skillName}
                                            list={this.props.skills}
                                            defaultText='Ingresa un curso'/>
                                    </FormColumn>,
                                    <FormColumn key={`SessionDetailRow${++counter}`} width={2}>
                                        <Text className='FormSession-label'>Modalidad</Text>
                                        <FilterList
                                            onChange={onChangeType}
                                            name={session.typeName(this.state.listSession)}
                                            list={this.state.listSession.filter((item) => !item.name.startsWith('Indefinido'))}
                                            defaultText='Presencial, Virtual, etc'/>
                                    </FormColumn>,
                                ]} style={{marginBottom: 70}}/>


                                <FormRow columns={[
                                    <FormColumn key={`SessionDetailRow${++counter}`} width={2}>
                                        <Text className='FormSession-label'>Sede</Text>
                                        <FilterList
                                            onChange={onChangeSite}
                                            name={session.getSelectedSite}
                                            list={this.state.sites}
                                            defaultText='Lima Centro, Lima Sur, etc'/>
                                    </FormColumn>,
                                    <FormColumn key={`SessionDetailRow${++counter}`} width={2}>
                                        <Text className='FormSession-label'>Dirección</Text>
                                        <FilterList
                                            onChange={onChangeBlock}
                                            name={session.getSelectedBlock}
                                            list={this.state.blocks}
                                            defaultText='Pacífico, Avenida Arequipa #660'/>
                                    </FormColumn>,
                                ]} style={{marginBottom: 70}}/>

                                <FormRow columns={[
                                    <FormColumn key={`SessionDetailRow${++counter}`} width={2}>
                                        <Text className='FormSession-label'>Aula</Text>
                                        <FilterList
                                            onChange={onChangeRoom}
                                            name={roomName}
                                            list={this.state.rooms}
                                            defaultText='A1002'/>
                                    </FormColumn>,
                                    <FormColumn key={`SessionDetailRow${++counter}`} width={2}>
                                        <div style={{display: 'flex', flexDirection: 'column', width: 90}}>
                                            <Text>Capacidad</Text>
                                            <NumericInput
                                                className="FormSession-input--range"
                                                min={1}
                                                max={this.state.maxStudents}
                                                value={session.factorySession.maxStudents}
                                                onChange={onChangeMax}/>
                                        </div>
                                    </FormColumn>,
                                ]}/>
                            </div>
                        )
                    }
                }
            </ScheduleSessionContext.Consumer>
        );
    }

    private _autoSelect(locations: FormLocationDependency, session: FactorySessionBean) {
        if (!session.selectedSite && this.state.sites.length === 1) {
            const site = this.state.sites[0];
            session.selectedSite = site.id;
            this._updateBlocks(locations)(site);
        } else if (!session.selectedBlock && this.state.blocks.length === 1) {
            const block = this.state.blocks[0];
            session.selectedBlock = block.id;
            this._updateRooms(locations, session)(block);
        } else if (!session.factorySession.room && this.state.rooms.length === 1) {
            const room = this.state.rooms[0];
            this._updateMaxStudents(locations, session)(room);
        }
    }

    private getCurrentRoomName(session: FactorySessionBean) {
        const room = this.state.rooms.filter((item: IListItem) => {
            return item.id === session.factorySession.room
        });
        return room.length ? room[0].name : '';
    }

    private _updateSites(locations: FormLocationDependency, session: FactorySessionBean) {
        return (item: IListSessionTypes) => {
            locations.type = item.type;
            const sites = locations.getLocations();
            let max = 1;
            if (locations.type.search(SESSION_VIRTUAL) !== -1) {
                max = locations.getVirtualMaxStudents();
                session.setMaxStudents(max.toString());
            }
            this.setState({sites, blocks: [], rooms: [], maxStudents: max});
            this.props.onChange(SESSION_TYPE, item);
        }
    }

    private _updateBlocks(locations: FormLocationDependency) {
        return (item: IListItem) => {
            const blocks = locations.getPhysicalBlocks(item.id);
            this.setState({ blocks, rooms: [] });
            this.props.onChange(SESSION_SITE, item);
        }
    }

    private _updateRooms(locations: FormLocationDependency, session: FactorySessionBean) {
        return (item: IListItem) => {
            const rooms = locations.getPhysicalRooms(session.getSelectedSite, item.id);
            this.setState({ rooms});
            this.props.onChange(SESSION_BLOCK, item);
        }
    }

    private _updateMaxStudents(locations: FormLocationDependency, session: FactorySessionBean) {
        return (item: IListItem) => {
            const isSessionPhysical = locations.type.search(SESSION_PHYSICAL) !== -1;
            const isSessionUndefined = locations.type.search(SESSION_UNDEFINED) !== -1;
            let max = 1;
            if (isSessionPhysical || isSessionUndefined) {
                const site = locations.getSelectedSite(session.getSelectedSite);
                const rooms = locations.getSelectedBlock(site, session.getSelectedBlock);
                const room = locations.getSelectedRoom(rooms, item.id);
                if (!!room) {
                    max = isSessionUndefined ? locations.getVirtualMaxStudents() : room.maxStudents;
                    session.setMaxStudents(max.toString());
                    this.setState({maxStudents: max});
                    this.props.onChange(SESSION_ROOM, item);
                }
            }
        }
    }

    private _onChangeSkill(item: IListItem) {
        this.props.onChange(SESSION_SKILL, item);
    }

    private _onChangeMaxStudents(session: FactorySessionBean) {
        return (numberValue: number) => {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                const max = this.state.maxStudents;
                if (numberValue) {
                    const value = numberValue;
                    let finalValue = value.toString();
                    if (value > max) {
                        finalValue = finalValue.toString().substr(1);
                    }

                    if (Number(finalValue) === 0 || Number(finalValue) > max) {
                        finalValue = max.toString();
                    }
                    this.props.onChange(SESSION_MAX_STUDENTS, {id: finalValue, name: finalValue});
                } else {
                    this.props.onChange(SESSION_MAX_STUDENTS, {id: '1', name: '1'});
                }

            }, 1000);
        }
    }
}

export default SessionDetail;
