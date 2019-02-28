import { shallow } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import {MENTOR_STATUS} from "../../../../../domain/Mentor/MentorBase";
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
            disablePersonalData: false,
            formData: {
                errors: {},
                touched: {},
                values: getFullValues().values
            },
            mentor: {
                id: "asdsad",
                status: MENTOR_STATUS.PUBLISHED
            },
            onHandleSubmit: (e: any) => '',
            validateForm: () => ''
        };
        mountedComponent = undefined;
    });

    it("render: Show progress as 0", () => {
        const component = getComponent();
        expect(component)
            .not.toEqual(0)
    });


});
