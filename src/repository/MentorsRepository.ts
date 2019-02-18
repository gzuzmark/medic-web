const keyMentorAdded = 'NEW_MENTOR_ID';

export const ROL_MENTOR = 'mentor';
export const ROL_ADMIN = 'administrador';

export const MentorRepository = {
    addedMentorsClean() {
        localStorage.setItem(keyMentorAdded, "");
    },
    addedMentorsGet(): string[] {
        const mentors = localStorage.getItem(keyMentorAdded) || '';
        return mentors.split(",")
    },
    addedMentorsInsert(id: any) {
        const mentors = this.addedMentorsGet();
        mentors.push(id);
        localStorage.setItem(keyMentorAdded, mentors.join(","));
    }
};

export default MentorRepository;

