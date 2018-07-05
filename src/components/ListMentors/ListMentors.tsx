import * as React from 'react';
import { BoldText } from '../../common/ConsoleText';
import Layout from '../../common/Layout/Layout';
import Loader from '../../common/Loader/Loader';
import Menu from '../../common/Menu/Menu';
import Sticky from '../../common/Sticky/Sticky';
import { IMentor, ISkill } from '../../interfaces/Mentor.interface';
import MentorService from '../../services/Mentor/Mentor.service';
import SkillService from "../../services/Skill/Skill.service";
import FilterList from './components/FilterList/FilterList';
import ListMentorsBody from './components/ListMentorBody/ListMentorBody';
import ListMentorsHeader from './components/ListMentorHeader/ListMentorHeader';
import './ListMentors.scss';

interface IStateListMentor {
    mentors: IMentor[];
    skills: ISkill[];
    loading: boolean;
}

class ListMentors extends React.Component <{}, IStateListMentor> {
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
            skills: []
        };
        this._searchMentors = this._searchMentors.bind(this);
    }

    public componentDidMount() {
        this._searchMentors('all');
        this._listSkills();
    }

    public renderMenu() {
        return (
            <Sticky height={140} top={60}>
                <Menu baseText={'Mentores'} url={'/admin/mentores'}/>
                <div className='u-LayoutMargin u-ListMentors-padding'>
                    <FilterList onChange={this._searchMentors} skills={this.state.skills} />
                </div>
                <ListMentorsHeader header={[
                    'Nombre de mentor',
                    'Sesiones semanales',
                    'Ver sesiones',
                    'Agregar sesión',
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
                                <BoldText color="textNormalSoft" className="ListMentors-bigtext">No hay resultados</BoldText>
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


    private _searchMentors(skillName: string) {
        this.setState({loading: true}, () => {
            this.mentorService.list(skillName).then((mentors: IMentor[]) => {
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
}

export default ListMentors;
