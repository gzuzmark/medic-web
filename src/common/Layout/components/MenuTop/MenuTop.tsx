import * as React from 'react';
import {IListItem} from "../../../FilterList/FilterList";
import SelectList from "../../../SelectList/SelectList";
import './MenuTop.scss';

interface IStateMenu {
    open: boolean;
}

const list: IListItem[] = [{
    extra: {
        url: '/admin/mentores'
    },
    icon: 'book',
    id: 'mentor',
    name: 'Mentores'
}, {
    extra: {
        url: '/admin/reportes'
    },
    icon: 'report',
    id: 'report',
    name: 'Reportes'
}];

const styleSelectList: React.CSSProperties = {
    boxShadow: 'none',
    position: 'relative',
    top: 0,
};

class MenuTop extends React.Component <{}, IStateMenu> {
    public state : IStateMenu;
    constructor (props: any) {
       super(props);
       this.state = {
           open: false
       };
       this.toggleMenu = this.toggleMenu.bind(this);
    }

    public render() {
        const openClass = this.state.open ? 'MenuTop-nav--open' : '';
        return (
            <div className="MenuTop">
                <div className={`MenuTop-nav ${openClass}`} onClick={this.toggleMenu}>
                    <span className="MenuTop-lines">&nbsp;</span>
                    <span className="MenuTop-lines">&nbsp;</span>
                    <span className="MenuTop-lines">&nbsp;</span>
                    <span className="MenuTop-lines">&nbsp;</span>
                </div>
                { this.state.open &&
                <div className="MenuTop-options">
                    <SelectList list={list} onChange={this.redirect} style={styleSelectList}/>
                </div>}
            </div>
        )
    }

    private toggleMenu() {
        const state = {...this.state};
        this.setState({open: !state.open});
    }

    private redirect(item: IListItem) {
        window.location.href = item.extra.url;
    }
}

export default MenuTop;