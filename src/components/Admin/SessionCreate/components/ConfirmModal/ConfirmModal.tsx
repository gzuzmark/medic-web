import * as React from 'react';
import { SessionBean } from "../../../../../beans/Session.bean";
import ConsoleModalConfirm from "../../../../../common/ConsoleModal/ConsoleModalConfirm";
import { ISessionSchedule } from "../../../../../interfaces/Session.interface";
import './ConfirmModal.scss';

interface IPropsConfirmModal {
    session: SessionBean;
    height: number;
    style?: React.CSSProperties;
    _onCancel(): void;
    _onConfirm(): void;
}

const ConfirmModal: React.StatelessComponent<IPropsConfirmModal> = (props) => {
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
                                    <div>{props.session.skillName}</div>
                                    <div>Tutoria</div>
                                    <div>{props.session.location}</div>
                                    <div>{props.session.maxStudents}</div>
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


