import * as React from 'react';
import Modal from 'react-responsive-modal';
import Icon from "../Icon/Icon";
import colors from "../MentorColor";
import './MentorModalBase.scss';


interface IPropsMentorModalBase {
    show: boolean;
    hideClose?: boolean;
    header?: JSX.Element | null;
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    styles?: React.CSSProperties;
    width?: number;
    onCloseModal?(): void;
}

const MentorModalBase: React.FC<IPropsMentorModalBase> = (props) => {
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
            closeOnEsc={!!props.closeOnEsc}
            closeOnOverlayClick={!!props.closeOnOverlayClick}
            showCloseIcon={false}
            styles={{
                modal: {
                    backgroundColor: colors.MISC_COLORS.background_grey_1,
                    borderRadius: 5,
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    minHeight: 250,
                    padding: 0,
                    width: props.width || 600,
                    ...props.styles
                }
            }}>
            <div className="MentorModalBase">
                {
                    !!props.onCloseModal && !props.hideClose &&
                    <button className="MentorModalBase_close" onClick={props.onCloseModal}>
                        <Icon name="close" />
                    </button>
                }
                {
                    !! props.header &&
                    <div className="MentorModalBase_header" style={{'borderColor': colors.MISC_COLORS.background_grey_2}}>
                        {props.header}
                    </div>
                }
                <div className="MentorModalBase_body">{props.children}</div>
            </div>
        </Modal>
    );
};

export default MentorModalBase;
