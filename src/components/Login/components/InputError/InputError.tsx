import * as React from 'react';
import { Text } from '../../../../common/ConsoleText';
import './InputError.scss';


interface IPropsForm {
    error: string;
    touched: boolean;
}


class InputError extends React.Component<IPropsForm, {}> {
    constructor(props: IPropsForm) {
        super(props);
    }

    public render() {
        return (
            <div className="InputError">
                {!!this.props.error && this.props.touched &&
                <Text className="InputError-text">{this.props.error}</Text>}
            </div>
        );
    }
}

export default InputError;
