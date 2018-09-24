export const getTime = (minutes: number) => { // 130 => 2h 10m
    const base = 60;
    const hours = parseInt((minutes / base).toString(), 10);
    const text = lpad(hours, 2) + 'h ' + lpad((minutes - (hours * base)), 2) + 'm';
    return text;
};

export const lpad = (value: number, padding: number) => { // 9, 2 => '09'
    const zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
};

export const getFullHour = (minutes: number) => { // 540 => 09:00 am
    const clock = minutes/60 < 12 ? 'a.m' : 'p.m.';
    return `${getHour(minutes)} ${clock}`
};

export const getHour = (minutes: number) => { // 540 => 09:00
    return `${lpad((minutes - minutes%60)/60, 2)}:${lpad(minutes%60, 2)}`
};

export const backToPagePreviously = () => {
    window.history.back();
};