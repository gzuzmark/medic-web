import * as React from 'react';
import {IFilerListItem} from "../../../FilterList/FilterList";
import SelectList from "../../../SelectList/SelectList";
import HamburgerContainer from "../HamburgerContainer/HamburgerContainer";
import UseHandlerMenuList from "./HandlerMenuList";

interface IPropsMenuTop {
    warningProfile: boolean;
}

const styleSelectList: React.CSSProperties = {
    boxShadow: 'none',
    position: 'relative',
    top: 0,
};

const MenuTop: React.FC<IPropsMenuTop> = (props) => {
    const [open, setOpen] = React.useState(false);
    const menuList = UseHandlerMenuList(props.warningProfile);
    const wrapperRef = React.useRef(null as any);

    React.useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = (event: any) => {
        const node = wrapperRef.current;
        if (node && !node.contains(event.target)) {
            setOpen(false);
        }
    };

    const redirect = (item: IFilerListItem) => {
        window.location.href = item.extra.url;
    };

    return (
        <div ref={wrapperRef}>
            <HamburgerContainer setOpen={setOpen} open={open}>
                <SelectList list={menuList} onChange={redirect} style={styleSelectList}/>
            </HamburgerContainer>
        </div>
    )
};

export default MenuTop;
