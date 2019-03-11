import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import Icon from "./Icon";


describe('Icon Test',() => {
    let props: any;
    let mountedReportTable: any;
    const getComponent = () => {
        if (!mountedReportTable) {
            mountedReportTable = mount(
                <Icon {...props} />
            );
        }
        return mountedReportTable;
    };

    beforeEach(() => {
        props = {
            name: 'book'
        };
        mountedReportTable = undefined;
    });

    it("render: render Icon should render correct", () => {
        const component = getComponent();
        expect(component.find('use').length).toBe(1);
    });

});
