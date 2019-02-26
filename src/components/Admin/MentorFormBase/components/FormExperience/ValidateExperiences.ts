import {IMentorFormExperience} from "../../../../../domain/Mentor/MentorBaseForm";

const filter = {
    EVERY: 'every',
    SOME: 'some'
};

const isValidFields = (experience: IMentorFormExperience, keys: string[], mode: string) => {
    let status = false;
    if (mode === filter.SOME) {
        status = keys.some((key: string) => {
            return !!experience[key] && experience[key].trim().length > 0;
        })
    } else if (mode === filter.EVERY) {
        status = keys.every((key: string) => {
            return !!experience[key] && experience[key].trim().length > 0;
        })
    }
    return status
};

const getExperiencesWithError = (experiences: IMentorFormExperience[], errors: any) => {
    const experiencesCompleted = experiences.filter((experience, index) => {
        return (!experience.currentJob && experience.toYear && experience.toYear.length > 0) ||
            (!experience.currentJob && experience.toMonth && experience.toMonth.length > 0) ||
            (!!experience.currentJob) ||
            isValidFields(experience, ["fromMonth", "fromYear", "company", "position"], filter.SOME);
    });
    const experiencesStatus = experiencesCompleted.map((experience, index) => {
        let hasError = false;
        const allShouldBeFull =
            (!!experience.currentJob || (!experience.currentJob && experience.toYear && experience.toYear.length > 0)) &&
            (!!experience.currentJob ||(!experience.currentJob && experience.toMonth && experience.toMonth.length > 0)) &&
            isValidFields(experience, ["fromMonth", "fromYear", "company", "position"], filter.EVERY);
        hasError = !allShouldBeFull || (!!errors.experiences && !!errors.experiences[index]);
        return hasError;
    });
    return experiencesStatus
};

export default getExperiencesWithError;
