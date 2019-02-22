import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import Loader, {IPropsLoader} from "./Loader";


describe('Loader Test',() => {
    let props: IPropsLoader;
    let mountedReportTable: any;
    const getComponent = () => {
        if (!mountedReportTable) {
            mountedReportTable = mount(
                <Loader {...props} />
            );
        }
        return mountedReportTable;
    };

    beforeEach(() => {
        props = {};
        mountedReportTable = undefined;
    });

    it("render: should have three childs", () => {
        const component = getComponent();
        expect(component.find('div > div').length).toEqual(3);
    });
});
