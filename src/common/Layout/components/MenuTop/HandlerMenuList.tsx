import * as React from 'react';
import styled from "styled-components";
import UserRepository, {ROL_ADMIN} from "../../../../repository/UserRepository";
import Icon from "../../../Icon/Icon";
import colors from "../../../MentorColor";
import {LIGHT_TEXT, Subhead1} from "../../../MentorText";

const ItemContainer = styled.div`
    align-items: center;
    display: flex;
`;

export interface IMenuListItem {
    id: string;
    name: string | React.ReactElement<any>;
    icon?: string;
    url?: any;
    children?: IMenuListItem[];
}

const UseHandlerMenuList = (warningProfile: boolean) => {
    let menuList: IMenuListItem[] = [];
    const updateMenuList = () => {
        const listAdmin: IMenuListItem[] = [{
            icon: 'paper-pencil',
            id: 'coupons',
            name: 'Cupones',
            url: '/coupons'
        },{
            icon: 'calendar',
            id: 'session',
            name: 'Citas',
            url: '/sessions'
        },{
            icon: 'book',
            id: 'mentor',
            name: 'Doctores',
            url: '/admin/doctores'
        },{
            icon: 'user',
            id: 'patient',
            name: 'Pacientes',
            url: '/patients'
        }, {
            icon: 'report',
            id: 'report',
            name: 'Reportes',
            url: '/admin/reportes'
        },
        // {
        //     children: [{
        //         id: 'room',
        //         name: 'Aulas',
        //         url: '/admin/aulas'
        //     }],
        //     icon: 'order',
        //     id: 'admin',
        //     name: 'Administración'
        // }
        ];
        const listMentor = [{
            icon: 'users',
            id: 'users',
            name: 'Pacientes',
            url: '/doctor/pacientes'
        }, {
            icon: 'user',
            id: 'profile_mentor',
            name: warningProfile ? <ItemContainer >
                <Subhead1 weight={LIGHT_TEXT}>Mi perfil</Subhead1>
                <Icon style={{fill: colors.TEXT_COLORS.font_error, marginLeft: 3}} name={"alert"}/>
            </ItemContainer> : 'Mi perfil',
            url: '/doctor/perfil'
        }];
        menuList = UserRepository.getUser().rol === ROL_ADMIN ? listAdmin : listMentor;
        menuList.push({
            icon: 'off',
            id: 'logout',
            name: 'Salir',
            url: '/logout'
        });
    };
    updateMenuList();
    return menuList;
};

export default UseHandlerMenuList;
