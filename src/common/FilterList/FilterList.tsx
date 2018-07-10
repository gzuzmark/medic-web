import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Text } from '../ConsoleText';
import './FilterList.scss';

interface IListItem {
    id: string;
    name: string;
}

interface IPropsFilterList {
    onChange: (skill: string) => void;
    skills: IListItem[];
    defaultText: string;
    enableClearSearch: boolean;
    name?: string;
    style?: React.CSSProperties;
}

interface IStateFilterList {
    showFilters: boolean;
    name: string;
}

class FilterList extends React.Component <IPropsFilterList, IStateFilterList> {
    public state: IStateFilterList;
    constructor(props: IPropsFilterList) {
        super(props);
        this.state = {
            name: '',
            showFilters: false,
        };
        this.toggleBox = this.toggleBox.bind(this);
        this.removeFilters = this.removeFilters.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        if (this.props.name) {
            this.setState({name: this.props.name})
        }
    }

    public componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    public componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    public render() {
        const hiddenClass = this.state.showFilters ? '' : 'FilterList-list--hidden';
        const activeClass = this.state.showFilters ? 'FilterList-field--active' : '';
        const color = this.state.name !== '' ? 'textNormal' : 'textNormalSoft';
        return (
            <div className="FilterList" style={{...this.props.style}}>
                <Text color={color}
                      className={'FilterList-field ' + activeClass}
                      onClick={this.toggleBox}  >
                    {this.state.name === '' ? this.props.defaultText : this.state.name}
                </Text>
                <ul className={'FilterList-list ' + hiddenClass}>
                    {this.props.skills.map((item, index) => {
                        const click = () => {
                            this.filterMentors(item.id, item.name);
                        };
                        return (
                            <li key={'filter-list-' + index}
                                className="FilterList-list_item"
                                onClick={click}>
                                <Text className="FilterList-list_item--text">{item.name}</Text>
                            </li>
                        );
                    })}
                    {this.props.enableClearSearch &&
                    <li className="FilterList-list_item" onClick={this.removeFilters}>
                        <Text className="FilterList-list_item--text">Mostrar todo</Text>
                    </li>}
                </ul>
            </div>
        );
    }

    private handleClickOutside = (event: any) => {
        const domNode = findDOMNode(this);
        if (!domNode || !domNode.contains(event.target)) {
            this.setState({
                showFilters : false
            });
        }
    };

    private toggleBox() {
        this.setState({showFilters: !this.state.showFilters})
    }

    private filterMentors(id: string, name: string) {
        if (name !== this.state.name) {
            this.props.onChange(id);
        }
        this.setState({showFilters: false, name});
    };

    private removeFilters() {
        this.filterMentors('all', '');
    };
}

export default FilterList;
