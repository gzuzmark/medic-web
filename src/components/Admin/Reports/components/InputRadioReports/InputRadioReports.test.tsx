import { mount } from 'enzyme';
import * as React from 'react';
import {REPORT_SESSIONS, REPORT_STUDENTS, ReportType} from "../../../../../beans/ReportRequest.bean";
import ConsoleInputRadio from "../../../../../common/ConsoleInputRadio/ConsoleInputRadio";
import InputRadioReports from "./InputRadioReports";


describe('InputRadioReports Test',() => {
    let props: any;
    let mountedInputRadioReports: any;
    const getComponent = () => {
        if (!mountedInputRadioReports) {
            mountedInputRadioReports = mount(
                <InputRadioReports {...props} />
            );
        }
        return mountedInputRadioReports;
    };

    beforeEach(() => {
        props = {
            inputs: [],
            name: 'demo',
            type: '' as ReportType,
            updateState: undefined
        };
        mountedInputRadioReports = undefined;
    });

    it("render: render InputRadioReports", () => {
        const component = getComponent();
        expect(component).toMatchSnapshot();
    });

    it("render: render InputRadioReports with two inputs", () => {
        props = {
            inputs: [{
                title: 'Reporte de sesiones',
                value: REPORT_SESSIONS
            }, {
                title: 'Reporte de alumnos',
                value: REPORT_STUDENTS
            }],
            name: 'demo',
            type: '' as ReportType,
            updateState: undefined
        };
        const component = getComponent();
        const inputs = component.find(ConsoleInputRadio).length;
        expect(inputs).toEqual(2)
    });


    it("events: on change updateState is called", () => {
        const change = jasmine.createSpy('change');
        props = {
            inputs: [{
                title: 'Reporte de sesiones',
                value: REPORT_SESSIONS
            }, {
                title: 'Reporte de alumnos',
                value: REPORT_STUDENTS
            }],
            name: 'demo',
            type: '' as ReportType,
            updateState: change
        };
        const value = {event: {target: {value: REPORT_SESSIONS}}};
        getComponent().find('input').first().simulate('change', value);
        expect(change).toHaveBeenCalled();
    });
});