import * as React from 'react';
import Layout from "../../common/Layout/Layout";
import './ModuleB.scss';

class ModuleB extends React.Component {
    public render() {
        return (
            <Layout>
                <div className="Module B">
                    <span>Module B</span>
                </div>
            </Layout>
        );
    }
}

export default ModuleB;
