import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import ConsoleTableLoader from './ConsoleTableLoader';

describe('ConsoleTableLoader Test',() => {
    let props: any;
    let mountedConsoleTableLoader: any;
    const getComponent = () => {
        if (!mountedConsoleTableLoader) {
            mountedConsoleTableLoader = shallow(
                <ConsoleTableLoader {...props}>Caja de Mensajes</ConsoleTableLoader>
            );
        }
        return mountedConsoleTableLoader;
    };

    beforeEach(() => {
        props = {
            center: false,
            loading: true
        };
        mountedConsoleTableLoader = undefined;
    });

    it("render: render ConsoleTableLoader", () => {
        const component = getComponent();
        expect(component).toMatchSnapshot();
    });

    it("render: render ConsoleTableLoader should have class center", () => {
        props = {
            center: true,
            loading: true
        };
        const component = getComponent().find('.ConsoleTableLoader--center');
        expect(component.length).toBe(1);
    });

    it("render: render ConsoleTableLoader should be null", () => {
        props = {
            center: false,
            loading: false
        };
        const component = getComponent().find('.ConsoleTableLoader');
        expect(component.length).toBe(0);
    });

});