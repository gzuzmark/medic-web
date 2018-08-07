import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Text } from '../ConsoleText';
import './FilterList.scss';

export interface IListItem {
    id: string;
    name: string;
}

interface IPropsFilterList {
    onChange: (item: IListItem) => void;
    list: IListItem[];
    defaultText: string;
    enableClearSearch: boolean;
    name: string;
    style?: React.CSSProperties;
}

interface IStateFilterList {
    showFilters: boolean;
}

class FilterList extends React.Component <IPropsFilterList, IStateFilterList> {
    public state: IStateFilterList;
    constructor(props: IPropsFilterList) {
        super(props);
        this.state = {
            showFilters: false,
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
        const disabledClass = this.props.list.length === 0 ? 'FilterList-field--disabled' : '';
        const hiddenClass = this.state.showFilters ? '' : 'FilterList-list--hidden';
        const activeClass = this.state.showFilters ? 'FilterList-field--active' : '';
        const color = this.props.name !== '' ? 'textNormal' : 'textNormalSoft';
        const notEmptyClass = this.props.name === '' ? '' : 'FilterList-field--not-empty';
        return (
            <div className="FilterList" style={{...this.props.style}}>
                <Text color={color}
                      className={`FilterList-field ${activeClass} ${notEmptyClass} ${disabledClass}`}
                      onClick={this.toggleBox}  >
                    {this.props.name === '' ? this.props.defaultText : this.props.name}
                </Text>
                <ul className={'FilterList-list ' + hiddenClass}>
                    {this.props.list.map((item, index) => {
                        const click = () => {
                            this.filter(item);
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
        if (this.props.list.length > 0 ) {
            this.setState({showFilters: !this.state.showFilters});
        }
    }

    private filter(item: any) {
        if (item.name !== this.props.name) {
            this.props.onChange(item);
        }
        this.setState({ showFilters: false });
    };

    private removeFilters() {
        this.filter({id: 'all', name: ''});
    };
}

export default FilterList;
