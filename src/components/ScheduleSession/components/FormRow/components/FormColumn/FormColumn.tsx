import * as React from 'react';
import './FormColumn.scss';

interface IPropsFormColumn {
    style?: React.CSSProperties;
    width: number;
}

const FormColumn: React.StatelessComponent<IPropsFormColumn> = (props) => {
    const basis = Math.round(100 / props.width) - 2;
    return (
        <div className='FormColumn' style={{flexBasis: basis + '%', ...props.style}}>
            {props.children}
        </div>
    );
};

export default FormColumn;