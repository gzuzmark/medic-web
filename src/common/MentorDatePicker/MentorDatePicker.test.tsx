import { shallow } from "enzyme";
import * as React from 'react';
import MentorDatePicker from "./MentorDatePicker";

describe('MentorDatePicker Test',() => {
    let props: any;
    let mountedMentorDatePicker: any;
    const getComponent = () => {
        if (!mountedMentorDatePicker) {
            mountedMentorDatePicker = shallow(
                <MentorDatePicker {...props} />
            );
        }
        return mountedMentorDatePicker;
    };

    beforeEach(() => {
        props = {
            date: new Date("2018-02-02"),
            id: 'demoKey',
            updateState: (params: object) => void(0)
        };
        mountedMentorDatePicker = undefined;
    });

    it("render: render MentorDatePicker", () => {
        const component = getComponent();
        expect(component).toMatchSnapshot();
    });
});
