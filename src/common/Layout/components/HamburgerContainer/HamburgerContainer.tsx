import * as React from "react";
import './HamburgerContainer.scss';

interface IPropsHamburgerContainer {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const HamburgerContainer: React.FC<IPropsHamburgerContainer> = (props) => {
    const toggleMenu = () => {
        props.setOpen(!props.open);
    };

    return (
        <div className="MenuTop">
            <div className={`MenuTop-nav ${props.open ? 'MenuTop-nav--open' : ''}`} onClick={toggleMenu}>
                <span className="MenuTop-lines">&nbsp;</span>
                <span className="MenuTop-lines">&nbsp;</span>
                <span className="MenuTop-lines">&nbsp;</span>
                <span className="MenuTop-lines">&nbsp;</span>
            </div>
            { props.open &&
            <div className="MenuTop-options">
                {props.children}
            </div>}
        </div>
    )
}

export default HamburgerContainer;
