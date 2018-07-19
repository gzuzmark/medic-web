import * as React from 'react';
import * as NumericInput from 'react-numeric-input';
import { Text } from '../../../../common/ConsoleText';
import FilterList, {IListItem} from '../../../../common/FilterList/FilterList';
import {ILocationPhysical, ILocationPhysicalRoom} from '../../../../interfaces/Location.interface';
import {IMentorDescription, ISkill} from '../../../../interfaces/Mentor.interface';
import {
    AREA_TYPE_SERVICE, SESSION_PHYSICAL, SESSION_TYPES_SERVICES,
    SESSION_TYPES_TUTORIES, SESSION_UNDEFINED, SESSION_VIRTUAL
} from '../../../../repository/SessionTypeConstants';
import {
    SESSION_MAX_STUDENTS, SESSION_ROOM, SESSION_SITE, SESSION_SKILL,
    SESSION_TYPE
} from '../../ScheduleSession.constants';
import ScheduleSessionContext, {IScheduleContext} from '../../ScheduleSession.context';
import FormColumn from '../FormRow/components/FormColumn/FormColumn';
import FormRow from './../../components/FormRow/FormRow';
import './SessionDetail.scss';

interface IPropsSessionDetail {
    skills: ISkill[];
    areaType: string;
    locations: any;
    onChange: (field: string, item: IListItem) => void;
}

interface IRooms extends IListItem {
    maxStudents: number;
}

interface ISites extends IListItem {
    rooms: any[];
}

interface IStateSessionDetail {
    listSession: any[];
    maxStudents: number;
    mentor?: IMentorDescription;
    rooms: IRooms[];
    selectedRoom: string;
    selectedSite: string;
    sites: ISites[];
}

class SessionDetail extends React.Component <IPropsSessionDetail, IStateSessionDetail> {
    public state: IStateSessionDetail;
    constructor(props: IPropsSessionDetail) {
        super(props);
        this.state = {
            listSession: [],
            maxStudents: 1,
            mentor: undefined,
            rooms: [],
            selectedRoom: '',
            selectedSite: '',
            sites: []
        };
        this._onChangeSkill = this._onChangeSkill.bind(this);
        this._onChangeType = this._onChangeType.bind(this);
        this._onChangeSite = this._onChangeSite.bind(this);
        this._onChangeRoom = this._onChangeRoom.bind(this);
        this._onChangeMaxStudents = this._onChangeMaxStudents.bind(this);
        this._updateMaxStudent = this._updateMaxStudent.bind(this);
        this.getMaxStudentsVirtual = this.getMaxStudentsVirtual.bind(this);
        this._updateRooms = this._updateRooms.bind(this);
        this._updateSites = this._updateSites.bind(this);
        this._onInputMaxStudents = this._onInputMaxStudents.bind(this);
    }

    public componentDidMount() {
        if (this.props.skills.length === 1) {
            this._onChangeSkill(this.props.skills[0]);
        }
        const keyLocations = Object.keys(this.props.locations);
        const listSessionType = this.props.areaType === AREA_TYPE_SERVICE ? SESSION_TYPES_SERVICES : SESSION_TYPES_TUTORIES;
        const listSession  = keyLocations.map((key: string) => {
            return listSessionType.find((element) => element.id === key)
        });
        if (Object.keys(this.props.locations).length > 1) {
            listSession.push(
                listSessionType.find((element) => element.id === SESSION_UNDEFINED));
        }
        this.setState({listSession});
    }

    public render() {
        return (
            <ScheduleSessionContext.Consumer>
                {
                    (scheduleSessionContext: IScheduleContext) => {
                        const session = scheduleSessionContext.session;
                        let counter = 0;
                        return (
                            <div style={{width: '80%'}}>
                                <FormRow columns={[
                                    <FormColumn key={`SessionDetailRow${++counter}`}  width={2}>
                                        <Text className='FormSession-label'>Sesión</Text>
                                        <FilterList
                                            onChange={this._onChangeSkill}
                                            name={session.skillName}
                                            list={this.props.skills}
                                            defaultText='Química, Física, etc'
                                            enableClearSearch={false} />
                                    </FormColumn>,
                                    <FormColumn key={`SessionDetailRow${++counter}`} width={2}>
                                        <Text className='FormSession-label'>Tipo</Text>
                                        <FilterList
                                            onChange={this._onChangeType}
                                            name={session.typeName(this.state.listSession)}
                                            list={this.state.listSession}
                                            defaultText='Taller, tutoría, etc.'
                                            enableClearSearch={false}/>
                                    </FormColumn>,
                                ]} style={{marginBottom: 70}}/>

                                <FormRow columns={[
                                    <FormColumn key={`SessionDetailRow${++counter}`} width={2}>
                                        <Text className='FormSession-label'>Campus</Text>
                                        <FilterList
                                            onChange={this._onChangeSite}
                                            name={this.state.selectedSite}
                                            list={this.state.sites}
                                            defaultText='Torre Arequipa, Torre B, etc.'
                                            enableClearSearch={false}/>
                                    </FormColumn>,
                                    <FormColumn key={`SessionDetailRow${++counter}`} width={2}>
                                        <FormRow key={5} columns={[
                                            <FormColumn key={`SessionDetailRow${++counter}`}  width={2}>
                                                <Text className='FormSession-label'>Aula</Text>
                                                <FilterList
                                                    onChange={this._onChangeRoom}
                                                    name={this.state.selectedRoom}
                                                    list={this.state.rooms}
                                                    defaultText='A1002'
                                                    enableClearSearch={false}/>
                                            </FormColumn>,
                                            <FormColumn key={`SessionDetailRow${++counter}`} width={2} style={{flexBasis: 90}}>
                                                <Text>Capacidad</Text>
                                                <NumericInput
                                                    className="FormSession-input--range"
                                                    min={1}
                                                    max={this.state.maxStudents}
                                                    value={session.maxStudents}
                                                    onChange={this._onChangeMaxStudents}/>
                                            </FormColumn>,
                                        ]}/>
                                    </FormColumn>
                                ]}/>
                            </div>
                        )
                    }
                }
            </ScheduleSessionContext.Consumer>
        );
    }

    private _updateSites(item: IListItem) {
        let locations = [];
        let sites: ISites[] = [];
        let maxStudents = 1;
        const isPhysical = item.id === SESSION_PHYSICAL || item.id === SESSION_UNDEFINED;
        if (isPhysical) {
            locations = this.props.locations[SESSION_PHYSICAL];
            sites = locations.map((location: ILocationPhysical, index: number) => {
                return {
                    id: `${item.id}_${index}`,
                    name: location.site,
                    rooms: location.rooms
                }
            });
        } else {
            sites.push({
                id: 'videoconferencia',
                name: 'Videoconferencia',
                rooms: []
            })
        }
        let rooms = [] as IRooms[];

        if (sites.length === 1) {
            rooms = sites[0].rooms;
            if (!isPhysical) {
                maxStudents = this.getMaxStudentsVirtual();
            }
            this.setState({sites, selectedRoom: '', maxStudents, rooms}, () => {
                this._onChangeSite(sites[0]);
                this._onChangeMaxStudents(maxStudents);
            });
        } else {
            this.setState({sites, selectedSite: '', selectedRoom: '', maxStudents, rooms}, () => {
                this.props.onChange(SESSION_ROOM, {id: '', name: ''});
                this._onChangeMaxStudents(maxStudents);
            });
        }
    }

    private _updateRooms(item: IListItem) {
        let rooms:IRooms[] = [];
        let maxStudents = 1;
        const isPhysical = item.id.search(SESSION_PHYSICAL) !== -1 || item.id.search(SESSION_UNDEFINED) !== -1;
        if (isPhysical) {
            const selectedSite = this.state.sites.filter((site: ISites) =>  site.name === item.name);
            rooms = selectedSite[0].rooms.map((currentRooms: ILocationPhysicalRoom) => {
                maxStudents = item.id.search(SESSION_UNDEFINED) !== -1 ?
                    this.getMaxStudentsVirtual() : currentRooms.maxStudents;
                return {
                    id: currentRooms.id,
                    maxStudents,
                    name: currentRooms.room
                }
            });
        } else {
            maxStudents = this.getMaxStudentsVirtual();
        }

        if (rooms.length === 1) {
            maxStudents = rooms[0].maxStudents;
            this.setState({rooms, maxStudents}, () => {
                this._onChangeRoom(rooms[0]);
            });
        } else {
            if (isPhysical) {
                this.setState({rooms, selectedRoom: '', maxStudents});
                this.props.onChange(SESSION_ROOM, {id: '', name: ''});
                this._onChangeMaxStudents(maxStudents)
            }
        }
    }

    private getMaxStudentsVirtual(): number {
        return this.props.locations[SESSION_VIRTUAL] ? this.props.locations[SESSION_VIRTUAL][0].rooms[0].maxStudents : 1;
    }

    private _updateMaxStudent(item: IListItem) {
        const selectedRoom = this.state.rooms.filter((room: IRooms) => room.id === item.id);
        const maxStudents = selectedRoom[0].maxStudents;
        this.setState({maxStudents}, () => {
            this._onChangeMaxStudents(maxStudents);
        });
    }

    private _onChangeSkill(item: IListItem) {
        this.props.onChange(SESSION_SKILL, item);
    }

    private _onChangeType(item: IListItem) {
        this._updateSites(item);
        this.props.onChange(SESSION_TYPE, item);
    }

    private _onChangeSite(item: IListItem) {
        this.setState({selectedSite: item.name}, () => {
            this._updateRooms(item);
            this.props.onChange(SESSION_SITE, item);
        });
    }

    private _onChangeRoom(item: IListItem) {
        this.setState({selectedRoom: item.name}, () => {
            this._updateMaxStudent(item);
            this.props.onChange(SESSION_ROOM, item);
        });
    }

    private _onInputMaxStudents(event: any) {
        this._onChangeMaxStudents(event.target.value)
    }

    private _onChangeMaxStudents(numberValue: number) {
        let max = '';
        let stringValue = numberValue ? numberValue.toString() : '';
        const lengthValue = stringValue.length;
        if (this.state.maxStudents < 10) {
            stringValue = lengthValue > 1 ? stringValue[0] : stringValue;
            max = stringValue;
        } else {
            stringValue = lengthValue > 2 ? stringValue[0] + stringValue[1] : stringValue;
            max = stringValue;
        }
        if (numberValue && !isNaN(numberValue)) {
            max = '1';
            if(parseInt(stringValue, 10) > 0 && parseInt(stringValue, 10) <= this.state.maxStudents) {
                max = parseInt(stringValue, 10).toString();
            } else if (parseInt(stringValue, 10) > this.state.maxStudents) {
                max = this.state.maxStudents.toString();
            }
        }

        if (max === '') {
            max = '1'
        }
        this.props.onChange(SESSION_MAX_STUDENTS, {id: max.toString(), name: max.toString()});
    }
}

export default SessionDetail;
