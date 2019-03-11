import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-localstorage-mock';
import * as moment from "moment";
import * as React from 'react';
import DatePickerBase from "./DatePickerBase";


describe('DatePickerBase Test',() => {
    let props: any;
    let mountedDatePickerBase: any;
    const consoleDatePicker = () => {
        if (!mountedDatePickerBase) {
            mountedDatePickerBase = shallow(
                <DatePickerBase {...props} />
            );
        }
        return mountedDatePickerBase;
    };

    beforeEach(() => {
        props = {
            configs: {},
            date: moment('2018-02-08T05:00:00.000Z'),
            focus: false,
            id: "test-single-calendar",
            onDateChange: () => void(0),
            onDateFocusChange: () => void(0)
        };
        mountedDatePickerBase = undefined;
    });



    it("render: render DatePickerBase", () => {
        const component = consoleDatePicker();
        expect(toJson(component)).toMatchSnapshot();
    });
});
