import * as React from 'react';
import './FormRow.scss';

interface IPropsFormRow {
    columns: JSX.Element[];
    style?: React.CSSProperties;
}

const FormRow: React.FC<IPropsFormRow> = (props) => {
    return (
        <div className='FormRow' style={{...props.style}}>
            {props.columns.map((column) => column)}
        </div>
    );
};

export default FormRow;
