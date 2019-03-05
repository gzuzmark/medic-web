import * as React from 'react';
import MenuAside, {INavBarItem} from "./components/MenuAside/MenuAside";
import Layout from "./Layout";

interface IPropsHOCLayout {
    items: INavBarItem[];
    icon: string;
}

const renderMenu = (items: INavBarItem[], icon: string) => {
    return (
        <MenuAside items={items} icon={icon}/>
    )
};

const HOCLayout = <P extends object>(Component: React.ComponentType<P>) =>
    class WithMenu extends React.Component<P & IPropsHOCLayout> {
        public render() {
            const { items, icon, ...props } = this.props as IPropsHOCLayout;
            return (
                <Layout menu={renderMenu(items, icon)}>
                    <Component {...props} />
                </Layout>
            );
        }
    };

export default HOCLayout;
