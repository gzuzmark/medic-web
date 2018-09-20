import * as React from 'react';
import Modal from 'react-responsive-modal';


interface IPropsConsoleModal {
    show: boolean;
    styles?: React.CSSProperties;
    onCloseModal?(): void;
}

const ConsoleModal: React.StatelessComponent<IPropsConsoleModal> = (props) => {
    let onClose = () => {
        //
    };
    if (!!props.onCloseModal) {
        onClose = props.onCloseModal;
    }
    return (
        <Modal
            open={props.show}
            onClose={onClose}
            center={true}
            closeOnEsc={false}
            closeOnOverlayClick={false}
            showCloseIcon={false}
            styles={{modal: {padding: 0, borderRadius: 5, width: 800, ...props.styles}}}>
            {props.children}
        </Modal>
    );
};

export default ConsoleModal;