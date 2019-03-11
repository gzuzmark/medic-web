import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as moxios from 'moxios';
import * as React from 'react';
import {REPORT_SESSIONS, REPORT_STUDENTS, ReportRequestBean} from "../../../beans/ReportRequest.bean";
import ReportTable from "./components/ReportTable/ReportTable";
import Dummy from "./Report.dummy"
import Reports from "./Reports";

describe('Reports Test',() => {
    let props: any;
    let mountedDatePickerBase: any;
    const getComponent = () => {
        if (!mountedDatePickerBase) {
            mountedDatePickerBase = mount(
                <Reports {...props} />
            );
        }
        return mountedDatePickerBase;
    };

    beforeEach(() => {
        props = {};
        mountedDatePickerBase = undefined;
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall()
    });

    it("methods: searchResults is called if Object is valid", () => {
        const component = getComponent();
        const spySearchResults = jest.spyOn(component.instance(), 'searchResults');
        component.instance().updateState({type: 'SESSIONS'});
        expect(spySearchResults).toHaveBeenCalled()
    });

    it("methods: searchResults is not called if Object is invalid", () => {
        const component = getComponent();
        const spySearchResults = jest.spyOn(component.instance(), 'searchResults');
        component.instance().updateState({startDate: new Date()});
        expect(spySearchResults).not.toHaveBeenCalled()
    });

    it("methods: searchResults should update table with data", (done) => {
        const component = getComponent();
        const object = new ReportRequestBean();
        object.type = REPORT_SESSIONS;
        component.instance().searchResults(object);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                response: Dummy.data,
                status: 200
            }).then(() => {
                component.update();
                const divs = component.find(ReportTable);
                expect(divs.length).toEqual(1);
                done()
            })
        })
    });

    it("methods: searchResults should update table with no data", (done) => {
        const component = getComponent();
        const object = new ReportRequestBean();
        object.type = REPORT_STUDENTS;
        component.instance().searchResults(object);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                response: {},
                status: 200
            }).then(() => {
                component.update();
                const divs = component.find(ReportTable);
                expect(divs.length).toEqual(0);
                done()
            })
        })
    });

});
