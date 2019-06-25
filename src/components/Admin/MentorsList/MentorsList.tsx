import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import { ButtonNormal } from '../../../common/Buttons/Buttons';
import MenuAside from "../../../common/Layout/components/MenuAside/MenuAside";
import Layout from '../../../common/Layout/Layout';
import Loader from '../../../common/Loader/Loader';
import {default as colors, FONTS} from "../../../common/MentorColor";
import MentorDropDown, {IPropsMentorOptionsDropDown} from "../../../common/MentorDropDown/MentorDropDown";
import { Headline1 } from '../../../common/MentorText';
import Sticky from '../../../common/Sticky/Sticky';
import {IMentorBase, IMentorPaginated, MENTOR_STATUS} from "../../../domain/Mentor/MentorBase";
import {ISkill} from "../../../domain/Skill/Skill";
import MentorRepository from "../../../repository/MentorsRepository";
import MentorService from '../../../services/Mentor/Mentor.service';
import SkillService from "../../../services/Skill/Skill.service";
import ListMentorsBody from './components/ListMentorBody/ListMentorBody';
import ListMentorsHeader from './components/ListMentorHeader/ListMentorHeader';
import './MentorsList.scss';

interface IStateListMentor {
    mentors: IMentorBase[] | null;
    skills: IPropsMentorOptionsDropDown[];
    loading: boolean;
    selectedFilter: string;
    hasMore: boolean;
}

const PAGE_SIZE = 30;

class MentorsList extends React.Component <{}, IStateListMentor> {
    public state: IStateListMentor;
    private mentorService: MentorService;
    private skillService: SkillService;
    private newMentors: string[];
    private counter: number;
    private scroller: any;
    constructor(props: any) {
        super(props);
        this.mentorService = new MentorService();
        this.skillService = new SkillService();
        this.state = {
            hasMore: true,
            loading: false,
            mentors: null,
            selectedFilter: 'all',
            skills: [],
        };
        this.counter = 0;
        this.scroller = React.createRef();
        this.changeSkill = this.changeSkill.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.listMentors = this.listMentors.bind(this);
    }

    public componentDidMount() {
        this.loadSkills();
        this.newMentors = MentorRepository.addedMentorsGet();
        MentorRepository.addedMentorsClean();
        window.scrollTo(0, 0);
    }

    public renderMenu() {
        return (
            <Sticky height={244} top={80} style={{background: 'white'}}>
                <MenuAside  icon={'book'}
                            items={[{text: 'Mentores', url: '/admin/mentores'}]} />
                <div className='u-LayoutMargin u-ListMentors_padding ListMentors_sticky'>
                    <MentorDropDown
                        options={this.state.skills}
                        value={this.state.selectedFilter !== 'all' ? this.state.selectedFilter : ''}
                        name={"mentors-list"}
                        triggerChange={this.changeSkill}
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
                    <InfiniteScroll
                        pageStart={0}
                        initialLoad={true}
                        ref={scroller => this.scroller = scroller}
                        loadMore={this.loadNextPage}
                        hasMore={this.state.hasMore}
                        loader={
                            <div className="ListMentors_row ListMentors_row--center">
                                <Loader />
                            </div>}>
                        {this.listMentors()}
                    </InfiniteScroll>
                </div>
            </Layout>
        );
    }

    private listMentors() {
        return (
            <div className="ListMentors_body u-LayoutMargin">
                {!this.state.loading && this.state.mentors && this.state.mentors.length === 0 && (
                    <div className="ListMentors_row ListMentors_row--center">
                        <Headline1 color={FONTS.medium}>No hay resultados</Headline1>
                    </div>
                )}
                {!this.state.loading && this.state.mentors && this.state.mentors.map((item, index) => {
                    const newMentorStyle =  this.newMentors.indexOf(item.id) !== -1 ? {order: --this.counter, background: colors.MISC_COLORS.background_grey_1} : {};
                    const disableStyle =  item.status === MENTOR_STATUS.DISABLED ? {borderBottom: `1px solid ${colors.MISC_COLORS.background_grey_1}`} : {borderBottom: `1px solid ${colors.MISC_COLORS.background_grey_2}`};
                    return (
                        <div key={'list-mentor-row' + index}
                             className={`ListMentors_row ListMentors_row--border u-ListMentors_padding`}
                             style={{...newMentorStyle, ...disableStyle}}>
                            <ListMentorsBody mentor={item}/>
                        </div>);
                })}
                {this.state.loading &&
                <div className="ListMentors_row ListMentors_row--center">
                    <Loader />
                </div>}
            </div>
        )
    }

    private loadNextPage(page: number) {
        this.mentorService.list(this.state.selectedFilter, page, PAGE_SIZE).then((response: IMentorPaginated) => {
            const mentors = response.items;
            if(mentors) {
                const currentMentors = !this.state.mentors ? [] : this.state.mentors;
                const newMentors = [...currentMentors, ...mentors];
                const hasMore =  this.scroller.pageLoaded * PAGE_SIZE < response.totalItems;
                this.setState({
                    hasMore,
                    loading: false,
                    mentors: newMentors.filter((item) => !!item),
                })
            } else {
                this.setState({hasMore: false})
            }
        });
    }

    private changeSkill(name: string, option: IPropsMentorOptionsDropDown) {
        window.scrollTo(0, 0);
        this.setState({loading: true, selectedFilter: option.value, hasMore: false}, () => {
            this.mentorService.list(option.value, 1, PAGE_SIZE).then((response: IMentorPaginated) => {
                this.scroller.pageLoaded = 1;
                const hasMore =  this.scroller.pageLoaded * PAGE_SIZE < response.totalItems;
                this.setState({
                    hasMore,
                    loading: false,
                    mentors: response.items
                })
            });
        });
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
