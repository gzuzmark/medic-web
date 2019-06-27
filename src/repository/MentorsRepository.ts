import {IMentorBase} from "../domain/Mentor/MentorBase";

const keyMentorAdded = 'NEW_MENTOR_ID';

export const ROL_MENTOR = 'mentor';
export const ROL_ADMIN = 'administrador';

export const MentorRepository = {
    addedMentorsClean() {
        localStorage.setItem(keyMentorAdded, "");
    },
    addedMentorsGet(): IMentorBase[] {
        const mentors = localStorage.getItem(keyMentorAdded) || '[]';
        return JSON.parse(mentors);
    },
    addedMentorsInsert(mentor: any) {
        const mentors = this.addedMentorsGet();
        mentors.push(mentor);
        localStorage.setItem(keyMentorAdded, JSON.stringify(mentors));
    }
};

export default MentorRepository;

