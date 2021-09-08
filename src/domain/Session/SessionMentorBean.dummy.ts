import {ISessionMentor} from "./SessionMentorBean";

export const sessionMentorDummy: ISessionMentor = {
    availability: {
        count: 0,
        limit: 3
    },
    from: "2018-10-26T10:12:26.000-05:00",
    id: "c5f0daac-6729-43a1-a077-1ea4dbd0540d",
    isActive: false,
    isEnabledForAttendance: true,
    location: {
        type: "VIRTUAL",
        typeLabel: "Virtual"
    },
    payment: {
        benefit_id: '78870e7d-d004-4a35-86b5-4a7948a59fc1',
        cipUrl: 'cipURL.com',
        company_benefit_name: 'teoma',
        paid: '10.00',
        pending: false,
    },
    skill: {
        id: "a4f80320-10df-4e40-bee0-b85930ebd7c6",
        name: "Visual Designer II"
    },
    status: "AVAILABLE",
    to: "2018-10-26T10:12:27.000-05:00"
};
