import { shallow } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import MentorCreate from "./MentorCreate";

describe('MentorCreate Test',() => {
    let props: any;
    let mountedComponent: any;
    const getComponent = () => {
        if (!mountedComponent) {
            mountedComponent = shallow(
                <MentorCreate {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        props = {};
        mountedComponent = undefined;
    });

    it("render: Show progress as 0", () => {
        const component = getComponent();
        expect(component)
        .not.toEqual(0)
    });


});
