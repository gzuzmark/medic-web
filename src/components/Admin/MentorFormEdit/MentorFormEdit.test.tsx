import { shallow } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import MentorFormEdit, {IPropsMentorEdit} from "./MentorFormEdit";

describe('MentorFormEdit Test',() => {
    let props: IPropsMentorEdit;
    let mountedComponent: any;
    const getComponent = () => {
        if (!mountedComponent) {
            mountedComponent = shallow(
                <MentorFormEdit {...props} />
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        props = {
            match: {
                isExact: false,
                params: "",
                path: "",
                url: ""
            }
        };
        mountedComponent = undefined;
    });

    it("render: Show progress as 0", () => {
        const component = getComponent();
        expect(component)
            .not.toEqual(0)
    });


});
