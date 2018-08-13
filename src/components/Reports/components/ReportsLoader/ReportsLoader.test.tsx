import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import ReportsLoader from './ReportsLoader';

describe('ReportsLoader Test',() => {
    let props: any;
    let mountedReportsLoader: any;
    const getComponent = () => {
        if (!mountedReportsLoader) {
            mountedReportsLoader = shallow(
                <ReportsLoader {...props}>Caja de Mensajes</ReportsLoader>
            );
        }
        return mountedReportsLoader;
    };

    beforeEach(() => {
        props = {
            center: false,
            loading: true
        };
        mountedReportsLoader = undefined;
    });

    it("render: render ReportsLoader", () => {
        const component = getComponent();
        expect(component).toMatchSnapshot();
    });

    it("render: render ReportsLoader should have class center", () => {
        props = {
            center: true,
            loading: true
        };
        const component = getComponent().find('.Reports-loader--center');
        expect(component.length).toBe(1);
    });

    it("render: render ReportsLoader should be null", () => {
        props = {
            center: false,
            loading: false
        };
        const component = getComponent().find('.ReportsLoader');
        expect(component.length).toBe(0);
    });

});