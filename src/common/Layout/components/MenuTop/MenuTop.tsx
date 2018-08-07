import * as React from 'react';
import './MenuTop.scss';

interface IStateMenu {
    open: boolean;
}

class MenuTop extends React.Component <{}, IStateMenu> {
    public state : IStateMenu;
    constructor (props: any) {
       super(props);
       this.state = {
           open: false
       };
       this.toggleMenu = this.toggleMenu.bind(this);
    }

    public render() {
        const openClass = this.state.open ? 'MenuTop-nav--open' : '';
        return (
            <div className="MenuTop">
                <div className={`MenuTop-nav ${openClass}`} onClick={this.toggleMenu}>
                    <span className="MenuTop-lines">&nbsp;</span>
                    <span className="MenuTop-lines">&nbsp;</span>
                    <span className="MenuTop-lines">&nbsp;</span>
                    <span className="MenuTop-lines">&nbsp;</span>
                </div>
                { this.state.open &&
                <div className="MenuTop-options">
                    &nbsp;
                </div>}
            </div>
        )
    }

    private toggleMenu() {
        const state = {...this.state};
        this.setState({open: !state.open});
    }
}

export default MenuTop;