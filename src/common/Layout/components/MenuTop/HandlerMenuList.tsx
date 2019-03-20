import * as React from 'react';
import styled from "styled-components";
import UserRepository, {ROL_ADMIN} from "../../../../repository/UserRepository";
import {IFilerListItem} from "../../../FilterList/FilterList";
import Icon from "../../../Icon/Icon";
import colors from "../../../MentorColor";
import {LIGHT_TEXT, Subhead1} from "../../../MentorText";

const ItemContainer = styled.div`
    align-items: center;
    display: flex;
`;

const UseHandlerMenuList = (warningProfile: boolean) => {
    let menuList: IFilerListItem[] = [];
    const updateMenuList = () => {
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
        const listMentor = [{
            extra: {
                url: '/mentor/perfil'
            },
            icon: 'user',
            id: 'profile_mentor',
            name: warningProfile ? <ItemContainer >
                <Subhead1 weight={LIGHT_TEXT}>Mi perfil</Subhead1>
                <Icon style={{fill: colors.TEXT_COLORS.font_error, marginLeft: 3}} name={"alert"}/>
            </ItemContainer> : 'Mi perfil'
        }];
        menuList = UserRepository.getUser().rol === ROL_ADMIN ? listAdmin : listMentor;
        menuList.push({
            extra: {
                url: '/logout'
            },
            icon: 'off',
            id: 'logout',
            name: 'Salir'
        });
    };
    updateMenuList();
    return menuList;
};

export default UseHandlerMenuList;
