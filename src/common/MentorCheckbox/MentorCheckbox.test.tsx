import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import {Body1} from "../MentorText";
import MentorCheckbox, {IPropsMentorCheckbox} from "./MentorCheckbox";


describe('MentorCheckbox Test',() => {
    let props: IPropsMentorCheckbox;
    let mountedReportTable: any;
    const getComponent = () => {
        if (!mountedReportTable) {
            mountedReportTable = mount(
                <MentorCheckbox {...props} />
            );
        }
        return mountedReportTable;
    };

    beforeEach(() => {
        props = {
            text: "Seleccionar check"
        };
        mountedReportTable = undefined;
    });

    it("render: label should be 'Seleccionar check'", () => {
        const component = getComponent();
        expect(component.find(Body1).children().text()).toEqual("Seleccionar check");
    });

    it("render: label should be 'Seleccionar check'", () => {
        props = {...props, disabled: true};
        const component = getComponent();
        expect(component.find('input').props().disabled).toEqual("");
    });
});
