import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Text } from '../../../../common/ConsoleText';
import { ISkill } from '../../../../interfaces/MentorSession.interface';
import './FilterList.scss';

interface IPropsFilterList {
    onChange: (skill: string) => void;
    skills: ISkill[];
}

interface IStateFilterList {
    showFilters: boolean;
}

class FilterList extends React.Component <IPropsFilterList, IStateFilterList> {
    public state: IStateFilterList;
    constructor(props: IPropsFilterList) {
        super(props);
        this.state = {
            showFilters: false
        };
        this.toggleBox = this.toggleBox.bind(this);
        this.removeFilters = this.removeFilters.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    public componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    public componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    public render() {
        const hiddenClass = this.state.showFilters ? '' : 'FilterList-list--hidden';
        return <div className="FilterList u-LayoutMargin u-ListMentors-padding">
            <Text color="textNormalSoft"
                  className="FilterList-field"
                  onClick={this.toggleBox}  >
                Filtrar por curso
            </Text>
            <ul className={'FilterList-list ' + hiddenClass}>
                <li className="FilterList-list_item" onClick={this.removeFilters}>
                    <Text>Mostrar todo</Text>
                </li>
                {this.props.skills.map((item, index) => {
                    const click = () => {
                        this.props.onChange(item.id);
                        this.setState({showFilters: false});
                    };
                    return (
                        <li key={'filter-list-' + index}
                            className="FilterList-list_item"
                            onClick={click}>
                            <Text>{item.name}</Text>
                        </li>
                    );
                })}
            </ul>
        </div>;
    }

    private handleClickOutside = (event: any) => {
        const domNode = findDOMNode(this);
        if (!domNode || !domNode.contains(event.target)) {
            this.setState({
                showFilters : false
            });
        }
    }

    private toggleBox() {
        this.setState({showFilters: !this.state.showFilters})
    }

    private removeFilters() {
        this.props.onChange('all');
        this.setState({showFilters: false});
    };
}

export default FilterList;
