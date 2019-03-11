import * as React from 'react';
import Loader from './Loader';

interface IPropsHOCLoader {
    loading: boolean;
}

const HOCLoader = <P extends object>(Component: React.ComponentType<P>) =>
    class WithLoading extends React.Component<P & IPropsHOCLoader> {
        public render() {
            const { loading } = this.props as IPropsHOCLoader;
            return loading ? <Loader /> : <Component {...this.props} />;
        }
    };

export default HOCLoader;
