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

const months = [
    {
        label: "Enero",
        value: "0"
    },
    {
        label: "Febrero",
        value: "1"
    },
    {
        label: "Marzo",
        value: "2"
    },
    {
        label: "Abril",
        value: "3"
    },
    {
        label: "Mayo",
        value: "4"
    },
    {
        label: "Junio",
        value: "5"
    },
    {
        label: "Julio",
        value: "6"
    },
    {
        label: "Agosto",
        value: "7"
    },
    {
        label: "Setiembre",
        value: "8"
    },
    {
        label: "Octubre",
        value: "9"
    },
    {
        label: "Noviembre",
        value: "10"
    },
    {
        label: "Diciembre",
        value: "11"
    },
];

const findMonthFromIndex = (index: string) => {
    return months.find((v) => v.value === index);
};
const years = (()=> {
    const items = [];
    for (let year = 1940; year <= (new Date().getFullYear()); year+=1) {
        items.push({label: year.toString(), value: year.toString()});
    }
    return items.reverse();
})();

export const date = {
    findMonthFromIndex,
    months,
    years
};

