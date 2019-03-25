import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import Card from "../../../../../common/Card/Card";
import {CARD_STATUS} from "../../../../../domain/Card";
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
            status: CARD_STATUS.DEFAULT,
            today: false
        };
        mountedCardDay = undefined;
    });

    it("event: event click should have been called", () => {
        const click = jasmine.createSpy('click');
        props = {...props, click};
        const component = getComponent();
        component.find(Card).simulate('click');
        expect(click).toHaveBeenCalled();
    });
});
