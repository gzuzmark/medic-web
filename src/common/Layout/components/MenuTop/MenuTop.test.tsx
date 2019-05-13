import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import ItemMenuTop from "../ItemMenuTop/ItemMenuTop";
import MenuTop from './MenuTop';

describe('MenuTop Test',() => {
    let props: any;
    let mountedMenuTop: any;
    const menuTop = () => {
        if (!mountedMenuTop) {
            mountedMenuTop = shallow(
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
        const divs = menuTop().find(ItemMenuTop);
        expect(divs.length).toEqual(3)
    });

});
