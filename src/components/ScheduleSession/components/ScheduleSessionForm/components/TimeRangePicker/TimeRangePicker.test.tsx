import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import {REPORT_SESSIONS} from "../../../../../../beans/ReportRequest.bean";
import TimeRangePicker from "./TimeRangePicker";


describe('TimeRangePicker Test',() => {
    let props: any;
    let mountedTimeRangePicker: any;
    const getComponent = () => {
        if (!mountedTimeRangePicker) {
            mountedTimeRangePicker = shallow(
                <TimeRangePicker {...props} />
            );
        }
        return mountedTimeRangePicker;
    };

    beforeEach(() => {
        props = {
            type: REPORT_SESSIONS
        };
        mountedTimeRangePicker = undefined;
    });

    it("render: render TimeRangePicker Header", () => {
        const component = getComponent().find('.TimeRangePicker-header');
        expect(component.length).toEqual(1)
    });

});