import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import MentorFormBaseContext from "../../../MentorFormBase/MentorFormBase.context";
import {getDefaultValues} from "../../../MentorFormBase/MentorFormBase.mock";
import FormMail from "./FormMail";




describe('FormMail Test',() => {
    let props: any;
    let mountedComponent: any;
    const getComponent = () => {
        if (!mountedComponent) {
            const TestComponent = () => (
                <MentorFormBaseContext.Provider value={getDefaultValues()}>
                    <FormMail {...props} />
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
        props = {
            disableFields: {
                document: false,
                documentType: false,
                firstName: false,
                lastName: false
            }
        };
        mountedComponent = undefined;
    });

    it("render: Show progress as 0", () => {
        const component = getComponent();
        expect(component.find('.MentorInput_input').length).toEqual(2)
    });

});
