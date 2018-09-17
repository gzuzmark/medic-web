import { mount } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import TimeRangePicker from "./TimeRangePicker";


describe('TimeRangePicker Test',() => {
    let props: any;
    let mountedTimeRangePicker: any;
    const getComponent = () => {
        if (!mountedTimeRangePicker) {
            mountedTimeRangePicker = mount(
                <TimeRangePicker {...props} />
            );
        }
        return mountedTimeRangePicker;
    };

    beforeEach(() => {
        props = {
            id: 0,
            onAddWorkshop: (from: Date | null, to: Date | null) => void(0),
            onChange: (id: number, from: Date | null, to: Date | null, key: string) => void(0),
            onRemoveWorkshop: (id: number) => void(0),
            uniqueKey: "123"
        };
        mountedTimeRangePicker = undefined;
    });

    it("render: option delete should not be present", () => {
        const component = getComponent();
        expect(component.find('.TimeRangePicker_option--remove').length).toBe(0);
    });

    it("render: option add should be present", () => {
        const component = getComponent();
        expect(component.find('.TimeRangePicker_option--add').length).toBe(1);
    });

    it("event: event click should have been called", () => {
        const click = jasmine.createSpy('click');
        const newProps = {...props};
        newProps.onAddWorkshop = click;
        props = newProps;
        const component = getComponent();
        component.find('.TimeRangePicker_option--add').simulate('click');
        expect(click).toHaveBeenCalled();
    });
});