import * as React from 'react';
import { Link } from 'react-router-dom';
import { HighlightText } from '../../common/ConsoleText'
import './Menu.scss';

interface IPropsListMentors {
    baseText: string;
    url: string;
    textNavigation?: string;
}

class Menu extends React.Component<IPropsListMentors, {}> {
    public render() {
        return (
            <React.Fragment>
                <div className="Menu u-LayoutMargin">
                    <div className="Menu-navbar">
                        <HighlightText className="Menu-item" color="textNormalSoft">
                            <Link to={this.props.url} className='Menu-item--link'>
                                {this.props.baseText}
                            </Link>
                        </HighlightText>
                        {this.props.textNavigation &&
                            <HighlightText className="Menu-item" color="textNormalSoft">{this.props.textNavigation}</HighlightText>}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Menu;
