import * as React from 'react';
import styled from "styled-components";
import Icon from "../../../Icon/Icon";
import colors from "../../../MentorColor";
import {LIGHT_TEXT, Subhead1} from "../../../MentorText";
import HamburgerContainer from "../HamburgerContainer/HamburgerContainer";
import ItemMenuTop from "../ItemMenuTop/ItemMenuTop";
import UseHandlerMenuList, {IMenuListItem} from "./HandlerMenuList";

interface IPropsMenuTop {
    warningProfile: boolean;
}


const ItemContainerStyled = styled.div`
    background: white;
    box-shadow: ${(props: {parent: boolean}) => props.parent ? ' 0 2px 6px 0 #777' : '-1px 1px 3px 0px #777'};
    display: ${(props: {parent: boolean}) => props.parent ? 'flex' : 'none'};
    flex-direction: column;
    left: ${(props: {parent: boolean}) => props.parent ? 'auto' : '-150px'};
    padding: 3px 0;
    position: ${(props: {parent: boolean}) => props.parent ? 'relative' : 'absolute'};
    top: 0;
    width: ${(props: {parent: boolean}) => props.parent ? '190px' : '150px'};
    a {
        width: 100%;
    }
`;


const iconStyles: React.CSSProperties = {
    fill: colors.TEXT_COLORS.font_dark,
    height: 24,
    marginRight: 8,
    minHeight: 24,
    minWidth: 24,
    width: 24
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

    const showItems = (items: IMenuListItem[], parent: boolean) => (
        items.map((item: IMenuListItem) => {
            return (
                <ItemMenuTop url={item.url} key={item.id} haveSubmenu={!!item.children}>
                    {item.children &&
                        <ItemContainerStyled parent={parent}>{showItems(item.children, false)}</ItemContainerStyled>}
                    {item.icon && <Icon name={item.icon} style={iconStyles}/>}
                    {typeof(item.name) === "string" ?
                        <Subhead1 weight={LIGHT_TEXT}>{item.name}</Subhead1> :
                        item.name
                    }
                </ItemMenuTop>
            )
        })
    )

    return (
        <div ref={wrapperRef}>
            <HamburgerContainer setOpen={setOpen} open={open}>
                <ItemContainerStyled parent={true}>
                    {showItems(menuList, false)}
                </ItemContainerStyled>
            </HamburgerContainer>
        </div>
    )
};

export default MenuTop;
