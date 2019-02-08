import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import FormManager, {FormManagerContainer} from "./FormManager";

describe('FormManager Test',() => {
    let props: any;
    let mountedComponent: any;
    const getComponent = () => {
        if (!mountedComponent) {
            mountedComponent = mount(
                <FormManager {...props} />
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
        expect(component.find(FormManagerContainer).length)
            .toEqual(2)
    });

});
