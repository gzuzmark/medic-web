import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import MenuTop from './MenuTop';

describe('MenuTop Test',() => {
    let props: any;
    let mountedMenuTop: any;
    const menuTop = () => {
        if (!mountedMenuTop) {
            mountedMenuTop = mount(
                <MenuTop {...props} />
            );
        }
        return mountedMenuTop;
    };

    beforeEach(() => {
        props = {};
        mountedMenuTop = undefined;
    });

    it("render: render MenuAside nav", () => {
        const divs = menuTop().find(".MenuTop-nav");
        expect(divs.length).toEqual(1)
    });

    it("render: shouldn't render MenuTop options", () => {
        const divs = menuTop().find('.MenuTop-options');
        expect(divs.length).toEqual(0)
    });

    it("render: the MenuTop nav shouldn't have the open class", () => {
        const divs = menuTop().find('.MenuTop-nav.MenuTop-nav--open');
        expect(divs.length).toEqual(0)
    });

    it("events: the MenuTop nav should have the open class", () => {
        menuTop().find(".MenuTop-nav").simulate('click');
        const divs = menuTop().find('.MenuTop-nav.MenuTop-nav--open');
        expect(divs.length).toEqual(1)
    });

    it("events: should render MenuTop options on click", () => {
        menuTop().find(".MenuTop-nav").simulate('click');
        const divs = menuTop().find('.MenuTop-options');
        expect(divs.length).toEqual(1)
    });

    it("events: should close MenuTop options on second click", () => {
        menuTop().find(".MenuTop-nav").simulate('click').simulate('click');
        const divs = menuTop().find('.MenuTop-options');
        expect(divs.length).toEqual(0)
    });
});