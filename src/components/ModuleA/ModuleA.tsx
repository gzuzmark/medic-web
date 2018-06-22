import * as React from 'react';
import Layout from "../../common/Layout/Layout";
import './ModuleA.scss';

class ModuleA extends React.Component {
    public render() {
        return (
            <Layout>
                <div className="Module A">
                    <span>Module A</span>
                </div>
            </Layout>
        );
    }
}

export default ModuleA;
