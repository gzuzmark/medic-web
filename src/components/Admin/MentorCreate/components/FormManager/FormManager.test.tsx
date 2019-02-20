import { shallow } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import {IMentorFormValidations} from "../../../../../domain/Mentor/MentorCreate";
import FormManager, {FormManagerContainer} from "./FormManager";

jest.doMock('react-responsive-modal', () => {
    return {
        default: (props: any) => <div>props.children()</div>
    }
});

describe('FormManager Test',() => {
    let props: any;
    let mountedComponent: any;
    const getComponent = () => {
        if (!mountedComponent) {
            mountedComponent = shallow(
                <FormManager {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        jest.resetModules();
        props = {
            currentStep: 1,
            formData: {
                errors: {},
                touched: {},
                values:  {} as IMentorFormValidations
            },
            onBeforeStep: () => '',
            onHandleSubmit: (e: any) => '',
            onNextStep: () => '',
            saving: false,
            submitText: "continuar"
        };
        mountedComponent = undefined;
    });

    it("render: Show two containers", () => {
        const component = getComponent();
        expect(component.find(FormManagerContainer).length)
            .toEqual(2)
    });

});
