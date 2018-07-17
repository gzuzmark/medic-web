import * as React from 'react';
import user_image from '../../assets/images/user_default.png';
import './Avatar.scss';

interface IPropsAvatar {
    size: number;
    source?: string;
    style?: React.CSSProperties;
}

class Avatar extends React.Component<IPropsAvatar, {}> {
    public render() {
        return (
            <div className="Avatar"
                 style={
                     {
                         'backgroundImage': `url(${this.props.source ? this.props.source : user_image })`,
                         'maxWidth': `${this.props.size}px`,
                         'minHeight': `${this.props.size}px`,
                         'minWidth': `${this.props.size}px`,
                         ...this.props.style
                     }
                 }>&nbsp;
            </div>
        );
    }
}

export default Avatar;
