const donwloadLink = (link: string, filename: string, ext: string) => {
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = link;
    tempLink.setAttribute('download', `${filename}.${ext}`);

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
    }

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
};

const getDateFormatted = (date: Date) => {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    let day = dd.toString();
    let month = mm.toString();
    const year = date.getFullYear();

    if(dd < 10){
        day = '0' + dd;
    }
    if(mm < 10){
        month = '0' + mm;
    }
    return day + '-' + month + '-' + year;
};

const getValue = (value?: string, backup?: string): string  => {
    if (!value && backup) {
        value = backup;
    }
    return value ? value : '';
};

const getDocumentHeight = (): number => {
    const body = document.body;
    const html = document.documentElement;
    return Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight);
};

const scrollToTop = () => {
    if (!!window && !!window.scrollTo) {
        window.scrollTo(0, 0);
    }
};

const doClone = (source: any): any => {
    if (Object.prototype.toString.call(source) === '[object Array]') {
        const clone = [];
        for (let i=0; i<source.length; i++) {
            clone[i] = doClone(source[i]);
        }
        return clone;
    } else if (typeof(source) === "object") {
        const clone = {};
        for (const prop in source) {
            if (source.hasOwnProperty(prop)) {
                clone[prop] = doClone(source[prop]);
            }
        }
        return clone;
    } else {
        return source;
    }
};

const getMonday = (date?: Date) => {
    let d = Utilities.todayDate();
    if (!!date) {
        d = new Date(date);
    }
    const day = d.getDay();
    const diff = d.getDate()  - day + (day === 0 ? - 6 : 1);
    return new Date(d.setDate(diff));
};

const todayDate = () => {
    const date = new Date();
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    date.setMilliseconds(0);
    return date;
};

const onErrorStudentImage = (e: any) => {
    e.target.onerror = null;
    e.target.src="https://storage.googleapis.com/ugo-utp.appspot.com/mentors/default.png"
};

const Utilities = {
    doClone,
    donwloadLink,
    getDateFormatted,
    getDocumentHeight,
    getMonday,
    getValue,
    onErrorStudentImage,
    scrollToTop,
    todayDate
};

export default Utilities;