import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import * as React from 'react';
import Utilities from "../../../common/Utils/Utilities";
import {SessionCollector} from "../../../domain/Session/SessionCollector";
import {SessionMentorBean} from "../../../domain/Session/SessionMentorBean";
import {MentorHomeCore} from './MentorHome';


describe('MentorHome Test',() => {
    let props: any;
    let mountedMentorHome: any;
    const firstMonday = Utilities.getMonday().toISOString();
    const getComponent = () => {
        if (!mountedMentorHome) {
            mountedMentorHome = shallow(
                <MentorHomeCore {...props} />
            );
        }
        return mountedMentorHome;
    };

    beforeEach(() => {
        const sessionCollector = new SessionCollector<SessionMentorBean>([], firstMonday, 1);
        props = {
            noAttendedSessions: {
                doRequest: () => void(0),
                item: null,
                loading: false
            },
            sessionCollector,
            setSessionCollector: (s: SessionCollector<SessionMentorBean>) => void(0)
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
