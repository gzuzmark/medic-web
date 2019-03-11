import * as React from 'react';
import './ConfirmButtons.scss';

interface IPropsConfirmButtons {
    styles?: React.CSSProperties;
    disabled: boolean;
    loading: boolean;
    cancelText: string;
    confirmText: string;
    onCancel(): void;
    onConfirm(): void;
}

const ConfirmButtons: React.FC<IPropsConfirmButtons> = (props) => {
    return (
        <div className="ConfirmButtons" style={{...props.styles}}>
            <button className="u-Button u-Button--white ConfirmButtons-button"
                    onClick={props.onCancel}>{props.cancelText}</button>
            <button className="u-Button ConfirmButtons-button"
                    disabled={props.disabled}
                    onClick={props.onConfirm}
                    data-loading={props.loading ? true : undefined}>
                {props.loading ? '' : props.confirmText}</button>
        </div>
    );
};


export default ConfirmButtons;
