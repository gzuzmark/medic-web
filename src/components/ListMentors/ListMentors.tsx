import * as React from 'react';
import { BoldText } from '../../common/ConsoleText';
import Layout from '../../common/Layout/Layout';
import Loader from '../../common/Loader/Loader';
import Menu from '../../common/Menu/Menu';
import Sticky from '../../common/Sticky/Sticky';
import { IMentorSession, SkillsDummy } from '../../interfaces/MentorSession.interface';
import UserRepository from "../../repository/UserRepository";
import MentorSessionService from '../../services/MentorSession/MentorSession.service';
import FilterList from './components/FilterList/FilterList';
import ListMentorsBody from './components/ListMentorBody/ListMentorBody';
import ListMentorsHeader from './components/ListMentorHeader/ListMentorHeader';
import './ListMentors.scss';

interface IStateListMentor {
    mentors: IMentorSession[];
    loading: boolean;
}

class ListMentors extends React.Component <{}, IStateListMentor> {
    public state: IStateListMentor;
    private mentorSessionService: MentorSessionService;

    constructor(props: any) {
        super(props);
        this.mentorSessionService = new MentorSessionService();
        this.state = {
            loading: true,
            mentors: []
        };
        this._searchMentors = this._searchMentors.bind(this);
    }

    public componentDidMount() {
        this._searchMentors('all');
    }

    public renderMenu() {
        return (
            <Sticky height={140} top={60}>
                <Menu textNavigation={'Calendario de sesiones de ' + UserRepository.getUser().name}/>
                <FilterList onChange={this._searchMentors} skills={SkillsDummy} />
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
            this.mentorSessionService.list(skillName).then((mentors: IMentorSession[]) => {
                this.setState({
                    loading: false,
                    mentors,
                })
            });
        });
    }
}

export default ListMentors;
