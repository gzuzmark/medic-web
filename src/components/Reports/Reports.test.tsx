import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as moment from "moment";
import * as moxios from 'moxios';
import * as React from 'react';
import {REPORT_SESSIONS, ReportRequestBean} from "../../beans/ReportRequest.bean";
import Dummy from "./Report.dummy"
import Reports from "./Reports";

describe('Reports Test',() => {
    let props: any;
    let mountedConsoleDatePicker: any;
    const report = () => {
        if (!mountedConsoleDatePicker) {
            mountedConsoleDatePicker = shallow(
                <Reports {...props} />
            );
        }
        return mountedConsoleDatePicker;
    };

    beforeEach(() => {
        props = {};
        mountedConsoleDatePicker = undefined;
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall()
    });

    it("methods: searchResults is called if Object is valid", () => {
        const component = report();
        const spySearchResults = jest.spyOn(component.instance(), 'searchResults');
        component.instance().updateState({type: 'SESSIONS'});
        expect(spySearchResults).toHaveBeenCalled()
    });

    it("methods: searchResults is not called if Object is invalid", () => {
        const component = report();
        const spySearchResults = jest.spyOn(component.instance(), 'searchResults');
        component.instance().updateState({startDate: moment()});
        expect(spySearchResults).not.toHaveBeenCalled()
    });

    it("methods: searchResults should update table with data", (done) => {
        const component = report();
        const object = new ReportRequestBean();
        component.instance().searchResults(object);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                response: Dummy.data,
                status: 200
            }).then(() => {
                component.update();
                const divs = component.find(".Report-table");
                expect(divs.length).toEqual(1);
                done()
            })
        })
    });

    it("methods: searchResults should update table with no data", (done) => {
        const component = report();
        const object = new ReportRequestBean();
        object.type = REPORT_SESSIONS;
        component.instance().searchResults(object);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                response: {},
                status: 200
            }).then(() => {
                component.update();
                const divs = component.find(".Report-empty");
                expect(divs.length).toEqual(1);
                done()
            })
        })
    });

});