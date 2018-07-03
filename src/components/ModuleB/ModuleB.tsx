import * as React from 'react';
import Layout from "../../common/Layout/Layout";
import './ModuleB.scss';

class ModuleB extends React.Component {
    public getMenu () {
        return (
            <div>&nbsp;</div>
        )
    }

    public render() {
        return (
            <Layout menu={this.getMenu()}>
                <div className="Module B">
                    <span>Module B</span>
                </div>
            </Layout>
        );
    }
}

export default ModuleB;
