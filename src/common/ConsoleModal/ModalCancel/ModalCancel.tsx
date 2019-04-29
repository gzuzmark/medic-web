import * as React from 'react';
import {ButtonNormal, THEME_SECONDARY} from "../../Buttons/Buttons";
import {Heading3, LIGHT_TEXT, Subhead1} from '../../MentorText';
import MentorModalBase from "../MentorModalBase";
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

const ModalCancel: React.FC<IPropsModalCancel> = (props) => {
    const buttonProps = {};
    if (!!props.disabled) {
        buttonProps['disabled'] = true;
    } else if (!!props.loading) {
        buttonProps['loading'] = true;
    }
    return (
        <MentorModalBase show={props.show}>
            <div className={'ModalCancel'}>
                <div className='ModalCancel_texts'>
                    <Heading3 style={{margin: '7px 0'}}>Cancelar eliminar sesiones</Heading3>
                    <Subhead1 weight={LIGHT_TEXT} style={{margin: '7px 0'}}>Si cancelas, se perderá la información actual.</Subhead1>
                    <Subhead1 weight={LIGHT_TEXT} style={{margin: '7px 0'}}>¿Estás seguro?</Subhead1>
                </div>
                <div className='ModalCancel_buttons'>
                    <ButtonNormal attrs={{...buttonProps, onClick: props.onCancel}}
                                  type={THEME_SECONDARY} text="No, volver"/>
                    <ButtonNormal attrs={{...buttonProps, onClick: props.onConfirm}} text="Sí, cancelar"/>
                </div>
            </div>
        </MentorModalBase>
    );
};

export default ModalCancel;
