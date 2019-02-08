import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import FormMail from "./FormMail";

describe('FormMail Test',() => {
    let props: any;
    let mountedComponent: any;
    const getComponent = () => {
        if (!mountedComponent) {
            mountedComponent = mount(
                <FormMail {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        props = {
            currentStep: 1
        };
        mountedComponent = undefined;
    });

    it("render: Show progress as 0", () => {
        const component = getComponent();
        expect(component.find('div').length)
            .not.toEqual(0)
    });

});
