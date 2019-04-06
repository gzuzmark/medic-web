import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import {SessionMentorBean} from "../../../../../domain/Session/SessionMentorBean";
import {sessionMentorDummy} from "../../../../../domain/Session/SessionMentorBean.dummy";
import CardSession, {IPropsCardSession} from './CardSession';


describe('CardSession Test',() => {
    let props: IPropsCardSession;
    let mountedCardSession: any;
    const getComponent = () => {
        if (!mountedCardSession) {
            mountedCardSession = mount(
                <CardSession {...props} />
            );
        }
        return mountedCardSession;
    };

    beforeEach(() => {
        props = {
            item: new SessionMentorBean(sessionMentorDummy),
            link: "https://ugo.lacafetalab.pe/"
        };
        mountedCardSession = undefined;
    });

    it("render: render CardSession RESOLVE", () => {
        const session = {...sessionMentorDummy};
        const from = new Date();
        const to = new Date();
        from.setFullYear(from.getFullYear() - 1);
        to.setFullYear(to.getFullYear() - 1);
        to.setHours(to.getHours() + 2);
        session.from = from.toISOString();
        session.to = to.toISOString();
        props.item = new SessionMentorBean(session);
        const component = getComponent();
        expect(component.find('.CardSession_options-button').length).toEqual(1);
        expect(component.find('.CardSession_options-button').text()).toEqual('Editar asistencia');
    });

    it("render: render CardSession ACTIVE", () => {
        const session = {...sessionMentorDummy};
        const from = new Date();
        const to = new Date();
        from.setHours(from.getHours() - 1);
        to.setHours(to.getHours() + 1);
        session.from = from.toISOString();
        session.to = to.toISOString();
        props.item = new SessionMentorBean(session);
        const component = getComponent();
        expect(component.find('.CardSession_options-button').length).toEqual(1);
        expect(component.find('.CardSession_options-button').text()).toEqual('Tomar asistencia');
    });

    it("render: render CardSession PENDING", () => {const session = {...sessionMentorDummy};
        const from = new Date();
        const to = new Date();
        from.setFullYear(from.getFullYear() + 1);
        to.setFullYear(to.getFullYear() + 1);
        to.setHours(to.getHours() + 2);
        session.from = from.toISOString();
        session.to = to.toISOString();
        session.isActive = true;
        props.item = new SessionMentorBean(session);
        const component = getComponent();
        expect(component.find('.CardSession_options-button').length).toEqual(1);
        expect(component.find('.CardSession_options-button').text()).toEqual('Ver alumnos');
    });

    it("render: render CardSession RESOLVE is not Active", () => {const session = {...sessionMentorDummy};
        const from = new Date();
        const to = new Date();
        from.setFullYear(from.getFullYear() + 1);
        to.setFullYear(to.getFullYear() + 1);
        to.setHours(to.getHours() + 2);
        session.from = from.toISOString();
        session.to = to.toISOString();
        session.isActive = false;
        props.item = new SessionMentorBean(session);
        const component = getComponent();
        expect(component.find('.CardSession_options-button').length).toEqual(1);
        expect(component.find('.CardSession_options-button').text()).toEqual('Editar asistencia');
    });

});
