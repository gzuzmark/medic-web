import * as React from 'react';
import { ButtonNormal } from '../../../common/Buttons/Buttons';
import MenuAside from "../../../common/Layout/components/MenuAside/MenuAside";
import Layout from '../../../common/Layout/Layout';
import Loader from '../../../common/Loader/Loader';
import {default as colors, FONTS} from "../../../common/MentorColor";
import MentorDropDown, {IPropsMentorOptionsDropDown} from "../../../common/MentorDropDown/MentorDropDown";
import { Headline1 } from '../../../common/MentorText';
import Sticky from '../../../common/Sticky/Sticky';
import {IMentorBase, MENTOR_STATUS} from "../../../domain/Mentor/MentorBase";
import {ISkill} from "../../../domain/Skill/Skill";
import MentorRepository from "../../../repository/MentorsRepository";
import MentorService from '../../../services/Mentor/Mentor.service';
import SkillService from "../../../services/Skill/Skill.service";
import ListMentorsBody from './components/ListMentorBody/ListMentorBody';
import ListMentorsHeader from './components/ListMentorHeader/ListMentorHeader';
import './MentorsList.scss';

interface IStateListMentor {
    mentors: IMentorBase[];
    filteredMentors: IMentorBase[];
    skills: IPropsMentorOptionsDropDown[];
    loading: boolean;
    selectedFilter: string;
}

class MentorsList extends React.Component <{}, IStateListMentor> {
    public state: IStateListMentor;
    private mentorService: MentorService;
    private skillService: SkillService;
    private newMentors: string[];
    private counter: number;

    constructor(props: any) {
        super(props);
        this.mentorService = new MentorService();
        this.skillService = new SkillService();
        this.state = {
            filteredMentors: [],
            loading: true,
            mentors: [],
            selectedFilter: '',
            skills: [],
        };
        this.counter = 0;
        this._searchMentors = this._searchMentors.bind(this);
    }

    public componentDidMount() {
        this.loadMentors();
        this.loadSkills();
        this.newMentors = MentorRepository.addedMentorsGet();
        MentorRepository.addedMentorsClean();
    }

    public renderMenu() {
        return (
            <Sticky height={244} top={80} style={{background: 'white'}}>
                <MenuAside baseText={'Mentores'} url={'/admin/mentores'}/>
                <div className='u-LayoutMargin u-ListMentors_padding ListMentors_sticky'>
                    <MentorDropDown
                        options={this.state.skills}
                        value={this.state.selectedFilter !== 'all' ? this.state.selectedFilter : ''}
                        name={"mentors-list"}
                        triggerChange={this._searchMentors}
                        isSearchable={true}
                        style={{width: 500}}
                        placeholder={"Filtrar por curso"}/>
                    <ButtonNormal text={"Agregar mentor"}
                                  attrs={{onClick: this.goToCreateMentors}}/>
                </div>
                <ListMentorsHeader header={[
                    'NOMBRE DE MENTOR',
                    'HORAS SEMANALES',
                    'VER SESIONES',
                    'CREAR SESIONES',
                ]}/>
            </Sticky>
        )
    }

    public render() {
        return (
            <Layout menu={this.renderMenu()}>
                <div className="ListMentors">
                    <div className="ListMentors_body u-LayoutMargin">
                        {this.state.loading && (
                            <div className="ListMentors_row ListMentors_row--center">
                                <Loader />
                            </div>
                        )}
                        {!this.state.loading && this.state.filteredMentors.length === 0 && (
                            <div className="ListMentors_row ListMentors_row--center">
                                <Headline1 color={FONTS.medium}>No hay resultados</Headline1>
                            </div>
                        )}
                        {!this.state.loading && this.state.filteredMentors.map((item, index) => {
                            const newMentorStyle =  this.newMentors.indexOf(item.id) !== -1 ? {order: --this.counter, background: colors.MISC_COLORS.background_grey_1} : {};
                            const disableStyle =  item.status === MENTOR_STATUS.DISABLED ? {borderBottom: `1px solid ${colors.MISC_COLORS.background_grey_1}`} : {borderBottom: `1px solid ${colors.MISC_COLORS.background_grey_2}`};
                            return (
                                <div key={'list-mentor-row' + index}
                                     className={`ListMentors_row ListMentors_row--border u-ListMentors_padding`}
                                     style={{...newMentorStyle, ...disableStyle}}>
                                    <ListMentorsBody mentor={item}/>
                                </div>);
                        })}
                    </div>
                </div>
            </Layout>
        );
    }

    private loadMentors() {
        this.setState({loading: true});
        this.mentorService.list('all').then((mentors: IMentorBase[]) => {
            window.scrollTo(0, 0);
            const mentorsDisabled = mentors.filter((mentor: IMentorBase) => mentor.status === MENTOR_STATUS.DISABLED);
            const mentorsNoDisabled = mentors.filter((mentor: IMentorBase) => mentor.status !== MENTOR_STATUS.DISABLED);
            this.setState({
                filteredMentors: [...mentorsNoDisabled, ...mentorsDisabled],
                loading: false,
                mentors,
            })
        });
    }

    private _searchMentors(name: string, option: IPropsMentorOptionsDropDown) {
        if (this.state.selectedFilter !== option.value) {
            this.setState({selectedFilter: option.value}, () => {
                window.scrollTo(0, 0);
                const mentors = [...this.state.mentors];
                let filteredMentors = [] as IMentorBase[];
                if (option.value === "all") {
                    filteredMentors = mentors
                } else {
                    filteredMentors = mentors.filter((mentor: IMentorBase) => {
                        const skills = mentor.skills ? mentor.skills.map(s => s.id) : [];
                        return skills.indexOf(option.value) !== -1;
                    })
                }

                this.setState({filteredMentors});

            });
        }
    }

    private loadSkills() {
        this.skillService.list().then((values: ISkill[]) => {
            const skills = values.map((v) => ({label: v.name, value: v.id}));
            skills.push({label: 'Todos', value: 'all'});
            this.setState({
                skills
            })
        });
    }

    private goToCreateMentors() {
        window.location.assign('/admin/agregar-mentor');
    }
}

export default MentorsList;
