import { shallow } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import {getFullValues} from "../../../MentorFormBase/MentorFormBase.mock";
import FormManager, {IPropsFormManager} from "./FormManager";

describe('FormManager Test',() => {
    let props: IPropsFormManager;
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
        props = {
            formData: {
                errors: {},
                touched: {},
                values: getFullValues().values
            },
            onHandleSubmit: (e: any) => '',
        };
        mountedComponent = undefined;
    });

    it("render: Show progress as 0", () => {
        const component = getComponent();
        expect(component)
            .not.toEqual(0)
    });


});
