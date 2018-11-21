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
    skill: {
        id: "a4f80320-10df-4e40-bee0-b85930ebd7c6",
        name: "Visual Designer II"
    },
    status: "AVAILABLE",
    to: "2018-10-26T10:12:27.000-05:00"
};
