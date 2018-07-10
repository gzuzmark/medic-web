import * as React from 'react';
import './FormRow.scss';

interface IPropsTitleSection {
    columns: JSX.Element[];
    style?: React.CSSProperties;
}

const FormRow: React.StatelessComponent<IPropsTitleSection> = (props) => {
    return (
        <div className='FormRow' style={{...props.style}}>
            {props.columns.map((column) => column)}
        </div>
    );
};

export default FormRow;