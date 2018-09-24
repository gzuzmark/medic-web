import * as React from 'react';
import ConfirmButtons from "../../../../common/ConfirmButtons/ConfirmButtons";
import ConsoleModalConfirm from "../../../../common/ConsoleModal/ConsoleModalConfirm";
import {Title2} from "../../../../common/ConsoleText";
import './ModalConfirmDelete.scss';


interface IPropsModalConfirmDelete {
    show: boolean;
    styles?: React.CSSProperties;
    disabled: boolean;
    loading: boolean;
    onCancel(): void;
    onConfirm(): void;
}

const ModalConfirmDelete: React.StatelessComponent<IPropsModalConfirmDelete> = (props) => {
    return (
        <ConsoleModalConfirm
            show={props.show}
            title={'¿Está seguro que desea eliminar estos talleres?'} >
            <div className={'ModalConfirmDelete'}>
                <Title2 color="textBold">Si cancelas, se perderá la información actual.</Title2>
                <Title2 color="textBold" style={{fontWeight: 'normal'}}>¿Estás seguro?</Title2>
            </div>
            <ConfirmButtons
                styles={{width: '74%', margin: '60px auto 20px auto'}}
                disabled={props.disabled}
                loading={props.loading}
                cancelText={'No, volver'}
                confirmText={'Si, eliminar'}
                onCancel={props.onCancel}
                onConfirm={props.onConfirm} />
        </ConsoleModalConfirm>
    );
};

export default ModalConfirmDelete;