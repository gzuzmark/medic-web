import * as React from 'react';
import ConfirmButtons from "../../common/ConfirmButtons/ConfirmButtons";
import ModalCancel from "../../common/ConsoleModal/ModalCancel/ModalCancel";
import { Text3, Title3 } from '../../common/ConsoleText';
import {backToPagePreviously} from "../../common/ConsoleUtils";
import {IListItem} from "../../common/FilterList/FilterList";
import Layout from "../../common/Layout/Layout";
import MentorDetail from "../../common/MentorDetail/MentorDetail";
import MenuLeft from "../../common/MenuLeft/MenuLeft";
import Sticky from "../../common/Sticky/Sticky";
import {ISessionItem} from "../../domain/FormSessionBaseBean";
import FormSessionDeleteBean, {ISessionsToDelete} from "../../domain/FormSessionDeleteBean";
import {IMatchParam} from "../../interfaces/MatchParam.interface";
import {IMentor} from "../../interfaces/Mentor.interface";
import InterestAreaService from "../../services/InterestArea/InterestArea.service";
import MentorService from '../../services/Mentor/Mentor.service';
import SessionService from "../../services/Session/Session.service";
import FormRemoveMultiple from "./components/FormMultiple/FormRemoveMultiple";
import ModalConfirmDelete from "./components/ModalConfirmDelete/ModalConfirmDelete";
import SessionDeleteTable from "./components/SessionDeleteTable/SessionDeleteTable";
import './SessionDelete.scss';

interface IPropsSessionDeleteMultiple {
    match: IMatchParam;
}

interface IStateSessionDeleteMultiple {
    mentor?: IMentor;
    sessions: ISessionsToDelete[];
    currentSession: ISessionItem;
    status: {
        savingData: boolean;
        dirty: boolean;
    }
    modals: {
        cancelModal: boolean;
        confirmModal: boolean;
    }
    listAreas: IListItem[];
    listSkills: IListItem[];
    listRooms: IListItem[];
    listLocations: IListItem[];
    listTypes: IListItem[];
    selection: string[];
}

class SessionDeleteMultiple extends React.Component<IPropsSessionDeleteMultiple, IStateSessionDeleteMultiple> {
    private mentorId: string;
    private mentorService: MentorService = new MentorService();
    private interestAreaService: InterestAreaService = new InterestAreaService();
    private sessionService: SessionService = new SessionService();
    private selectedCheckboxes: string[];
    private formSessionDeleteBean: FormSessionDeleteBean;

    constructor(props: any) {
        super(props);
        this.state = {
            currentSession: {},
            listAreas: [],
            listLocations: [],
            listRooms: [],
            listSkills: [],
            listTypes: [],
            mentor: undefined,
            modals: {
                cancelModal: false,
                confirmModal: false
            },
            selection: [],
            sessions: [],
            status: {
                dirty: false,
                savingData: false
            }
        };
        this.mentorId = this.props.match.params.id;
        this._onFilter = this._onFilter.bind(this);
        this._onSearch = this._onSearch.bind(this);
        this._updateSelection = this._updateSelection.bind(this);
        this._handlerModal = this._handlerModal.bind(this);
        this._onConfirmDelete = this._onConfirmDelete.bind(this);
        this._selectAll = this._selectAll.bind(this);
        this._isSelectionValid = this._isSelectionValid.bind(this);
    }

    public componentDidMount() {
        this._loadInitialData().then((response: any) => {
            this.formSessionDeleteBean = new FormSessionDeleteBean(response[1]);
            this.setState({
                currentSession: this.formSessionDeleteBean.selectedSession,
                listAreas: this.formSessionDeleteBean.listAreas,
                listLocations: this.formSessionDeleteBean.listLocations,
                listRooms: this.formSessionDeleteBean.listRooms,
                listSkills: this.formSessionDeleteBean.listSkills,
                listTypes: this.formSessionDeleteBean.listTypes,
                mentor: response[0]
            });
            this._onSearch();
        });
    }
    public componentWillMount() {
        this.selectedCheckboxes = [];
    }

    public renderMenu() {
        const textNavigation = this.state.mentor ?
            'Eliminar sesiones de ' + this.state.mentor.user.name : 'Eliminar sesiones';
        return (
            <MenuLeft baseText={'Mentores'} url={'/admin/mentores'} textNavigation={textNavigation} />
        )
    }

    public render() {
        return(
            <Layout menu={this.renderMenu()}>
                <Sticky height={0} top={80} style={{zIndex: -1}}>
                    <MentorDetail mentor={this.state.mentor}/>
                </Sticky>
                <ModalCancel
                    show={this.state.modals.cancelModal}
                    title={"Cancelar sesiones creadas"}
                    disabled={false} loading={false}
                    onCancel={this._handlerModal("cancelModal", false)}
                    onConfirm={backToPagePreviously} />
                <ModalConfirmDelete
                    show={this.state.modals.confirmModal}
                    disabled={this._isSelectionValid() || this.state.status.savingData}
                    loading={this.state.status.savingData}
                    onCancel={this._handlerModal("confirmModal", false)}
                    onConfirm={this._onConfirmDelete}/>
                <div className="u-LayoutMargin">
                    { this.state.currentSession &&
                    <div className="SessionDelete">
                        <Title3 color={"actionColor"}>Selecciona las características de las sesiones  por eliminar:</Title3>
                        <FormRemoveMultiple
                            onSearch={this._onSearch} onFilter={this._onFilter}
                            lists={{
                                areas: this.state.listAreas,
                                locations: this.state.listLocations,
                                rooms: this.state.listRooms,
                                skills: this.state.listSkills,
                                types: this.state.listTypes
                            }}
                            currentSession={this.state.currentSession} />
                        {!!this.state.sessions.length && this.state.status.dirty &&
                            <React.Fragment>
                                <Text3>{this.state.selection.length}</Text3>
                                <SessionDeleteTable
                                    items={this.state.sessions}
                                    onSelectItem={this._updateSelection}
                                    onSelectAll={this._selectAll}
                                    selection={this.state.selection}/>
                            </React.Fragment>}
                        <ConfirmButtons
                            styles={{justifyContent: 'flex-end'}}
                            disabled={this._isSelectionValid() || this.state.status.savingData}
                            loading={this.state.status.savingData}
                            cancelText={'Cancelar'} confirmText={'Eliminar'}
                            onCancel={this._handlerModal("cancelModal", true)}
                            onConfirm={this._handlerModal("confirmModal", true)} />
                    </div>}
                </div>
            </Layout>
        )
    }

    private _handlerModal(modal: string, show: boolean) {
        return () => {
            const modals = {...this.state.modals};
            modals[modal] = show;
            this.setState({
                modals
            });
        }
    }

    private _updateSelectedSession(selectedSession: ISessionItem) {
        this.selectedCheckboxes = [];
        const currentSession = this.formSessionDeleteBean.getSelectedSession();
        this.formSessionDeleteBean.setSelectedSession({...currentSession, ...selectedSession});
    }

    private _onFilter(selectedSession: ISessionItem, key: string) {
        this._updateSelectedSession({[key]: selectedSession});
        let fields = {};
        switch (key) {
            case 'area':
                fields =  this.formSessionDeleteBean.onChangeAreaFields;
                break;
            case 'skill':
                fields =  this.formSessionDeleteBean.onChangeSkillFields;
                break;
            case 'location':
                fields = this.formSessionDeleteBean.onChangeLocationFields;
                break;
            case 'type':
                fields = this.formSessionDeleteBean.onChangeTypeFields;
        }
        const sessions = this.formSessionDeleteBean.listSessions;
        const newSession = this.formSessionDeleteBean.getSelectedSession();
        this.setState(
            {sessions, ...fields, currentSession: newSession, selection: this.selectedCheckboxes});
    }

    private _onSearch(selectedSession?: ISessionItem) {
        if (selectedSession) {
            this._updateSelectedSession(selectedSession);
        }
        const fields = this.formSessionDeleteBean.onChangeDatesFields;
        const newSession = this.formSessionDeleteBean.getSelectedSession();
        this.setState(
            {currentSession: newSession, ...fields, selection: this.selectedCheckboxes}, () => {
            const params = `mentor=${this.mentorId}&${this.formSessionDeleteBean.getParams}`;
            this.sessionService.searchSessions(params).then((sessions: any) => {
                this.formSessionDeleteBean.setSessions(sessions);
                this.setState({sessions: this.formSessionDeleteBean.sessions, status:  {
                        dirty: true,
                        savingData: false
                    }})
            });
        });
    }

    private _onConfirmDelete() {
        this.setState({
            status: {
                dirty: true,
                savingData: true,
            }
        });
        const newStateModals = {...this.state.modals};
        const newStateStatus = {...this.state.status};
        newStateStatus.savingData = false;
        newStateModals.confirmModal = false;
        this.sessionService.deleteSessions(this.state.selection).then(() => {
            this.setState({
                status: newStateStatus
            });
            window.location.assign('/admin');
        }, () => {
            this.setState({
                modals: newStateModals,
                status: newStateStatus
            });
            alert("hubo un error");
        });
    }

    private _selectAll() {
        if (this.selectedCheckboxes.length !== this.state.sessions.length) {
            this.selectedCheckboxes = this.state.sessions.map(
                (items: ISessionsToDelete) => items.id);
        } else {
            this.selectedCheckboxes = [];
        }
        this.setState({selection: this.selectedCheckboxes});
    }

    private _updateSelection(id: string) {
        const index = this.selectedCheckboxes.indexOf(id);
        if (index !== -1) {
            this.selectedCheckboxes.splice(index, 1);
        } else {
            this.selectedCheckboxes.push(id);
        }
        this.setState({selection: this.selectedCheckboxes})
    }

    private _isSelectionValid(): boolean {
        return !this.state.selection.length;
    }

    private _loadInitialData() {
        const promiseMentor = this.mentorService.mentor(this.mentorId);
        const promiseData = this.interestAreaService.getBasicData(this.mentorId);
        return new Promise((resolve) => {
            Promise.all([promiseMentor, promiseData]).then((values) => {
                resolve(values);
            });
        })
    }
}

export default SessionDeleteMultiple;