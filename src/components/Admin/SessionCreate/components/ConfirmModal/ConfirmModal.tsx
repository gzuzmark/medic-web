import * as React from 'react';
import ConsoleModalConfirm from "../../../../../common/ConsoleModal/ConsoleModalConfirm";
import { FactorySessionBean } from "../../../../../domain/FactorySession/FactorySessionBean";
import { ISessionSchedule } from "../../../../../interfaces/Session.interface";
import './ConfirmModal.scss';

interface IPropsConfirmModal {
    session: FactorySessionBean;
    height: number;
    style?: React.CSSProperties;
    _onCancel(): void;
    _onConfirm(): void;
}

const ConfirmModal: React.FC<IPropsConfirmModal> = (props) => {
    return (
        <ConsoleModalConfirm show={false} onCloseModal={props._onCancel} title={'Estás apunto de crear las siguientes sesiones'}>
            <div>
                <div>
                    <span>Hola señor aqui esta la tabla</span>
                </div>

                <div>
                    <div>
                        <div>
                            <div>Sesión</div>
                            <div>Tipo</div>
                            <div>Sede</div>
                            <div>Cap.</div>
                            <div>Aula</div>
                            <div>Día</div>
                            <div>Hora</div>
                        </div>
                    </div>
                    <div>
                        {props.session.listSessions.map((item: ISessionSchedule, index: number) => {
                            return (
                                <div key={`ModalTable-${index}`}>
                                    <div>{props.session.factorySession.skillName}</div>
                                    <div>Tutoria</div>
                                    <div>{props.session.factorySession.room}</div>
                                    <div>{props.session.factorySession.maxStudents}</div>
                                    <div>{item.weekDay}</div>
                                    <div>{item.from} - {item.to}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div>
                    <button className="u-Button u-Button--white" onClick={props._onCancel}>Cancelar</button>
                    <button className="u-Button" onClick={props._onConfirm}>Aceptar</button>

                </div>
            </div>
        </ConsoleModalConfirm>
    );
}

export default ConfirmModal;


