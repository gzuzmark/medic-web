import * as React from 'react';
import ConsoleColor from "../ConsoleColor";
import ConsoleModal from "./ConsoleModal";


interface IPropsConsoleModalInformation {
    show: boolean;
    onCloseModal(): void;
}

const ConsoleModalInformation: React.StatelessComponent<IPropsConsoleModalInformation> = (props) => {
    return (
        <ConsoleModal show={props.show} styles={{backgroundColor: ConsoleColor.TEXT_COLORS.purpleDark, position: 'relative'}} onCloseModal={props.onCloseModal}/>
    );
};

export default ConsoleModalInformation;