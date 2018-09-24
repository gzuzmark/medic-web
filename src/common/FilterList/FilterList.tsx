import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Text } from '../ConsoleText';
import SelectList from "../SelectList/SelectList";
import './FilterList.scss';

export const FILTER_LIST_ALL = 'all';

export interface IListItem {
    id: string;
    name: string;
    icon?: string;
    extra?: any;
}

interface IPropsFilterList {
    onChange: (item: IListItem) => void;
    list: IListItem[];
    defaultText: string;
    name: string;
    style?: React.CSSProperties;
    removeFilters?: boolean;
    error?: boolean;
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
        this.filter = this.filter.bind(this);
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
        const activeClass = this.state.showFilters ? 'FilterList-field--active' : '';
        const color = this.props.name !== '' ? 'textNormal' : 'textNormalSoft';
        const notEmptyClass = this.props.name === '' ? '' : 'FilterList-field--not-empty';
        const extraPropsSelectList: any = {};
        if (!!this.props.removeFilters) {
            extraPropsSelectList.removeFilters = this.removeFilters;
        }
        return (
            <div className={`FilterList ${this.props.error ? 'FilterList--error' : ''}`} style={{...this.props.style}}>
                <Text color={color}
                      className={`FilterList-field ${activeClass} ${notEmptyClass} ${disabledClass}`}
                      onClick={this.toggleBox}  >
                    {this.props.name === '' ? this.props.defaultText : this.props.name}
                </Text>
                {this.state.showFilters &&
                    <SelectList
                        list={this.props.list}
                        onChange={this.filter}
                        {...extraPropsSelectList}/> }
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
        this.filter({id: FILTER_LIST_ALL, name: FILTER_LIST_ALL});
    };
}

export default FilterList;
