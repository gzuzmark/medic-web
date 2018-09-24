import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import {REPORT_SESSIONS} from "../../../../beans/ReportRequest.bean";
import Dummy from "../../Report.dummy";
import ReportTable from './ReportTable';


describe('ReportTable Test',() => {
    let props: any;
    let mountedReportTable: any;
    const getComponent = () => {
        if (!mountedReportTable) {
            mountedReportTable = mount(
                <ReportTable {...props} />
            );
        }
        return mountedReportTable;
    };

    beforeEach(() => {
        props = {
            items: Dummy.data.items,
            type: REPORT_SESSIONS
        };
        mountedReportTable = undefined;
    });

    it("render: render ReportTable Header", () => {
        const component = getComponent().find('.ConsoleTable-header');
        expect(component.length).toEqual(1)
    });

    it("render: render ReportTable Body", () => {
        const component = getComponent().find('.ConsoleTable-body');
        expect(component.length).toEqual(1)
    });

    it("render: render ReportTable Row from ReportTable Body 1", () => {
        const component = getComponent().find('.ConsoleTable-body .ConsoleTable-row');
        expect(component.length).toEqual(1)
    });

    it("render: render ReportTable Row from ReportTable Body 2", () => {
        props = {
            items: Dummy.dataAlternative1.items
        };
        const component = getComponent().find('.ConsoleTable-body .ConsoleTable-row');
        expect(component.length).toEqual(3)
    });
});