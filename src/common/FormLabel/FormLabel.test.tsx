import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import FormLabel, {IPropsFormLabel} from "./FormLabel";
import {Body1, Small1} from "../MentorText";


describe('FormLabel Test',() => {
    let props: IPropsFormLabel;
    let mountedReportTable: any;
    const getComponent = () => {
        if (!mountedReportTable) {
            mountedReportTable = mount(
                <FormLabel {...props} />
            );
        }
        return mountedReportTable;
    };

    beforeEach(() => {
        props = {
            info: "Information en Tooltip",
            label: "Label",
            uppercase: false
        };
        mountedReportTable = undefined;
    });

    it("render: should have label in lowercase", () => {
        const component = getComponent();
        expect(component.find(Body1).children().text()).toEqual("Label");
    });

    it("render: should have label in uppercase", () => {
        props = {
            info: "Information en Tooltip",
            label: "Label",
            uppercase: true
        };
        const component = getComponent();
        expect(component.find(Small1).children().text()).toEqual("LABEL");
    });
});
