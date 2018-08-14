import { shallow } from 'enzyme';
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
            mountedReportTable = shallow(
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
        const component = getComponent().find('.ReportTable-header');
        expect(component.length).toEqual(1)
    });

    it("render: render ReportTable Body", () => {
        const component = getComponent().find('.ReportTable-body');
        expect(component.length).toEqual(1)
    });

    it("render: render ReportTable Row from ReportTable Body 1", () => {
        const component = getComponent().find('.ReportTable-body .ReportTable-row');
        expect(component.length).toEqual(1)
    });

    it("render: render ReportTable Row from ReportTable Body 2", () => {
        props = {
            items: Dummy.dataAlternative1.items
        };
        const component = getComponent().find('.ReportTable-body .ReportTable-row');
        expect(component.length).toEqual(3)
    });
});