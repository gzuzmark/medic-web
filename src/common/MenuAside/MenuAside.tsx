import * as React from 'react';
import { Link } from 'react-router-dom';
import { HighlightText, HighlightTextHeading1 } from '../../common/ConsoleText'
import './MenuAside.scss';

interface IPropsListMentors {
    baseText: string;
    url: string;
    textNavigation?: string;
}

class MenuAside extends React.Component<IPropsListMentors, {}> {

    constructor(props: IPropsListMentors) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <div className="Menu u-LayoutMargin">
                    <div className="Menu-navbar">
                        <HighlightTextHeading1 className="Menu-item" color="textNormalSoft">
                            <Link to={this.props.url} className='Menu-item--link'>
                                {this.props.baseText}
                            </Link>
                        </HighlightTextHeading1>
                        {this.props.textNavigation &&
                            <HighlightText className="Menu-item" color="textNormalSoft">{this.props.textNavigation}</HighlightText>}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MenuAside;
