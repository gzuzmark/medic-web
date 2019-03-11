import * as React from 'react';
import ConsoleColor from "../ConsoleColor";
import {Title2} from "../ConsoleText";
import Icon from "../Icon/Icon";
import ConsoleModal from "./ConsoleModal";
import './ConsoleModalConfirm.scss';


interface IPropsConsoleModalConfirm {
    show: boolean;
    title: string;
    icon?: string;
    onCloseModal?(): void;
}

const ConsoleModalConfirm: React.FC<IPropsConsoleModalConfirm> = (props) => {
    return (
        <ConsoleModal
            show={props.show}
            styles={{backgroundColor: ConsoleColor.TEXT_COLORS.white, position: 'relative'}}
            onCloseModal={props.onCloseModal}>
            <div className={'ConsoleModalConfirm_header'}>
                {props.icon && <Icon name={props.icon}/>}
                <Title2 color="purple">{props.title}</Title2>
            </div>
            <div className={'ConsoleModalConfirm_body'}>
                {props.children}
            </div>
        </ConsoleModal>
    );
};

export default ConsoleModalConfirm;
