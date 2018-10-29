import * as React from 'react';
import ConfirmButtons from "../../../../../common/ConfirmButtons/ConfirmButtons";
import ConsoleModalConfirm from "../../../../../common/ConsoleModal/ConsoleModalConfirm";
import {Title2} from "../../../../../common/ConsoleText";
import Icon from "../../../../../common/Icon/Icon";
import './ModalConfirmDelete.scss';


interface IPropsModalConfirmDelete {
    show: boolean;
    styles?: React.CSSProperties;
    disabled: boolean;
    loading: boolean;
    totalSessions: number;
    onCancel(): void;
    onConfirm(): void;
}

const ModalConfirmDelete: React.StatelessComponent<IPropsModalConfirmDelete> = (props) => {
    const firstText = props.totalSessions === 1 ? 'la sesión' : 'las sesiones';
    const secondText = props.totalSessions === 1 ? 'esta sesión' : 'estas sesiones';
    return (
        <ConsoleModalConfirm
            show={props.show}
            title={`¿Estás seguro que deseas eliminar\n${firstText}?`} >
            <div className={'ModalConfirmDelete'}>
                <Title2 style={{color: "#ee5c7d"}}>
                    <span style={{position: 'relative'}}>
                        <Icon name={'exclamation'} style={
                            {fill: "#ee5c7d", height: 24, width: 24, position: 'absolute', top: 4 }}/>
                    </span>&nbsp;
                    <span style={{paddingLeft: 25}}>Si eliminas {secondText} no podrás revertir esta acción más adelante.</span>
                </Title2>
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