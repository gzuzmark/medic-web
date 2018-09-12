import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as moment from 'moment';
import * as React from 'react';
import TimePicker from "./TimePicker";


describe('TimePicker Test',() => {
    let props: any;
    let mountedTimePicker: any;
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
            from: moment('20111031'),
            name: 'Inicio',
            onChange: void(0),
            step: 15,
            to: moment('20111031')
        };
        mountedTimePicker = undefined;
    });

    it("render: render TimePicker default", () => {
        const component = getComponent();
        expect(component).toMatchSnapshot();
    });

    it("render: render TimePicker 1 day", () => {
        const to = moment('20111031');
        const from = moment('20111031');
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