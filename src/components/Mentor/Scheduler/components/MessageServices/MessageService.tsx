import * as React from 'react';
import ConsoleModal from 'src/common/ConsoleModal/ConsoleModal';
import Loader from 'src/common/Loader/Loader';
import './MessageService.scss';

export interface IPropsMessageService {
    show: boolean;
    message?: string;
}

const MessageService: React.FC<IPropsMessageService> = (props) => {

    const { show } = props;

    return (
        <ConsoleModal show={show} styles={{ width: 450 }}>
            <div className="message-service-container">
                <div className="message-service-text">
                    <h4 className="message-service-title">Creación de calendario</h4>
                    <p className="message-service-submessage">Se está validando la información generada</p>
                    <p className="message-service-submessage">Se actualizará el calendario en breve</p>
                </div>
                <Loader />
            </div>
        </ConsoleModal>
    );
};

export default MessageService;
