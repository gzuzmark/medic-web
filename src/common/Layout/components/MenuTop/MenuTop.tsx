import * as React from 'react';
import {findDOMNode} from "react-dom";
import styled from "styled-components";
import UserRepository, {ROL_ADMIN} from "../../../../repository/UserRepository";
import {IFilerListItem} from "../../../FilterList/FilterList";
import Icon from "../../../Icon/Icon";
import colors from "../../../MentorColor";
import {LIGHT_TEXT, Subhead1} from '../../../MentorText';
import SelectList from "../../../SelectList/SelectList";
import './MenuTop.scss';

interface IPropsMenuTop {
    warningProfile: boolean;
}

interface IStateMenuTop {
    open: boolean;
}

const ItemContainer = styled.div`
    align-items: center;
    display: flex;
`;

const listAdmin: IFilerListItem[] = [{
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

class MenuTop extends React.Component <IPropsMenuTop, IStateMenuTop> {
    public state : IStateMenuTop;
    private styleSelectList: React.CSSProperties;
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

        this.styleSelectList = {
            boxShadow: 'none',
            position: 'relative',
            top: 0,
        };
        const listMentor = [{
            extra: {
                url: '/mentor/perfil'
            },
            icon: 'user',
            id: 'profile_mentor',
            name: this.props.warningProfile ? <ItemContainer>
                <Subhead1 weight={LIGHT_TEXT}>Mi perfil</Subhead1>
                <Icon style={{fill: colors.TEXT_COLORS.font_error, marginLeft: 3}} name={"alert"}/>
            </ItemContainer> : 'Mi perfil'
        }];

        const menuList = UserRepository.getUser().rol === ROL_ADMIN ? [...listAdmin] : listMentor;
        menuList.push({
            extra: {
                url: '/logout'
            },
            icon: 'off',
            id: 'logout',
            name: 'Salir'
        });
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
                    <SelectList list={menuList} onChange={this.redirect} style={this.styleSelectList}/>
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

    private redirect(item: IFilerListItem) {
        window.location.href = item.extra.url;
    }
}

export default MenuTop;
