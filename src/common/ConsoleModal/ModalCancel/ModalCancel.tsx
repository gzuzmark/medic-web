import * as React from 'react';
import ConfirmButtons from "../../ConfirmButtons/ConfirmButtons";
import {Title2} from "../../ConsoleText";
import ConsoleModalConfirm from "../ConsoleModalConfirm";
import './ModalCancel.scss';


interface IPropsModalCancel {
    show: boolean;
    title: string;
    styles?: React.CSSProperties;
    disabled: boolean;
    loading: boolean;
    onCancel(): void;
    onConfirm(): void;
}

const ModalCancel: React.StatelessComponent<IPropsModalCancel> = (props) => {
    return (
        <ConsoleModalConfirm
            show={props.show}
            title={props.title}
            icon={'warning'}>
            <div className={'ModalCancel'}>
                <Title2 color="textBold">Si cancelas, se perderá la información actual.</Title2>
                <Title2 color="textBold" style={{fontWeight: 'normal'}}>¿Estás seguro?</Title2>
            </div>
            <ConfirmButtons
                styles={{width: '74%', margin: '60px auto 20px auto'}}
                disabled={props.disabled}
                loading={props.loading}
                cancelText={'No, volver'}
                confirmText={'Sí, cancelar'}
                onCancel={props.onCancel}
                onConfirm={props.onConfirm}/>
        </ConsoleModalConfirm>
    );
};

export default ModalCancel;