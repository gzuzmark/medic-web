import * as React from 'react';
import { Link } from 'react-router-dom';
import Icon from "../../../Icon/Icon";
import colors from "../../../MentorColor";
import {Body1, LIGHT_TEXT} from '../../../MentorText';
import './MenuAside.scss';

interface IPropsListMentors {
    baseText: string;
    url: string;
    textNavigation?: string;
    icon?: string;
}

const iconStyles: React.CSSProperties = {
    fill: colors.TEXT_COLORS.font_dark
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
                        <Link to={this.props.url} className='Menu-item--link'>
                            <Body1 className="Menu-item" weight={LIGHT_TEXT}>
                                {this.props.baseText}
                            </Body1>
                        </Link>
                        {!!this.props.textNavigation &&
                            <Body1 className="Menu-item" weight={LIGHT_TEXT}>{` > ${this.props.textNavigation}`}</Body1>}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MenuAside;
