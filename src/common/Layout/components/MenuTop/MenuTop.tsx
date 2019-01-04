import * as React from 'react';
import {findDOMNode} from "react-dom";
import UserRepository, {ROL_ADMIN} from "../../../../repository/UserRepository";
import {IListItem} from "../../../FilterList/FilterList";
import SelectList from "../../../SelectList/SelectList";
import './MenuTop.scss';

interface IStateMenu {
    open: boolean;
}

const listAdmin: IListItem[] = [{
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

const menuList = UserRepository.getUser().rol === ROL_ADMIN ? listAdmin : [] as IListItem[];
menuList.push({
    extra: {
        url: '/logout'
    },
    icon: 'off',
    id: 'logout',
    name: 'Salir'
});

class MenuTop extends React.Component <{}, IStateMenu> {
    public state : IStateMenu;
    constructor (props: any) {
       super(props);
       this.state = {
           open: false
       };
       this.toggleMenu = this.toggleMenu.bind(this);
       this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    public componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    public componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    public render() {
        const openClass = this.state.open ? 'MenuTop-nav--open' : '';
        return (
            !!menuList.length && <div className="MenuTop">
                <div className={`MenuTop-nav ${openClass}`} onClick={this.toggleMenu}>
                    <span className="MenuTop-lines">&nbsp;</span>
                    <span className="MenuTop-lines">&nbsp;</span>
                    <span className="MenuTop-lines">&nbsp;</span>
                    <span className="MenuTop-lines">&nbsp;</span>
                </div>
                { this.state.open &&
                <div className="MenuTop-options">
                    <SelectList list={menuList} onChange={this.redirect} style={styleSelectList}/>
                </div>}
            </div>
        )
    }

    private handleClickOutside = (event: any) => {
        const domNode = findDOMNode(this);
        if (!domNode || !domNode.contains(event.target)) {
            this.setState({
                open: false
            });
        }
    };

    private toggleMenu() {
        const state = {...this.state};
        this.setState({open: !state.open});
    }

    private redirect(item: IListItem) {
        window.location.href = item.extra.url;
    }
}

export default MenuTop;
