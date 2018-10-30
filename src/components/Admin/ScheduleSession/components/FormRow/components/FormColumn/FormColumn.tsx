import * as React from 'react';
import './FormColumn.scss';

interface IPropsFormColumn {
    style?: React.CSSProperties;
    width: number;
}

const FormColumn: React.StatelessComponent<IPropsFormColumn> = (props) => {
    const width = Math.round(100 / props.width) - 3;
    return (
        <div className='FormColumn' style={{maxWidth: width + '%', ...props.style}}>
            {props.children}
        </div>
    );
};

export default FormColumn;