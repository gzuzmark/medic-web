import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import MentorFormBaseContext from "../../../MentorFormBase/MentorFormBase.context";
import {getDefaultValues} from "../../MentorFormBase.mock";
import FormProfile from "./FormProfile";

describe('FormProfile Test',() => {
    let props: any;
    let mountedComponent: any;
    const getComponent = () => {
        if (!mountedComponent) {
            const TestComponent = () => (
                <MentorFormBaseContext.Provider value={getDefaultValues()}>
                    <FormProfile {...props} />
                </MentorFormBaseContext.Provider>
            );
            mountedComponent = mount(
                <TestComponent />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        jest.resetModules();
        props = {};
        mountedComponent = undefined;
    });

    it("render: should have two inputs", () => {
        const component = getComponent();
        expect(component.find('input').length).toEqual(2);
    });
});
