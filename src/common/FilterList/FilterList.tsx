import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Text } from '../ConsoleText';
import SelectList from "../SelectList/SelectList";
import './FilterList.scss';

export const FILTER_LIST_ALL = 'all';

export interface IFilerListItem {
    id: string;
    name: string | React.ReactElement<any>;
    icon?: string;
    extra?: any;
}
interface IPropsFilterList {
    onChange: (item: IFilerListItem) => void;
    list: IFilerListItem[];
    defaultText: string;
    name: string;
    style?: React.CSSProperties;
    removeFilters?: boolean;
    error?: boolean;
    disabled?: boolean;
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
        const name = this.props.name === 'all' ? '' : this.props.name;
        const disabledClass = this.props.list.length === 0 || this.props.disabled ? 'FilterList-field--disabled' : '';
        const activeClass = this.state.showFilters ? 'FilterList-field--active' : '';
        const color = name !== '' ? 'textNormal' : 'textNormalSoft';
        const notEmptyClass = name === '' ? '' : 'FilterList-field--not-empty';
        const extraPropsSelectList: any = {};
        if (!!this.props.removeFilters) {
            extraPropsSelectList.removeFilters = this.removeFilters;
        }
        return (
            <div className={`FilterList ${this.props.error ? 'FilterList--error' : ''}`} style={{...this.props.style}}>
                <Text color={color}
                      className={`FilterList-field ${activeClass} ${notEmptyClass} ${disabledClass}`}
                      onClick={this.toggleBox}  >
                    {name === '' ? this.props.defaultText : name}
                </Text>
                {this.state.showFilters && !this.props.disabled &&
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
