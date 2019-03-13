import { shallow } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import MentorFormBaseContext from "../../MentorFormBase.context";
import {getDefaultValues} from "../../MentorFormBase.mock";
import FormPersonalData from "./FormPersonalData";



// TODO: Implementar pruebas
describe('FormPersonalData Test',() => {
    let props: any;
    let mountedComponent: any;
    const getComponent = () => {
        if (!mountedComponent) {
            const TestComponent = () => (
                <MentorFormBaseContext.Provider value={getDefaultValues()}>
                    <FormPersonalData {...props} />
                </MentorFormBaseContext.Provider>
            );
            mountedComponent = shallow(
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

    it("render: should have only one title", () => {
        const component = getComponent();
        expect(component.find('h4').length).toEqual(0);
    });

});
