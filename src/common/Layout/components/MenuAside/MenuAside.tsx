import * as React from 'react';
import { Link } from 'react-router-dom';
import Icon from "../../../Icon/Icon";
import colors from "../../../MentorColor";
import {Body1, LIGHT_TEXT} from '../../../MentorText';
import './MenuAside.scss';

export interface INavBarItem {
    url?: string;
    text: string;
}

export interface IPropsListMentors {
    icon?: string;
    items: INavBarItem[];
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
                        {this.props.items.map((item: INavBarItem, index: number) => {
                            return !!item.url ?
                                (
                                    <Link to={item.url} className='Menu-item--link' key={`MenuAside_${index}`}>
                                        <Body1 className="Menu-item" weight={LIGHT_TEXT}>
                                            {`${index !== 0 ? ' > ' : ''}${item.text}`}
                                        </Body1>
                                    </Link>
                                ) :
                                (
                                    <Body1 className="Menu-item" weight={LIGHT_TEXT} key={`MenuAside_${index}`}>
                                        {`${index !== 0 ? ' > ' : ''}${item.text}`}
                                    </Body1>
                                )
                        })}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MenuAside;
