import * as React from 'react';
import Modal from 'react-responsive-modal';
import Icon from "../Icon/Icon";
import './MentorModalBase.scss';


interface IPropsMentorModalBase {
    show: boolean;
    hideClose?: boolean;
    styles?: React.CSSProperties;
    onCloseModal?(): void;
}

const MentorModalBase: React.StatelessComponent<IPropsMentorModalBase> = (props) => {
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
            styles={{
                modal: {
                    borderRadius: 5,
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    minHeight: 300,
                    padding: 0,
                    width: 600,
                    ...props.styles
                }
            }}>
            <div className="MentorModalBase">
            {
                !!props.onCloseModal && !props.hideClose &&
                <button className="MentorModalBase_close" onClick={props.onCloseModal}>
                    <Icon name="close"/>
                </button>
            }
            {props.children}
            </div>
        </Modal>
    );
};

export default MentorModalBase;
