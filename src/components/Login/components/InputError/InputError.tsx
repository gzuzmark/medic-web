import * as React from 'react';
import {LIGHT_TEXT, Small2} from '../../../../common/MentorText';
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
                <Small2 color={'font_error'} weight={LIGHT_TEXT}>{this.props.error}</Small2>}
            </div>
        );
    }
}

export default InputError;
