import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as moxios from 'moxios';
import * as React from 'react';
import MentorHome from "./MentorHome";

describe('MentorHome Test',() => {
    let props: any;
    let mountedConsoleDatePicker: any;
    const createComponent = () => {
        if (!mountedConsoleDatePicker) {
            mountedConsoleDatePicker = shallow(
                <MentorHome {...props} />
            );
        }
        return mountedConsoleDatePicker;
    };

    beforeEach(() => {
        props = {};
        mountedConsoleDatePicker = undefined;
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall()
    });

    it("render: MentorHome render correctly", () => {
        const component = createComponent();
        expect(component).toMatchSnapshot();
    });

});