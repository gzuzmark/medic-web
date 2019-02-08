import * as React from 'react';
import MenuAside from "./components/MenuAside/MenuAside";
import Layout from "./Layout";

interface IPropsHOCLayout {
    baseText: string;
    url: string;
    keyPage: string;
    textNavigation?: string;
}
const renderMenu = (...args: any[]) => {
    return (
        <MenuAside baseText={args[0]} url={args[1]} icon={args[2]} textNavigation={args[3]} />
    )
};

const HOCLayout = <P extends object>(Component: React.ComponentType<P>) =>
    class WithMenu extends React.Component<P & IPropsHOCLayout> {
        public render() {
            const { baseText, url, keyPage, textNavigation, ...props } = this.props as IPropsHOCLayout;
            return (
                <Layout menu={renderMenu(baseText, url, keyPage, textNavigation)}>
                    <Component {...props} />
                </Layout>
            );
        }
    };

export default HOCLayout;
