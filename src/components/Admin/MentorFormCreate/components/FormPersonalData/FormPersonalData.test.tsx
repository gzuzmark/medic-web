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
    return require('./FormPersonalData').default;
};

// TODO: Implementar pruebas
describe('FormPersonalData Test',() => {
    let props: any;
    let ctxt: IMentorFormCreateContext;
    let mountedComponent: any;
    const getComponent = () => {
        if (!mountedComponent) {
            const FormPersonalData = getContext(ctxt);
            mountedComponent = mount(
                <FormPersonalData {...props} />
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
        ctxt = getDefaultValues();
        mountedComponent = undefined;
    });

    it("render: should have only one title", () => {
        const component = getComponent();
        expect(component.find('h4').length).toEqual(0);
    });

});
