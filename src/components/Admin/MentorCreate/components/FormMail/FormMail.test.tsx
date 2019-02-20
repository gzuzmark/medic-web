import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import {IMentorCreateContext} from "../../MentorCreate.context";
import {getDefaultValues} from "../../MentorCreate.mock";

const getContext = (context: IMentorCreateContext) => {
    jest.doMock('../../MentorCreate.context', () => {
        return {
            default: {
                Consumer: (props: any) => props.children(context)
            }
        }
    });
    return require('./FormMail').default;
};


describe('FormMail Test',() => {
    let props: any;
    let ctxt: IMentorCreateContext;
    let mountedComponent: any;
    const getComponent = () => {
        if (!mountedComponent) {
            const FormMail = getContext(ctxt);
            mountedComponent = mount(
                <FormMail {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        jest.resetModules();
        props = {
            currentStep: 1
        };
        ctxt = getDefaultValues();
        mountedComponent = undefined;
    });

    it("render: Show progress as 0", () => {
        const component = getComponent();
        expect(component.find('input').length).toEqual(1)
    });

});
