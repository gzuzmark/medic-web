import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import {IMentorFormBaseContext} from "../../MentorFormBase.context";
import {getDefaultValues} from "../../MentorFormBase.mock";

const getContext = (context: IMentorFormBaseContext) => {
    jest.doMock('../../MentorFormBase.context', () => {
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
    let ctxt: IMentorFormBaseContext;
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