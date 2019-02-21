import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import {IMentorFormCreateContext} from "../../MentorFormCreate.context";
import {getDefaultValues} from "../../MentorFormCreate.mock";

const getContext = (context: IMentorFormCreateContext) => {
    jest.doMock('../../MentorFormCreate.context', () => {
        return {
            default: {
                Consumer: (props: any) => props.children(context)
            }
        }
    });
    return require('./FormProfile').default;
};

describe('FormProfile Test',() => {
    let props: any;
    let ctxt: IMentorFormCreateContext;
    let mountedComponent: any;
    const getComponent = () => {
        if (!mountedComponent) {
            const FormProfile = getContext(ctxt);
            mountedComponent = mount(
                <FormProfile {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        jest.resetModules();
        props = {};
        ctxt = getDefaultValues();
        mountedComponent = undefined;
    });

    it("render: should have two inputs", () => {
        const component = getComponent();
        expect(component.find('input').length).toEqual(2);
    });
});
