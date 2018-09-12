import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
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
            date: new Date("2017-01-26"),
            onChange: void(0)
        };
        mountedTimeRangePicker = undefined;
    });

    it("render: render TimeRangePicker default", () => {
        const component = getComponent();
        expect(component).toMatchSnapshot();
    });

});