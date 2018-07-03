import * as React from 'react';
import './Avatar.scss';

interface IPropsAvatar {
    size: number;
    source: string;
}

class Avatar extends React.Component<IPropsAvatar, {}> {
    public render() {
        return (
            <div className="Avatar"
                 style={
                     {
                         'backgroundImage': `url(${this.props.source})`,
                         'height': `${this.props.size}px`,
                         'maxWidth': `${this.props.size}px`,
                         'minWidth': `${this.props.size}px`
                     }
                 }>&nbsp;
            </div>
        );
    }
}

export default Avatar;
