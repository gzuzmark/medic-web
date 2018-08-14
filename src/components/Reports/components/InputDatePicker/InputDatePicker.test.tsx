import { shallow } from "enzyme";
import * as React from 'react';
import InputDatePicker from "./InputDatePicker";

describe('InputDatePicker Test',() => {
    let props: any;
    let mountedInputDatePicker: any;
    const getComponent = () => {
        if (!mountedInputDatePicker) {
            mountedInputDatePicker = shallow(
                <InputDatePicker {...props} />
            );
        }
        return mountedInputDatePicker;
    };

    beforeEach(() => {
        props = {
            date: new Date("2018-02-02"),
            id: 'demoKey',
            updateState: (params: object) => void(0)
        };
        mountedInputDatePicker = undefined;
    });

    it("render: render InputDatePicker", () => {
        const component = getComponent();
        expect(component).toMatchSnapshot();
    });
});