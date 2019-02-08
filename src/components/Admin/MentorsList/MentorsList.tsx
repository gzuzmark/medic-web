import * as React from 'react';
import { ButtonNormal } from '../../../common/Buttons/Buttons';
import FilterList, {IListItem} from '../../../common/FilterList/FilterList';
import MenuAside from '../../../common/Layout/components/MenuAside/MenuAside';
import Layout from '../../../common/Layout/Layout';
import Loader from '../../../common/Loader/Loader';
import {FONTS} from "../../../common/MentorColor";
import { Headline1 } from '../../../common/MentorText';
import Sticky from '../../../common/Sticky/Sticky';
import { IMentor, ISkill } from '../../../interfaces/Mentor.interface';
import MentorService from '../../../services/Mentor/Mentor.service';
import SkillService from "../../../services/Skill/Skill.service";
import ListMentorsBody from './components/ListMentorBody/ListMentorBody';
import ListMentorsHeader from './components/ListMentorHeader/ListMentorHeader';
import './MentorsList.scss';

interface IStateListMentor {
    mentors: IMentor[];
    skills: ISkill[];
    loading: boolean;
    selectedFilter: string;
}

class MentorsList extends React.Component <{}, IStateListMentor> {
    public state: IStateListMentor;
    private mentorService: MentorService;
    private skillService: SkillService;

    constructor(props: any) {
        super(props);
        this.mentorService = new MentorService();
        this.skillService = new SkillService();
        this.state = {
            loading: true,
            mentors: [],
            selectedFilter: '',
            skills: [],
        };
        this._searchMentors = this._searchMentors.bind(this);
    }

    public componentDidMount() {
        this._searchMentors({id: 'all', name: ''});
        this._listSkills();
    }

    public renderMenu() {
        return (
            <Sticky height={194} top={80} style={{background: 'white'}}>
                <MenuAside baseText={'Mentores'} url={'/admin/mentores'}/>
                <div className='u-LayoutMargin u-ListMentors-padding ListMentors-sticky'>
                    <FilterList
                        onChange={this._searchMentors}
                        list={this.state.skills}
                        defaultText="Filtrar por curso"
                        name={this.state.selectedFilter}
                        style={{width: 504}}
                        removeFilters={true}/>
                    <ButtonNormal text={"Agregar mentor"}
                                  attrs={{onClick: this.goToCreateMentors}}/>
                </div>
                <ListMentorsHeader header={[
                    'Nombre de mentor',
                    'Horas semanales',
                    'Ver sesiones',
                    'Crear sesiones',
                ]}/>
            </Sticky>
        )
    }

    public render() {
        return (
            <Layout menu={this.renderMenu()}>
                <div className="ListMentors">
                    <div className="ListMentors-body u-LayoutMargin">
                        {this.state.loading && (
                            <div className="ListMentors-row ListMentors-row--center">
                                <Loader top={50} height={100}/>
                            </div>
                        )}
                        {!this.state.loading && this.state.mentors.length === 0 && (
                            <div className="ListMentors-row ListMentors-row--center">
                                <Headline1 color={FONTS.medium}>No hay resultados</Headline1>
                            </div>
                        )}
                        {!this.state.loading && this.state.mentors.map((item, index) => {
                            return (
                                <div key={'list-mentor-row' + index}
                                     className="ListMentors-row ListMentors-row--border u-ListMentors-padding">
                                    <ListMentorsBody {...item} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Layout>
        );
    }


    private _searchMentors(item: IListItem) {
        this.setState({loading: true, selectedFilter: item.name}, () => {
            this.mentorService.list(item.id).then((mentors: IMentor[]) => {
                window.scrollTo(0, 0);
                this.setState({
                    loading: false,
                    mentors,
                })
            });
        });
    }

    private _listSkills() {
        this.skillService.list().then((skills: ISkill[]) => {
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
