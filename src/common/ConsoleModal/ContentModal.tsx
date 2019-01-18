import * as React from 'react';
import { Text3, TextBold1 } from '../../common/ConsoleText';
import Icon from "../../common/Icon/Icon";
import './ContentModal.scss';


export interface IGenericContentModal {
    image?: JSX.Element | null;
    title?: string;
    description?: string;
    button?: string;
}

export interface IPropsGenericContentModal {
    generic: IGenericContentModal;
    loading: boolean;
    confirm?: () => void;
}

const Generic: React.StatelessComponent<IPropsGenericContentModal> = (props) => {

    const onClick = () => {
        if (props.confirm) {
            props.confirm();
        }
    };

    let propsButton = {};
    if (props.loading) {
        propsButton = {
            disabled: "true",
            loading: "true"
        }
    }

    return (
        <div className={`GenericContentModal`}>
            <div className={"GenericContentModal_header"}>
                {!!props.generic.image && props.generic.image
                }
            </div>
            <div className={"GenericContentModal_body"}>
                <div className={"GenericContentModal_custom-width"}>
                    {
                        !!props.generic.title &&
                        <div className={"GenericContentModal_title"}>
                            <TextBold1>{props.generic.title}</TextBold1>
                        </div>
                    }
                    {
                        !!props.generic.description &&
                        <div className={"GenericContentModal_description"}>
                            <Text3>{props.generic.description}</Text3>
                        </div>
                    }
                </div>
            </div>
            {
                !!props.generic.button &&
                <div className={"GenericContentModal_footer"}>
                    <button onClick={onClick}
                            className="GenericContentModal_button u-Button"
                            {...propsButton}
                    >{props.generic.button}</button>
                </div>
            }
        </div>
    )
};

const Success: React.StatelessComponent<{description: string}> = (props) => {
    const generic: IGenericContentModal = {
        button: "",
        description: props.description,
        image: <Icon name={'check-circle'} style={{marginTop: 20}}/>,
        title: "¡Listo!"
    };
    return <Generic generic={generic} loading={false} />
};

const ContentModal: {
    Generic: React.StatelessComponent<IPropsGenericContentModal>,
    Success: React.StatelessComponent<{description: string}>} = {
    Generic, Success
};

export default ContentModal;
