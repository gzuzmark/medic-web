import * as React from 'react';
import './FormColumn.scss';

interface IPropsFormColumn {
    style?: React.CSSProperties;
    width: number;
}

const FormColumn: React.FC<IPropsFormColumn> = (props) => {
    const margin = props.width === 1 ? 0 : 3;
    const width = Math.round(100 / props.width) - margin;
    return (
        <div className='FormColumn' style={{flexBasis: width + '%', ...props.style, maxWidth: width + '%', ...props.style}}>
            {props.children}
        </div>
    );
};

export default FormColumn;
