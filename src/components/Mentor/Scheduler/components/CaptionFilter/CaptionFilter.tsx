import * as React from 'react';
import './CaptionFilter.scss';

export interface IFilterGroup {
    scheduled: boolean;
    notScheduled: boolean;
}

export interface ICaptionFilterProps {
    duration: number;
    onFilterCheck?: (filter: IFilterGroup) => void;
}

const DEFAULT_TIME_INTERVAL = 5;

const CaptionFilter = ({ duration, onFilterCheck }: ICaptionFilterProps) => {

    const [filters] = React.useState<IFilterGroup>({
        notScheduled: true,
        scheduled: true,
    });

    // const filterClick = (isChecked: boolean, itemGroup: string) => {
    //     setFilters({
    //         ...filters,
    //         [`${itemGroup}`]: isChecked,
    //     });
    // }

    React.useEffect(() => {
        console.log(filters);
        if (onFilterCheck) {
            onFilterCheck(filters);
        }
    }, [filters]);

    return (
        <div className={'caption-filter-container'}>
            <div className={'caption-interval-div'}>
                <div className={'caption-interval-title'}>Duración de la cita: {duration} minutos</div>
                <div className={'caption-interval-description'}>{duration - DEFAULT_TIME_INTERVAL} minutos de atención</div>
                <div className={'caption-interval-description'}>{DEFAULT_TIME_INTERVAL} minutos administrativos</div>
            </div>
            <div className={'caption-filter-div'}>
                {/* <Filtercalendar title={'Citas sin agendar'} onClickButton={(isChecked) => filterClick(isChecked, 'notScheduled')} />
                <Filtercalendar title={'Citas agendadas'} onClickButton={(isChecked) => filterClick(isChecked, 'scheduled')} /> */}
            </div>
            <div className={'caption-interval-div'} />
        </div>
    )
}

export default CaptionFilter;
