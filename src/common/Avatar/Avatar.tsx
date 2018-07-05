import * as React from 'react';
import user_image from '../../assets/images/user_default.png';
import './Avatar.scss';

interface IPropsAvatar {
    size: number;
    source?: string;
}

class Avatar extends React.Component<IPropsAvatar, {}> {
    public render() {
        return (
            <div className="Avatar"
                 style={
                     {
                         'backgroundImage': `url(${this.props.source ? this.props.source : user_image })`,
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
