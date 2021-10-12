import { useEffect, useState } from "react";
import { getRangeWeek } from "../services";

interface IRangeWeek {
    dateWeekStart: Date;
    dateWeekEnd: Date;
}

const useDateRangeWeek = (selectedDate: Date): IRangeWeek | null => {
    const [range, setRange] = useState<IRangeWeek | null>(null);

    useEffect(() => {
        const [firstDate, lastDate] = getRangeWeek(selectedDate);
        setRange({
            dateWeekStart: firstDate,
            dateWeekEnd: lastDate,
        });
    }, [selectedDate]);

    return range;
};

export default useDateRangeWeek;


