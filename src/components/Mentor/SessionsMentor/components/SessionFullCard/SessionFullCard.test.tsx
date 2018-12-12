import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import Icon from "../../../../../common/Icon/Icon";
import SessionFullCard, {IPropsSessionFullCard, ISessionFullCard} from './SessionFullCard';


describe('SessionFullCard Test',() => {
    let props: IPropsSessionFullCard;
    let mountedSessionFullCard: any;
    const sessionFull: ISessionFullCard ={
        title: "Amazing Title",
        type: "ACTIVE"
    };
    const getComponent = () => {
        if (!mountedSessionFullCard) {
            mountedSessionFullCard = mount(
                <SessionFullCard {...props} />
            );
        }
        return mountedSessionFullCard;
    };

    beforeEach(() => {
        props = {
            session: sessionFull
        };
        mountedSessionFullCard = undefined;
    });

    it("render: render SessionFullCard same text at right side", () => {
        const component = getComponent();
        expect(component.find('.SessionFullCard_right').text())
            .toEqual(`${sessionFull.type}${sessionFull.title}`);
    });

    it("render: render SessionFullCard icon at left side", () => {
        const component = getComponent();
        expect(component.find('.SessionFullCard_left').find(Icon).length).toEqual(1);
    });
});
