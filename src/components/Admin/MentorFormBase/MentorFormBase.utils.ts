import {date} from "../../../common/Utils/DateUtilities";
import {IMentorFormExperience} from "../../../domain/Mentor/MentorBaseForm";


export const getDateExperience = (value: IMentorFormExperience) => {
    const fromMonth = value.fromMonth || "";
    const toMonth = value.toMonth || "";
    const from = `${getMonth(fromMonth)} ${value.fromYear}`;
    let to = "Hasta la actualidad";
    let experienceDate = "";
    if (!value.currentJob) {
        to = `${getMonth(toMonth)} ${value.toYear}`;
    }
    if (!!from && !!to) {
        experienceDate = `${from} - ${to}`;
    }
    return experienceDate;
}

export const getMonth = (indexMonth: string) => {
    const month = date.findMonthFromIndex(indexMonth);
    return month ? month.label : '';
}
