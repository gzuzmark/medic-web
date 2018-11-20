import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import {STATUS_DAY_SESSIONS} from "../../../../../domain/Session/SessionCollector";
import CardDay, {IPropsCardDay} from './CardDay';


describe('CardDay Test',() => {
    let props: IPropsCardDay;
    let mountedCardDay: any;
    const getComponent = () => {
        if (!mountedCardDay) {
            mountedCardDay = mount(
                <CardDay {...props} />
            );
        }
        return mountedCardDay;
    };

    beforeEach(() => {
        props = {
            click: () => void(0),
            description: {
                bottomText: 'Octubre',
                mainText: '25',
                topText: 'Lunes'
            },
            status: STATUS_DAY_SESSIONS.DEFAULT
        };
        mountedCardDay = undefined;
    });

    it("render: render CardDay no active", () => {
        const component = getComponent();
        expect(component).toMatchSnapshot();
    });

    it("render: render CardDay STATUS ACTIVE", () => {
        props = {...props, status: STATUS_DAY_SESSIONS.ACTIVE };
        const component = getComponent();
        expect(component.find('.CardDay--active').length).toEqual(1);
        expect(component.find('.CardDay--disabled').length).toEqual(0);
        expect(component.find('.CardDay--default').length).toEqual(0);
    });

    it("render: render CardDay STATUS DISABLED", () => {
        props = {...props, status: STATUS_DAY_SESSIONS.DISABLED };
        const component = getComponent();
        expect(component.find('.CardDay--active').length).toEqual(0);
        expect(component.find('.CardDay--disabled').length).toEqual(1);
        expect(component.find('.CardDay--default').length).toEqual(0);
    });

    it("render: render CardDay STATUS DEFAULT", () => {
        props = {...props, status: STATUS_DAY_SESSIONS.DEFAULT };
        const component = getComponent();
        expect(component.find('.CardDay--active').length).toEqual(0);
        expect(component.find('.CardDay--disabled').length).toEqual(0);
        expect(component.find('.CardDay--default').length).toEqual(1);
    });

    it("event: event click should have been called", () => {
        const click = jasmine.createSpy('click');
        props = {...props, click};
        const component = getComponent();
        component.find('.CardDay').simulate('click');
        expect(click).toHaveBeenCalled();
    });
});
