import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as moment from "moment";
import * as React from 'react';
import ConsoleDatePicker from "./ConsoleDatePicker";


describe('ConsoleDatePicker Test',() => {
    let props: any;
    let mountedConsoleDatePicker: any;
    const consoleDatePicker = () => {
        if (!mountedConsoleDatePicker) {
            mountedConsoleDatePicker = shallow(
                <ConsoleDatePicker {...props} />
            );
        }
        return mountedConsoleDatePicker;
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
        mountedConsoleDatePicker = undefined;
    });



    it("render: render ConsoleDatePicker", () => {
        const component = consoleDatePicker();
        expect(component).toMatchSnapshot();
    });
});