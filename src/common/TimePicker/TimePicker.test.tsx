import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as moment from 'moment';
import * as React from 'react';
import TimePicker from "./TimePicker";


describe.skip('TimePicker Test',() => {
    let props: any;
    let mountedTimePicker: any;
    const currentDate = new Date(Date.UTC(2012,3,13,1,31,38));
    const getComponent = () => {
        if (!mountedTimePicker) {
            mountedTimePicker = shallow(
                <TimePicker {...props} />
            );
        }
        return mountedTimePicker;
    };

    beforeEach(() => {
        props = {
            defaultText: '11:00',
            from: moment(currentDate),
            name: 'Inicio',
            onChange: void(0),
            step: 15,
            to: moment(currentDate)
        };
        mountedTimePicker = undefined;
    });

    it("render: render TimePicker default", () => {
        const component = getComponent();
        expect(component).toMatchSnapshot();
    });

    it("render: render TimePicker 1 day", () => {
        const to = moment(currentDate);
        const from = moment(currentDate);
        to.add(1, 'days').set('minutes', 0);
        from.set('minutes', 0);
        props = {
            defaultText: '11:00',
            from,
            name: 'Inicio',
            onChange: void(0),
            step: 15,
            to
        };
        const component = getComponent();
        expect(component).toMatchSnapshot();
    });
});