import * as React from 'react';
import MenuAside from "../MenuAside/MenuAside";
import Layout from "./Layout";

interface IPropsHOCLayout {
    baseText: string;
    url: string;
}
const renderMenu = (baseText: string, url: string) => {
    return (
        <MenuAside baseText={baseText} url={url}/>
    )
};

const HOCLayout = <P extends object>(Component: React.ComponentType<P>) =>
    class WithMenu extends React.Component<P & IPropsHOCLayout> {
        public render() {
            const { baseText, url, ...props } = this.props as IPropsHOCLayout;
            return (
                <Layout menu={renderMenu(baseText, url)}>
                    <Component {...props} />
                </Layout>
            );
        }
    };

export default HOCLayout;