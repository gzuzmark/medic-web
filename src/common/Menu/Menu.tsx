import * as React from 'react';
import { HighlightText } from '../../common/ConsoleText'
import './Menu.scss';

interface IPropsListMentors {
    textNavigation: string;
}

class Menu extends React.Component<IPropsListMentors, {}> {
    public render() {
        return (
            <React.Fragment>
                <div className="Menu u-LayoutMargin">
                    <div className="Menu-navbar">
                        <HighlightText className="Menu-item" color="textNormalSoft">Mentores</HighlightText>
                        <HighlightText className="Menu-item" color="textNormalSoft">{this.props.textNavigation}</HighlightText>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Menu;
