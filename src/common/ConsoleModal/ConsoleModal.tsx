import * as React from 'react';
import Modal from 'react-responsive-modal';


interface IPropsConsoleModal {
    show: boolean;
    styles?: React.CSSProperties;
    onCloseModal(): void;
}

const ConsoleModal: React.StatelessComponent<IPropsConsoleModal> = (props) => {
    return (
        <Modal
            open={props.show}
            onClose={props.onCloseModal}
            center={true}
            closeOnEsc={false}
            closeOnOverlayClick={false}
            showCloseIcon={false}
            styles={{modal: props.styles}}>
            {props.children}
        </Modal>
    );
};

export default ConsoleModal;