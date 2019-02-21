import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import {IMentorFormCreateContext} from "../../MentorFormCreate.context";
import {getDefaultValues, getFullValues} from "../../MentorFormCreate.mock";

const getContext = (context: IMentorFormCreateContext) => {
    jest.doMock('../../MentorFormCreate.context', () => {
        return {
            default: {
                Consumer: (props: any) => props.children(context)
            }
        }
    });
    return require('./FormReview').default;
};

// TODO: Implementar pruebas
describe('FormReview Test',() => {
    let props: any;
    let ctxt: IMentorFormCreateContext;
    let mountedComponent: any;
    const getComponent = () => {
        if (!mountedComponent) {
            const FormReview = getContext(ctxt);
            mountedComponent = mount(
                <FormReview {...props} />
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

    it("render: should have only one title", () => {
        ctxt = getFullValues();
        const component = getComponent();
        expect(component.find('.FormReview_name').at(0).text())
            .toEqual(`${ctxt.values.firstName} ${ctxt.values.lastName}`);
    });

});
