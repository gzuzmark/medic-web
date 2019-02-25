import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import {IMentorFormBaseContext} from "../../../MentorFormBase/MentorFormBase.context";
import {getDefaultValues} from "../../../MentorFormBase/MentorFormBase.mock";

const getContext = (context: IMentorFormBaseContext) => {
    jest.doMock('../../MentorFormCreate.context', () => {
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
    let ctxt: IMentorFormBaseContext;
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
