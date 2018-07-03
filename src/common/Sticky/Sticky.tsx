import * as React from 'react';
import './Sticky.scss';

interface IPropsSticky {
    top: number;
    height: number;
}

class Sticky extends React.Component<IPropsSticky, {}> {
    public render() {
        return (
            <div>
                <div style={{'width': '100%', 'height': this.props.height}}>&nbsp;</div>
                <div className="Sticky" style={{'top': this.props.top}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Sticky;
