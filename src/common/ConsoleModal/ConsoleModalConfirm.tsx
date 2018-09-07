import * as React from 'react';
import ConsoleColor from "../ConsoleColor";
import {Heading2} from "../ConsoleText";
import ConsoleModal from "./ConsoleModal";
import './ConsoleModalConfirm.scss';


interface IPropsConsoleModalConfirm {
    show: boolean;
    title: string;
    onCloseModal(): void;
}

const ConsoleModalConfirm: React.StatelessComponent<IPropsConsoleModalConfirm> = (props) => {
    return (
        <ConsoleModal
            show={props.show}
            styles={{backgroundColor: ConsoleColor.TEXT_COLORS.white, position: 'relative'}}
            onCloseModal={props.onCloseModal}>
            <div className={'ConsoleModalConfirm_header'}>
                <Heading2 color="purpleDark" style={{fontSize: 24, lineHeight: '32px'}}>{props.title}</Heading2>
            </div>
            <div className={'ConsoleModalConfirm_body'}>
                {props.children}
            </div>
        </ConsoleModal>
    );
};

export default ConsoleModalConfirm;