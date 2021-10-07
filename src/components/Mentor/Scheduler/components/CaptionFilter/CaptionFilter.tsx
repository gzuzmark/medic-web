import * as React from 'react';
import Filtercalendar from '../FilterCalendar/Filtercalendar';
import './CaptionFilter.scss';

export interface IFilterGroup {
    scheduled: boolean;
    notScheduled: boolean;
}

export interface ICaptionFilterProps {
    duration: number;
    disabled?: boolean;
    onFilterCheck?: (filter: IFilterGroup) => void;
}

const CaptionFilter = ({ duration, disabled = false, onFilterCheck }: ICaptionFilterProps) => {

    const [filters, setFilters] = React.useState<IFilterGroup>({
        notScheduled: true,
        scheduled: true,
    });

    const filterClick = (isChecked: boolean, itemGroup: string) => {
        const { scheduled, notScheduled } = filters;
        if (!isChecked) {
            if (itemGroup === 'scheduled' && !notScheduled) {
                return;
            } else if (itemGroup === 'notScheduled' && !scheduled) {
                return;
            }
        }
        setFilters({
            ...filters,
            [`${itemGroup}`]: isChecked,
        });
    }

    React.useEffect(() => {
        if (onFilterCheck) {
            onFilterCheck(filters);
        }
    }, [filters]);

    React.useEffect(() => {
        if (disabled) {
            setFilters({
                scheduled: true,
                notScheduled: true,
            });
        }
    }, [disabled]);

    return (
        <div className={'caption-filter-container'}>
            <div className={'caption-interval-div'}>
                <div className={'caption-interval-title'}>Duración de la cita: {duration} minutos</div>
                {/* <div className={'caption-interval-description'}>{duration - DEFAULT_TIME_INTERVAL} minutos de atención</div>
                <div className={'caption-interval-description'}>{DEFAULT_TIME_INTERVAL} minutos administrativos</div> */}
            </div>
            <div className={'caption-filter-div'}>
                <Filtercalendar title={'Citas sin agendar'} isChecked={filters.notScheduled} disabled={disabled} onClickButton={(isChecked) => filterClick(isChecked, 'notScheduled')} />
                <Filtercalendar title={'Citas agendadas'} isChecked={filters.scheduled} disabled={disabled} onClickButton={(isChecked) => filterClick(isChecked, 'scheduled')} />
            </div>
            <div className={'caption-interval-div'} />
        </div>
    )
}

export default CaptionFilter;
