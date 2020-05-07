import * as React from 'react';
import {ButtonNormal, THEME_SECONDARY} from "../../../../../common/Buttons/Buttons";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import LoaderFullScreen from "../../../../../common/Loader/LoaderFullsScreen";
import {FONTS} from "../../../../../common/MentorColor";
import {Heading3, LIGHT_TEXT, Small1, Subhead1} from '../../../../../common/MentorText';
import './ModalConfirmDelete.scss';


interface IPropsModalConfirmDelete {
    show: boolean;
    styles?: React.CSSProperties;
    disabled: boolean;
    booked: boolean;
    loading: boolean;
    totalSessions: number;
    onCancel(): void;
    onConfirm(): void;
}

const ModalConfirmDelete: React.FC<IPropsModalConfirmDelete> = (props) => {
    const firstText = props.totalSessions === 1 ? 'esta sesión' : `las ${props.totalSessions} sesiones`;
    const secondText = props.totalSessions === 1 ? 'esta sesión' : 'estas sesiones';
    return (
        props.loading ?
        <LoaderFullScreen modal={true} />:
        <MentorModalBase show={props.show}>
            <div className='ModalConfirmDelete'>
                <div className='ModalConfirmDelete_texts'>
                    <Heading3 style={{margin: '7px 0'}}>¿Estás seguro que deseas eliminar {firstText}?</Heading3>
                    <Subhead1 weight={LIGHT_TEXT} style={{margin: '7px 0'}}>Si eliminas {secondText} no podrás revertir esta acción más adelante.</Subhead1>
                    {props.booked &&
                    <Small1 className='ModalConfirmDelete_error' color={FONTS.error} style={{margin: '7px 0'}}>
                        <Icon name={'alert'}/>
                        Algunas de las sesiones tienen pacientes inscritos. Se les notificará de la cancelación de la sesión.
                    </Small1>}
                </div>
                <div className='ModalConfirmDelete_buttons'>
                    <ButtonNormal attrs={{onClick: props.onCancel}}
                                  type={THEME_SECONDARY} text="Cancelar"/>
                    <ButtonNormal attrs={{onClick: props.onConfirm}} text="Aceptar"/>
                </div>
            </div>
        </MentorModalBase>

    );
};

export default ModalConfirmDelete;
