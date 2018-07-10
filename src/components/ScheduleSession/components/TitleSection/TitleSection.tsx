import * as React from 'react';
import { BoldText } from '../../../../common/ConsoleText';
import './TitleSection.scss';

interface IPropsTitleSection {
    title: string;
    style?: React.CSSProperties;
    main?: boolean;
}

const TitleSection: React.StatelessComponent<IPropsTitleSection> = (props) => {
    const ellipsis = props.main ? 'TitleSection--ellipsis': '';
    return (
        <BoldText className={`TitleSection ${ellipsis}`} style={{...props.style}}>{props.title}</BoldText>
    );
};

TitleSection.defaultProps = {
    main: true
};

export default TitleSection;