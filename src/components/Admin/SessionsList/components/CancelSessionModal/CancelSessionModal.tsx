import * as React from 'react';
import ConsoleModalConfirm from '../../../../../common/ConsoleModal/ConsoleModalConfirm';
import './CancelSessionModal.scss';


interface IPropsCancelSessionModal {
  show: boolean;
  style?: React.CSSProperties;
  toggleModal(show: boolean): void;
  confirm(): void;
}

const CancelSessionModal: React.FC<IPropsCancelSessionModal> = (props) => {
  const cancel = () => props.toggleModal(false);

  return (
    <ConsoleModalConfirm
      show={props.show}
      onCloseModal={cancel}
      title={'¿Estás seguro que desea cancelar la cita?'}>
      <div>
        <div className="CancelSessionModal_buttons">
          <button className="u-Button u-Button--white" onClick={cancel}>Cancelar</button>
          <button className="u-Button" onClick={props.confirm}>Aceptar</button>
        </div>
      </div>
    </ConsoleModalConfirm>
  );
};

export default CancelSessionModal;
