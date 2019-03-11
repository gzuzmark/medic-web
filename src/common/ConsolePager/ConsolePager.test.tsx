import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import ConsolePager from './ConsolePager';
import {PAGE_ITEMS_RANGE} from "./ConsolePager.const";

describe('ConsolePager Test',() => {
    let props: any;
    let mountedConsolePager: any;
    const getComponent = () => {
        if (!mountedConsolePager) {
            mountedConsolePager = shallow(
                <ConsolePager {...props}>Caja de Mensajes</ConsolePager>
            );
        }
        return mountedConsolePager;
    };

    beforeEach(() => {
        props = {
            activePage: 1,
            onChange: (page: number) => void(0),
            pageSize: 2,
            totalItemsCount: 22
        };
        mountedConsolePager = undefined;
    });

    it("render: render ConsolePager", () => {
        const component = getComponent();
        expect(component.find('.ConsolePager').length).toBe(1);
    });

    it("render: render ConsolePager should be null", () => {
        props = {
            activePage: 1,
            onChange: (page: number) => void(0),
            pageSize: 2,
            totalItemsCount: PAGE_ITEMS_RANGE - 4
        };
        const component = getComponent().find('.ConsolePager');
        expect(component.length).toBe(0);
    });

});
