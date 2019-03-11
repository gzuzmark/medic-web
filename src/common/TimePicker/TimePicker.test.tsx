import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import TimePicker from "./TimePicker";


describe('TimePicker Test',() => {
    let props: any;
    let mountedTimePicker: any;
    const getComponent = () => {
        if (!mountedTimePicker) {
            mountedTimePicker = mount(
                <TimePicker {...props} />
            );
        }
        return mountedTimePicker;
    };

    beforeEach(() => {
        const initDate = new Date(2018, 5, 4, 10, 0, 0);
        const endDate = new Date(2018, 5, 4, 12, 0, 0);
        props = {
            defaultText: '11:00',
            from: initDate,
            name: 'Fecha',
            onChange: void(0),
            step: 15,
            to: endDate
        };
        mountedTimePicker = undefined;
    });

    it("render: render TimePicker with two hours", () => {
        const component = getComponent();
        component.find(".FilterList-field").first().simulate('click', "");
        component.update();
        // 10:00, 10:15, 10:30, 10:45, 11:00, 11:15, 11:30, 11:45, 12:00
        expect(component.find("li").length).toBe(9)

    });

    it("render: render TimePicker with two hours every thirty minutes", () => {
        const newProps = {...props};
        newProps.step = 30;
        props = newProps;
        const component = getComponent();
        component.find(".FilterList-field").first().simulate('click', "");
        component.update();
        // 10:00, 10:30, 11:00, 11:30, 12:00
        expect(component.find("li").length).toBe(5)

    });

    it("render: render TimePicker with bad hours", () => {
        const initDate = new Date(2018, 5, 4, 13, 0, 0);
        const endDate = new Date(2018, 5, 4, 10, 0, 0);
        const newProps = {...props};
        newProps.from = initDate;
        newProps.to = endDate;
        props = newProps;
        const component = getComponent();
        component.find(".FilterList-field").first().simulate('click', "");
        component.update();
        expect(component.find("li").length).toBe(0)
    });
});
