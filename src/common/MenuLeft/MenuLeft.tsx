import * as React from 'react';
import MenuAside from "../Layout/components/MenuAside/MenuAside";
import Sticky from "../Sticky/Sticky";

interface IPropsMenuLeft {
    baseText: string;
    url: string;
    textNavigation: string;
    icon?: string;
}

const MenuLeft: React.StatelessComponent<IPropsMenuLeft> = (props) => {
    return (
        <Sticky height={90} top={80}>
            <div className="u-LayoutMargin" style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{
                    minWidth: 395,
                    position: 'relative',
                }}/>
                <MenuAside items={[{text: props.baseText, url: props.url}, {text: props.textNavigation}]}
                           icon={props.icon}/>
            </div>
        </Sticky>
    );
};

export default MenuLeft;
