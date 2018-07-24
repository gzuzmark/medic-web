import * as React from 'react';
import { BoldText } from '../../../../common/ConsoleText';
import './FormSection.scss';

interface IPropsFormSection {
    title: string;
    style?: React.CSSProperties;
    main?: boolean;
}

const FormSection: React.StatelessComponent<IPropsFormSection> = (props) => {
    const ellipsis = props.main ? 'FormSection--ellipsis': '';
    return (
        <React.Fragment>
            <BoldText className={`FormSection ${ellipsis}`} style={{...props.style}}>{props.title}</BoldText>
            <div className='FormSection-item'>
                {props.children}
            </div>
        </React.Fragment>
    );
};

FormSection.defaultProps = {
    main: true
};

export default FormSection;
