import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import {IMentorFormBaseContext} from "../../../MentorFormBase/MentorFormBase.context";
import {getDefaultValues, getFullValues} from "../../../MentorFormBase/MentorFormBase.mock";

const getContext = (context: IMentorFormBaseContext) => {
    jest.doMock('../../../MentorFormBase/MentorFormBase.context', () => {
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
    let ctxt: IMentorFormBaseContext;
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
