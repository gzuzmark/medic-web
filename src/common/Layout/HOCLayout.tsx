import * as React from 'react';
import MenuAside from "../MenuAside/MenuAside";
import Layout from "./Layout";

interface IPropsHOCLayout {
    baseText: string;
    url: string;
    keyPage: string;
}
const renderMenu = (baseText: string, url: string, keyPage: string) => {
    return (
        <MenuAside baseText={baseText} url={url} icon={keyPage}/>
    )
};

const HOCLayout = <P extends object>(Component: React.ComponentType<P>) =>
    class WithMenu extends React.Component<P & IPropsHOCLayout> {
        public render() {
            const { baseText, url, keyPage, ...props } = this.props as IPropsHOCLayout;
            return (
                <Layout menu={renderMenu(baseText, url, keyPage)}>
                    <Component {...props} />
                </Layout>
            );
        }
    };

export default HOCLayout;