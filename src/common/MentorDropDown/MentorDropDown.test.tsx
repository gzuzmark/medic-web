import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import {Small1} from "../MentorText";
import MentorDropDown, {IPropsMentorDropDown} from "./MentorDropDown";


describe('MentorDropDown Test',() => {
    let props: IPropsMentorDropDown;
    let mountedReportTable: any;
    const getComponent = () => {
        if (!mountedReportTable) {
            mountedReportTable = shallow(
                <MentorDropDown {...props} />
            );
        }
        return mountedReportTable;
    };

    beforeEach(() => {
        props = {
            name: "Opciones",
            options: [
                {label: "Opcion 1", value: "opcion1"},
                {label: "Opcion 2", value: "opcion2"}
            ],
            triggerChange: () => ''
        };
        mountedReportTable = undefined;
    });

    it("render: label should be 'Elegir Opción'", () => {
        props = {...props, label: "Elegir Opción"};
        const component = getComponent();
        expect(component.find("label").find(Small1).children().text()).toEqual("Elegir Opción");
    });

    it("render: error should be 'Esta mal'", () => {
        props = {...props, error: "Esta mal"};
        const component = getComponent();
        expect(component.find(Small1).children().text()).toEqual("Esta mal");
    });
});
