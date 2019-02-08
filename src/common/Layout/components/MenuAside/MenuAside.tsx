import * as React from 'react';
import { Link } from 'react-router-dom';
import { HighlightText, HighlightTextHeading1 } from '../../../ConsoleText';
import Icon from "../../../Icon/Icon";
import './MenuAside.scss';

interface IPropsListMentors {
    baseText: string;
    url: string;
    textNavigation?: string;
    icon?: string;
}

const iconStyles: React.CSSProperties = {
    fill: 'rgb(193, 193, 193)',
    left: -5,
    position: 'relative',
    top: 3
};

class MenuAside extends React.Component<IPropsListMentors, {}> {

    constructor(props: IPropsListMentors) {
        super(props);
    }

    public render(): JSX.Element {
        const icon = this.props.icon || 'book';
        return (
            <React.Fragment>
                <div className="Menu u-LayoutMargin">
                    <div className="Menu-navbar">
                        <Icon name={icon} style={iconStyles}/>
                        <HighlightTextHeading1 className="Menu-item" color="textNormalSoft">
                            <Link to={this.props.url} className='Menu-item--link'>
                                {this.props.baseText}
                            </Link>
                        </HighlightTextHeading1>
                        {!!this.props.textNavigation &&
                            <HighlightText className="Menu-item" color="textNormalSoft">{this.props.textNavigation}</HighlightText>}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MenuAside;
