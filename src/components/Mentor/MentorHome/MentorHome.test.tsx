import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import {MentorHomeCore} from './MentorHome';


describe('MentorHome Test',() => {
    let props: any;
    let mountedMentorHome: any;
    const getComponent = () => {
        if (!mountedMentorHome) {
            mountedMentorHome = shallow(
                <MentorHomeCore {...props} />
            );
        }
        return mountedMentorHome;
    };

    beforeEach(() => {
        props = {
            noAttendedSessions: {
                doRequest: () => void(0),
                item: null,
                loading: false
            }
        };
        mountedMentorHome = undefined;
    });

    it("event: loadSessions should have been called when getNewSessions is called", () => {
        const component = getComponent();
        const date = new Date();
        const spy = jest.spyOn(component.instance(), 'loadSessions');
        component.instance().getNewSessions(date.toISOString(), -1);
        expect(spy).toHaveBeenCalled();
    });
});
